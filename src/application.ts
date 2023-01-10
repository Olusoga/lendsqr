import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import knex from './databaseConfig/dbConfig';
import UserRoutes from './router/user';
import AccountRoutes from './router/account';
import TransactionRoutes from './router/transaction';
const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use('/api/v1', UserRoutes);
app.use('/api/v1', AccountRoutes);
app.use('/api/v1', TransactionRoutes);
const runningMessage = `Server running on port ${port}`;
knex.queryBuilder();
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send({
        'health-check': 'OK',
        message: runningMessage
    });
});

export default server;
