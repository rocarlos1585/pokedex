import { PokemonDetail } from '../models/PokemonDetail';
import { PokemonSummary } from '../models/PokemonSummary';
import { DataResult } from '../types/DataResult';
import { PaginatedResult, PaginationParams } from '../types/Pagination';

/**
 * Contrato de acceso a datos de Pokémon.
 * Las implementaciones deben lanzar `AppError` ante cualquier fallo.
 */
export interface PokemonRepository {
  getPokemonList(
    params: PaginationParams,
  ): Promise<DataResult<PaginatedResult<PokemonSummary>>>;

  getPokemonDetail(id: number): Promise<DataResult<PokemonDetail>>;
}