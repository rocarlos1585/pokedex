import { ErrorCode } from '../enums/ErrorCode';
import { AppError } from './AppError';

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }
  return new AppError(ErrorCode.Unknown, 'Unexpected error', error);
}