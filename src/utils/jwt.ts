import { configDotenv } from 'dotenv';
import jwt from 'jsonwebtoken';

configDotenv();

const secret = process.env.JWT_SECRET as string;
const tokenValidTime = 60 * 60 * 24; // 24 hours

export const sign = (data: any) => {
  return jwt.sign(
    {
      ...data,
      iat: Math.floor(new Date().getTime() / 1000),
      exp: Math.floor(new Date().getTime() / 1000) + tokenValidTime,
    },
    secret
  );
};

export const verify = (token: string): any => {
  const result = jwt.verify(token, secret);
  return result;
};
