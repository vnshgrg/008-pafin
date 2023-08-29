import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (raw: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(raw, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (
  raw: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};
