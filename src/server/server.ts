import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { initConnection } from '@shared/helpers/db';
import getAllNodes from './routes/getAllNodes';
import getSingleNode from './routes/getSingleNode';

const app = express();

app.use(cors());

app.get('/all', getAllNodes);
app.get('/node/:name', getSingleNode);

const startApp = async () => {
    await initConnection();

    app.listen(process.env.API_SERVER_PORT, () => {
        console.log(`App listening on port ${process.env.API_SERVER_PORT}`);
    });
};

startApp();
