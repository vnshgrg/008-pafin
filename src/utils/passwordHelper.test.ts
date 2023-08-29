import * as bcrypt from 'bcrypt';

import { comparePassword, hashPassword } from './passwordHelpers';

jest.mock('bcrypt');

describe('Password Utils', () => {
  const mockHash = 'mockedHash';
  const mockCompareResult = true;

  beforeEach(() => {
    // Mock bcrypt.hash function
    (bcrypt.hash as jest.Mock).mockResolvedValue(mockHash);

    // Mock bcrypt.compare function
    (bcrypt.compare as jest.Mock).mockResolvedValue(mockCompareResult);
  });

  afterEach(() => {
    // Clear mock implementation after each test
    jest.clearAllMocks();
  });

  it('hashPassword should hash the password', async () => {
    const rawPassword = 'password123';
    const hashedPassword = await hashPassword(rawPassword);

    expect(bcrypt.hash).toHaveBeenCalledWith(rawPassword, 10);
    expect(hashedPassword).toBe(mockHash);
  });

  it('comparePassword should compare passwords correctly', async () => {
    const rawPassword = 'password123';
    const hash = 'actualHash';

    const result = await comparePassword(rawPassword, hash);

    expect(bcrypt.compare).toHaveBeenCalledWith(rawPassword, hash);
    expect(result).toBe(mockCompareResult);
  });
});
