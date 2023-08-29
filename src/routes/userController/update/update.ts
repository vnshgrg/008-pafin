import { type NextFunction, type Request, type Response } from 'express';

import type { Principal } from '../../../types';
import { createDbClient } from '../../../utils';
import type { UpdateModel } from './update.model';

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { principal } = req as Request & { principal: Principal };
    const { body }: UpdateModel = req;
    const { name, email } = body;

    // crete DB Client
    const db = await createDbClient();

    // Create new user if email has not been registered
    await db.user.update({
      where: { id: principal.id },
      data: {
        name,
        email,
      },
    });

    res.status(200).json({
      result: true,
      message: 'User updated successfully.',
    });
  } catch (error) {
    next(error);
  }
};
