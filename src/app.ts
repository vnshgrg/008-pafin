import 'express-async-errors';

import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express, { json } from 'express';
import helmet from 'helmet';

import { userRoutes } from './routes';
import { errorHandler } from './utils';

dotenv.config();

const app = express();

app.use(json());
app.use(helmet());

app.use('/hello', (_req: Request, res: Response) => {
  res.json({ result: true, message: 'Hello Pafin.' });
});

// app.use('/books', bookRoutes);
app.use('/user', userRoutes);

app.use((_, res, _2) => {
  res.status(404).json({ error: 'NOT FOUND' });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
