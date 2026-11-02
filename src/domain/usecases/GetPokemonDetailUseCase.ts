import { ErrorCode } from '../enums/ErrorCode';
import { AppError } from '../errors/AppError';
import { PokemonRepository } from '../interfaces/PokemonRepository';
import { PokemonDetail } from '../models/PokemonDetail';
import { DataResult } from '../types/DataResult';

export class GetPokemonDetailUseCase {
  constructor(private readonly repository: PokemonRepository) {}

  async execute(id: number): Promise<DataResult<PokemonDetail>> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(ErrorCode.InvalidArgument, `Invalid Pokémon id: ${id}`);
    }
    return this.repository.getPokemonDetail(id);
  }
}