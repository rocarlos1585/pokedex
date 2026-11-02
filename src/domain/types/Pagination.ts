export interface PaginationParams {
    readonly limit: number;
    readonly offset: number;
  }
  
  export interface PaginatedResult<T> {
    readonly items: readonly T[];
    readonly totalCount: number;
    readonly nextOffset: number | null;
  }