import type { CustomError } from '../../types';

export class InternalServerError extends Error implements CustomError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
  }
}
