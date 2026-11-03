import { ErrorCode } from '../domain/enums/ErrorCode';
import { AppError } from '../domain/errors/AppError';

const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.Network]: 'No hay conexión a internet. Revisa tu conexión e inténtalo de nuevo.',
  [ErrorCode.Timeout]: 'El servidor tardó demasiado en responder. Inténtalo de nuevo.',
  [ErrorCode.NotFound]: 'No encontramos la información solicitada.',
  [ErrorCode.Server]: 'El servicio no está disponible en este momento. Inténtalo más tarde.',
  [ErrorCode.InvalidArgument]: 'La solicitud no es válida.',
  [ErrorCode.Unknown]: 'Ocurrió un error inesperado. Inténtalo de nuevo.',
};

export function getErrorMessage(error: AppError): string {
  return ERROR_MESSAGES[error.code];
}