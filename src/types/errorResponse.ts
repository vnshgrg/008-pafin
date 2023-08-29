export type ValidationError = {
  code: string;
  path: string;
  message: string;
};

export interface CustomError extends Error {
  message: string;
  statusCode: number | undefined;
}
