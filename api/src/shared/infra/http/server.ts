import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import { errors } from 'celebrate';
import cors from 'cors';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, req: Request, resp: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return resp
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return resp.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
