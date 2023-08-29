import { type NextFunction, type Request, type Response } from 'express';

import type { Principal } from '../../../types';
import {
  BadRequest,
  comparePassword,
  createDbClient,
  hashPassword,
} from '../../../utils';
import type { ChangePasswordModel } from './changePassword.model';

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { principal } = req as Request & { principal: Principal };
    const { body }: ChangePasswordModel = req;
    const { currentPassword, newPassword } = body;

    // crete DB Client
    const db = await createDbClient();

    // get user and check password
    const user = await db.user.findUnique({ where: { id: principal.id } });

    if (!user) {
      throw new BadRequest('Invalid request');
    }

    // Validate current password
    const passwordComparisonResult = await comparePassword(
      currentPassword,
      user.password
    );

    if (!passwordComparisonResult) {
      throw new BadRequest('Incorrect password');
    }

    // Update user's password with new password
    // this API assumes that new password has been confirmed in the client-side
    const hashedNewPassword = await hashPassword(newPassword);
    await db.user.update({
      where: { id: principal.id },
      data: {
        password: hashedNewPassword,
      },
    });

    res.status(200).json({
      result: true,
      message: 'Password successfully.',
    });
  } catch (error) {
    next(error);
  }
};
