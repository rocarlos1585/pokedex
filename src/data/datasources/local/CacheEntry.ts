export interface CacheEntry<T> {
    readonly data: T;
    readonly savedAt: number;
  }