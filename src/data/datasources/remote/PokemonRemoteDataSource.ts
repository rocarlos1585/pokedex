import { PaginationParams } from '../../../domain/types/Pagination';
import { PokemonDetailResponseDto } from '../../dtos/PokemonDetailResponseDto';
import { PokemonListResponseDto } from '../../dtos/PokemonListResponseDto';

export interface PokemonRemoteDataSource {
  fetchPokemonList(params: PaginationParams): Promise<PokemonListResponseDto>;
  fetchPokemonDetail(id: number): Promise<PokemonDetailResponseDto>;
}