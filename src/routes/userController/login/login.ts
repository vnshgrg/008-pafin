import type { User } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import pick from 'lodash.pick';

import type { Principal } from '../../../types';
import {
  BadRequest,
  comparePassword,
  createDbClient,
  sign,
} from '../../../utils';
import type { LoginModel } from './login.model';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body }: LoginModel = req;

    const { email, password } = body;

    // crete DB Client
    const db = await createDbClient();

    // check if email has been already registered
    const user: User | null = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequest('Incorrect email or password');
    }

    // Validate password
    const passwordComparisonResult = await comparePassword(
      password,
      user.password
    );

    if (!passwordComparisonResult) {
      throw new BadRequest('Incorrect email or password');
    }

    // remove raw password from being used
    const principal: Principal = pick(user, ['id', 'name', 'email']);
    const token = sign(principal);

    res.status(200).json({
      result: true,
      token,
      data: principal,
    });
  } catch (error) {
    next(error);
  }
};
