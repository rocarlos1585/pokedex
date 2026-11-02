import { KeyValueStorage } from '../../../core/storage/KeyValueStorage';
import { PokemonDetail } from '../../../domain/models/PokemonDetail';
import { PokemonSummary } from '../../../domain/models/PokemonSummary';
import { PaginatedResult, PaginationParams } from '../../../domain/types/Pagination';
import { CacheEntry } from './CacheEntry';
import { PokemonLocalDataSource } from './PokemonLocalDataSource';

const CACHE_VERSION = 'v1';
const KEY_PREFIX = `@pokedex/${CACHE_VERSION}`;

const listKey = ({ limit, offset }: PaginationParams): string =>
  `${KEY_PREFIX}/list/${limit}/${offset}`;

const detailKey = (id: number): string => `${KEY_PREFIX}/detail/${id}`;

export class AsyncPokemonLocalDataSource implements PokemonLocalDataSource {
  constructor(private readonly storage: KeyValueStorage) {}

  getPokemonList(
    params: PaginationParams,
  ): Promise<CacheEntry<PaginatedResult<PokemonSummary>> | null> {
    return this.storage.getItem(listKey(params));
  }

  savePokemonList(
    params: PaginationParams,
    list: PaginatedResult<PokemonSummary>,
  ): Promise<void> {
    return this.storage.setItem(listKey(params), this.createEntry(list));
  }

  getPokemonDetail(id: number): Promise<CacheEntry<PokemonDetail> | null> {
    return this.storage.getItem(detailKey(id));
  }

  savePokemonDetail(detail: PokemonDetail): Promise<void> {
    return this.storage.setItem(detailKey(detail.id), this.createEntry(detail));
  }

  private createEntry<T>(data: T): CacheEntry<T> {
    return { data, savedAt: Date.now() };
  }
}