import express, { Express, Request, Response } from 'express';
import { router } from './routes/taskRoutes';


const app: Express = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('TypeScript Backend API');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});