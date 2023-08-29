import { createDbClient } from './dbConnection';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    $disconnect: jest.fn(),
  })),
}));

describe('Database Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should reuse existing PrismaClient instance', () => {
    const dbClient1 = createDbClient();
    const dbClient2 = createDbClient();

    expect(dbClient1).toBe(dbClient2);
  });
});
