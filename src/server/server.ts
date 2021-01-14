import 'dotenv/config';

import express from 'express';
import { initConnection, run } from '@shared/helpers/db';

const app = express();

app.get('/', async (req, res) => {
  try {
    const result = await run(`
      MATCH (n)
      RETURN n
    `);

    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const startApp = async () => {
  await initConnection();

  app.listen(process.env.API_SERVER_PORT, () => {
    console.log(`App listening on port ${process.env.API_SERVER_PORT}`);
  });
};

startApp();
