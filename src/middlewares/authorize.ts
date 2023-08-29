import type { NextFunction, Request, Response } from 'express';

import type { Principal } from '../types';
import { BadRequest, verify } from '../utils';

export const authorize =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new BadRequest('Unauthorized');
      }
      const token = authorization.split(' ')[1];

      if (!token) {
        throw new BadRequest('Unauthorized');
      }
      const user = verify(token);

      if (!user) {
        throw new BadRequest('Unauthorized');
      }

      (req as Request & { principal: Principal }).principal = user;
      return next();
    } catch (err) {
      const error = err as BadRequest;
      const { message, statusCode } = error;
      const errorResponse = {
        result: false,
        message,
      };
      return res.status(statusCode || 400).json(errorResponse);
    }
  };
