import { ErrorCode } from '../enums/ErrorCode';
import { AppError } from '../errors/AppError';
import { PokemonRepository } from '../interfaces/PokemonRepository';
import { PokemonSummary } from '../models/PokemonSummary';
import { DataResult } from '../types/DataResult';
import { PaginatedResult, PaginationParams } from '../types/Pagination';

export const DEFAULT_PAGE_SIZE = 20;

export class GetPokemonListUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute(
    params: PaginationParams = { limit: DEFAULT_PAGE_SIZE, offset: 0 },
  ): Promise<DataResult<PaginatedResult<PokemonSummary>>> {
    if (params.limit <= 0 || params.offset < 0) {
      throw new AppError(
        ErrorCode.InvalidArgument,
        `Invalid pagination params: limit=${params.limit}, offset=${params.offset}`,
      );
    }
    return this.repository.getPokemonList(params);
  }
}