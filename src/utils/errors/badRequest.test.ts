import type { CustomError } from '../../types';
import { BadRequest } from './badRequest';

describe('BadRequest', () => {
  it('should be an instance of Error', () => {
    const badRequest = new BadRequest('Bad request');
    expect(badRequest).toBeInstanceOf(Error);
  });

  it('should implement CustomError interface', () => {
    const badRequest = new BadRequest('Bad request');
    const customError: CustomError = badRequest;
    expect(customError.statusCode).toBe(400);
    expect(customError.message).toBe('Bad request');
  });

  it('should have a status code of 400', () => {
    const badRequest = new BadRequest('Bad request');
    expect(badRequest.statusCode).toBe(400);
  });

  it('should have the provided message', () => {
    const message = 'This is a bad request';
    const badRequest = new BadRequest(message);
    expect(badRequest.message).toBe(message);
  });
});
