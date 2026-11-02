import { DataOrigin } from '../enums/DataOrigin';

export interface DataResult<T> {
  readonly data: T;
  readonly origin: DataOrigin;
}