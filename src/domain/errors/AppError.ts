import { ErrorCode } from '../enums/ErrorCode';

//why a class and not an interface?
//the models describes data, AppError need to exist in runtime to can make throw it
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly originalError?: unknown;

  constructor(code: ErrorCode, message: string, originalError?: unknown) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.originalError = originalError;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}