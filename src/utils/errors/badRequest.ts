import type { CustomError } from '../../types';

export class BadRequest extends Error implements CustomError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}
