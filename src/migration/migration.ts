import 'dotenv/config';
import chalk from 'chalk';
import fetch from 'node-fetch';
import PrettyError from 'pretty-error';

import { initConnection, run, closeConnection } from '@shared/helpers/db';

import { MigrationType } from './types';

new PrettyError().start();

const prettyLog = (text: string) => console.log(chalk.yellow(text));

const migrationMode = process.argv[2] as MigrationType;

const up = async (): Promise<void> => {
    await initConnection();

    try {
        const response = await fetch(process.env.DATA_FILE_URL, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        });
        const { data } = await response.json();

        if (!data?.length) {
            throw Error('No data has been received');
        }

        const query = ` 
      UNWIND $items as items
      CREATE (node:Node) SET node = items
    `;

        await run(query, {
            items: data,
        });

        const queryRelations = `
      match (a:Node)
      where NOT (a.parent = "")
      match (b:Node)
      where b.name = a.parent
      create (a)-[:CHILD_OF]->(b)
    `;

        await run(queryRelations);
    } catch (err) {
        console.error(err);
    }

    await closeConnection();
};

const down = async (): Promise<void> => {
    await initConnection();

    try {
        const query = `
      MATCH (n)
      DETACH DELETE n
    `;

        await run(query);
    } catch (err) {
        console.error(err);
    }

    await closeConnection();
};

const startProcess = async (mode: MigrationType) => {
    prettyLog(`-- Migration ${mode} - started`);

    await (mode === 'UP' ? up() : down());

    prettyLog('-- Process completed');
};

if (migrationMode === MigrationType.DOWN || migrationMode === MigrationType.UP) {
    startProcess(migrationMode);
}

export default startProcess;
