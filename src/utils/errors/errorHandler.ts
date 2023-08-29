import { type NextFunction, type Request, type Response } from 'express';

import type { CustomError } from '../../types';

export const errorHandler = (
  error: Error & CustomError,
  _: Request,
  response: Response,
  __: NextFunction
) => {
  // Error handling middleware functionality
  const status = error.statusCode || 500;
  // send back an easily understandable error message to the caller
  response
    .status(status)
    .send({ result: false, message: error.message || '', errors: null });
};
