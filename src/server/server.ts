import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('something');
});

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`App listening on port ${process.env.API_SERVER_PORT}`);
});
