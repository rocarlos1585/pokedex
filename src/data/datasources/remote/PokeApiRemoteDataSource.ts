import { HttpClient } from '../../../core/http/HttpClient';
import { PaginationParams } from '../../../domain/types/Pagination';
import { PokemonDetailResponseDto } from '../../dtos/PokemonDetailResponseDto';
import { PokemonListResponseDto } from '../../dtos/PokemonListResponseDto';
import { PokemonRemoteDataSource } from './PokemonRemoteDataSource';

export class PokeApiRemoteDataSource implements PokemonRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  fetchPokemonList({ limit, offset }: PaginationParams): Promise<PokemonListResponseDto> {
    return this.httpClient.get<PokemonListResponseDto>(
      `/pokemon?limit=${limit}&offset=${offset}`,
    );
  }

  fetchPokemonDetail(id: number): Promise<PokemonDetailResponseDto> {
    return this.httpClient.get<PokemonDetailResponseDto>(`/pokemon/${id}`);
  }
}