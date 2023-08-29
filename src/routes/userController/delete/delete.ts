import { type NextFunction, type Request, type Response } from 'express';

import type { Principal } from '../../../types';
import { BadRequest, comparePassword, createDbClient } from '../../../utils';
import type { DeleteModel } from './delete.model';

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { principal } = req as Request & { principal: Principal };
    const { body }: DeleteModel = req;
    const { password } = body;

    // crete DB Client
    const db = await createDbClient();

    // get user and check password
    const user = await db.user.findUnique({ where: { id: principal.id } });

    if (!user) {
      throw new BadRequest('Invalid request');
    }

    // Validate current password
    const passwordComparisonResult = await comparePassword(
      password,
      user.password
    );

    if (!passwordComparisonResult) {
      throw new BadRequest('Incorrect password');
    }

    // Update user's password with new password
    // this API assumes that new password has been confirmed in the client-side
    await db.user.delete({
      where: { id: principal.id },
    });

    res.status(200).json({
      result: true,
      message: 'User deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
