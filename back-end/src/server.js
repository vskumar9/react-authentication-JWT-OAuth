import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from './db';

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });