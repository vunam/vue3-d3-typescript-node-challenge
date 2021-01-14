import 'dotenv/config';
import chalk from 'chalk';
import fetch from 'node-fetch';
import PrettyError from 'pretty-error';

import { initConnection } from '@shared/helpers/db';

new PrettyError().start();

const prettyLog = (text: string) => console.log(chalk.yellow(text));

const migrationMode = process.argv[2];
const driver = initConnection();

export const up = async (): Promise<void> => {
  const session = driver.session();

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

    await session.run(query, {
      items: data,
    });

    const queryRelations = `
      match (a:Node)
      where NOT (a.parent = "")
      match (b:Node)
      where b.name = a.parent
      create (a)-[:CHILD_OF]->(b)
    `;

    await session.run(queryRelations);
  } catch (err) {
    console.error(err);
  }

  await session.close();
  await driver.close();
};

export const down = async (): Promise<void> => {
  const session = driver.session();
  try {
    const query = `
      MATCH (n)
      DETACH DELETE n
    `;

    await session.run(query);
  } catch (err) {
    console.error(err);
  }

  await session.close();
  await driver.close();
};

const startProcess = async () => {
  prettyLog(`-- Migration ${migrationMode} - started`);

  await (migrationMode === 'UP' ? up() : down());

  prettyLog('-- Process completed');
};

startProcess();
