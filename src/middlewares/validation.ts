import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodError } from 'zod';

import type { ValidationError } from '../types';

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      const error = err as ZodError<typeof schema>;
      const errorData: ValidationError[] = error.issues.map(
        ({ message, code, path }) => ({
          code,
          path: path.join('.'),
          message,
        })
      );
      return res
        .status(400)
        .json({ result: false, message: '', errors: errorData });
    }
  };
