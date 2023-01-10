import express from 'express';
import * as http from 'http';
import bodyParser from 'body-parser';
import knex from './databaseConfig/dbConfig';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 4040;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const runningMessage = `Server running on port ${port}`;
knex.queryBuilder();
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send({
        'health-check': 'OK',
        message: runningMessage
    });
});

export default server;
