import { PokemonDetail } from '../../../domain/models/PokemonDetail';
import { PokemonSummary } from '../../../domain/models/PokemonSummary';
import { PaginatedResult, PaginationParams } from '../../../domain/types/Pagination';
import { CacheEntry } from './CacheEntry';

export interface PokemonLocalDataSource {
  getPokemonList(
    params: PaginationParams,
  ): Promise<CacheEntry<PaginatedResult<PokemonSummary>> | null>;
  savePokemonList(
    params: PaginationParams,
    list: PaginatedResult<PokemonSummary>,
  ): Promise<void>;
  getPokemonDetail(id: number): Promise<CacheEntry<PokemonDetail> | null>;
  savePokemonDetail(detail: PokemonDetail): Promise<void>;
}