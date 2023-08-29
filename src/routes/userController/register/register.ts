import type { NextFunction, Request, Response } from 'express';

import { BadRequest, createDbClient, hashPassword } from '../../../utils';
import type { RegisterModel } from './register.model';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body }: RegisterModel = req;

    const { name, email, password } = body;

    // crete DB Client
    const db = await createDbClient();

    // check if email has been already registered
    const user = await db.user.findUnique({ where: { email } });
    if (user) {
      throw new BadRequest('Email already registered');
    }

    // Create new user if email has not been registered
    const hashedPassword = await hashPassword(password);
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      result: true,
      message: 'User registered successfully.',
    });
  } catch (error) {
    next(error);
  }
};
