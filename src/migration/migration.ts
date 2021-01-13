import 'dotenv/config';
import fetch from 'node-fetch';

import { initConnection } from './helpers/db';

const migrationMode = process.argv[2];
const driver = initConnection();

const FETCH_OPTIONS = {
  method: 'get',
  headers: {'Content-Type': 'application/json'},
};

export const up = async (): Promise<void> => {
  const session = driver.session();

	try {
    const response = await fetch(process.env.DATA_FILE_URL, FETCH_OPTIONS);
    const { data } = await response.json();
    
    if (!data?.length) {
      throw Error("No data has been received");
    }

    const query = ` 
      UNWIND $items as items
      CREATE (a:Node) SET a = items
    `;
  
    const importData = {
      items: data
    };
  
		const result = await session.run(query, importData);
		console.log(result);
	} catch (err) {
		console.error(err);
	}

	await session.close();
};

export const down = (): void => {};

if (migrationMode === 'UP') {
	up();
} else {
	down();
}
