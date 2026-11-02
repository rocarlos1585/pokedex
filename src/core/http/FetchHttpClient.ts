import { ErrorCode } from '../../domain/enums/ErrorCode';
import { AppError } from '../../domain/errors/AppError';
import { DEFAULT_TIMEOUT_MS } from './apiConfig';
import { HttpClient } from './HttpClient';

export class FetchHttpClient implements HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly timeoutMs: number = DEFAULT_TIMEOUT_MS,
  ) {}

  async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw this.createHttpError(response.status, url);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw this.normalizeError(error, url);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private createHttpError(status: number, url: string): AppError {
    if (status === 404) {
      return new AppError(ErrorCode.NotFound, `Resource not found: ${url}`);
    }
    if (status >= 500) {
      return new AppError(ErrorCode.Server, `Server error ${status}: ${url}`);
    }
    return new AppError(ErrorCode.Unknown, `Unexpected status ${status}: ${url}`);
  }

  private normalizeError(error: unknown, url: string): AppError {
    if (error instanceof AppError) {
      return error;
    }
    if (error instanceof Error && error.name === 'AbortError') {
      return new AppError(ErrorCode.Timeout, `Request timed out: ${url}`, error);
    }
    if (error instanceof SyntaxError) {
      return new AppError(ErrorCode.Unknown, `Invalid JSON response: ${url}`, error);
    }
    return new AppError(ErrorCode.Network, `Network request failed: ${url}`, error);
  }
}