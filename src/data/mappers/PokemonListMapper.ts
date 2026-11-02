import { PokemonSummary } from '../../domain/models/PokemonSummary';
import { PaginatedResult, PaginationParams } from '../../domain/types/Pagination';
import { NamedApiResourceDto } from '../dtos/NamedApiResourceDto';
import { PokemonListResponseDto } from '../dtos/PokemonListResponseDto';
import { buildArtworkUrl, extractIdFromUrl } from './PokemonUrlUtils';

export function toPokemonSummary(dto: NamedApiResourceDto): PokemonSummary {
  const id = extractIdFromUrl(dto.url);
  return {
    id,
    name: dto.name,
    imageUrl: buildArtworkUrl(id),
  };
}

export function toPaginatedPokemonList(
  dto: PokemonListResponseDto,
  params: PaginationParams,
): PaginatedResult<PokemonSummary> {
  return {
    items: dto.results.map(toPokemonSummary),
    totalCount: dto.count,
    nextOffset: dto.next !== null ? params.offset + dto.results.length : null,
  };
}