import express from 'express';

import { authorize, validate } from '../../middlewares';
import { changePassword, changePasswordSchema } from './changePassword';
import { deleteAccount, deleteSchema } from './delete';
import { login, loginSchema } from './login';
import { register, registerSchema } from './register';
import { update, updateSchema } from './update';

const router = express.Router();

router.post('/', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.patch('/', authorize(), validate(updateSchema), update);
router.patch(
  '/change-password',
  authorize(),
  validate(changePasswordSchema),
  changePassword
);
router.delete('/', authorize(), validate(deleteSchema), deleteAccount);

export const userRoutes = router;
