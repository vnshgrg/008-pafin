import jwt from 'jsonwebtoken';

import { sign, verify } from './jwt';

jest.mock('jsonwebtoken');

describe('JWT Utils', () => {
  const mockToken = 'mockedToken';
  const mockData = { userId: '123', username: 'testuser' };

  beforeEach(() => {
    // Mock jwt.sign function
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);

    // Mock jwt.verify function
    (jwt.verify as jest.Mock).mockReturnValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sign should create a JWT token', () => {
    const token = sign(mockData);

    expect(jwt.sign).toHaveBeenCalledWith(
      {
        ...mockData,
        iat: expect.any(Number),
        exp: expect.any(Number),
      },
      expect.any(String)
    );

    expect(token).toBe(mockToken);
  });

  it('verify should verify and return data from a JWT token', () => {
    const token = 'actualToken';

    const result = verify(token);

    expect(jwt.verify).toHaveBeenCalledWith(token, expect.any(String));
    expect(result).toEqual(mockData);
  });
});
