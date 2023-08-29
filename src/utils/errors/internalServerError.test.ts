import type { CustomError } from '../../types';
import { InternalServerError } from './internalServerError'; // Update this with the actual path

describe('InternalServerError', () => {
  it('should be an instance of Error', () => {
    const internalServerError = new InternalServerError(
      'Internal server error'
    );
    expect(internalServerError).toBeInstanceOf(Error);
  });

  it('should implement CustomError interface', () => {
    const internalServerError = new InternalServerError(
      'Internal server error'
    );
    const customError: CustomError = internalServerError;
    expect(customError.statusCode).toBe(500);
    expect(customError.message).toBe('Internal server error');
  });

  it('should have a status code of 500', () => {
    const internalServerError = new InternalServerError(
      'Internal server error'
    );
    expect(internalServerError.statusCode).toBe(500);
  });

  it('should have the provided message', () => {
    const message = 'An unexpected error occurred';
    const internalServerError = new InternalServerError(message);
    expect(internalServerError.message).toBe(message);
  });
});
