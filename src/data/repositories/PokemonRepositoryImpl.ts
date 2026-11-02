import { DataOrigin } from '../../domain/enums/DataOrigin';
import { ErrorCode } from '../../domain/enums/ErrorCode';
import { AppError } from '../../domain/errors/AppError';
import { PokemonRepository } from '../../domain/interfaces/PokemonRepository';
import { PokemonDetail } from '../../domain/models/PokemonDetail';
import { PokemonSummary } from '../../domain/models/PokemonSummary';
import { DataResult } from '../../domain/types/DataResult';
import { PaginatedResult, PaginationParams } from '../../domain/types/Pagination';
import { CacheEntry } from '../datasources/local/CacheEntry';
import { PokemonLocalDataSource } from '../datasources/local/PokemonLocalDataSource';
import { PokemonRemoteDataSource } from '../datasources/remote/PokemonRemoteDataSource';
import { toPokemonDetail } from '../mappers/PokemonDetailMapper';
import { toPaginatedPokemonList } from '../mappers/PokemonListMapper';
import { toAppError } from '../../domain/errors/toAppError';

export class PokemonRepositoryImpl implements PokemonRepository {
  constructor(
    private readonly remote: PokemonRemoteDataSource,
    private readonly local: PokemonLocalDataSource,
  ) {}

  async getPokemonList(
    params: PaginationParams,
  ): Promise<DataResult<PaginatedResult<PokemonSummary>>> {
    try {
      const dto = await this.remote.fetchPokemonList(params);
      const list = toPaginatedPokemonList(dto, params);
      await this.saveSafely(() => this.local.savePokemonList(params, list));
      return { data: list, origin: DataOrigin.Remote };
    } catch (error) {
      return this.fallbackToCache(error, () => this.local.getPokemonList(params));
    }
  }

  async getPokemonDetail(id: number): Promise<DataResult<PokemonDetail>> {
    try {
      const dto = await this.remote.fetchPokemonDetail(id);
      const detail = toPokemonDetail(dto);
      await this.saveSafely(() => this.local.savePokemonDetail(detail));
      return { data: detail, origin: DataOrigin.Remote };
    } catch (error) {
      return this.fallbackToCache(error, () => this.local.getPokemonDetail(id));
    }
  }

  private async fallbackToCache<T>(
    error: unknown,
    readCache: () => Promise<CacheEntry<T> | null>,
  ): Promise<DataResult<T>> {
    const cached = await this.readSafely(readCache);
    if (cached) {
      return { data: cached.data, origin: DataOrigin.Cache };
    }
    throw error instanceof AppError
      ? error
      : toAppError(error);
  }

  private async readSafely<T>(
    readCache: () => Promise<CacheEntry<T> | null>,
  ): Promise<CacheEntry<T> | null> {
    try {
      return await readCache();
    } catch {
      return null;
    }
  }

  private async saveSafely(save: () => Promise<void>): Promise<void> {
    try {
      await save();
    } catch {
      //Improvement: if the cache fails, the app continues with the data from the network
    }
  }
}