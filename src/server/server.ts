import 'dotenv/config';
import 'dotenv/config';
import express from 'express';
import { initConnection } from '@shared/helpers/db';

const app = express();

const driver = initConnection();

app.get('/', async (req, res) => {
  const session = driver.session();
  try {
		const result = await session.run(`
			MATCH (n)
      RETURN n
    `);
    
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
  session.close();
});

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.API_SERVER_PORT}`);
});
