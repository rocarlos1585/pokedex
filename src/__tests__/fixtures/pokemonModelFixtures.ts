import { DataOrigin } from '../../domain/enums/DataOrigin';
import { PokemonType } from '../../domain/enums/PokemonType';
import { StatName } from '../../domain/enums/StatName';
import { PokemonDetail } from '../../domain/models/PokemonDetail';
import { PokemonSummary } from '../../domain/models/PokemonSummary';
import { DataResult } from '../../domain/types/DataResult';
import { PaginatedResult } from '../../domain/types/Pagination';

export function buildPokemonSummary(overrides: Partial<PokemonSummary> = {}): PokemonSummary {
  return {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/25.png',
    ...overrides,
  };
}

export function buildPokemonDetail(overrides: Partial<PokemonDetail> = {}): PokemonDetail {
  return {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/25.png',
    types: [PokemonType.Electric],
    abilities: [{ name: 'static', isHidden: false }],
    stats: [{ name: StatName.Speed, baseValue: 90 }],
    heightInMeters: 0.4,
    weightInKilograms: 6,
    baseExperience: 112,
    ...overrides,
  };
}

export function buildPage(
  items: PokemonSummary[],
  nextOffset: number | null = null,
): PaginatedResult<PokemonSummary> {
  return { items, totalCount: 1302, nextOffset };
}

export function remoteResult<T>(data: T): DataResult<T> {
  return { data, origin: DataOrigin.Remote };
}

export function cacheResult<T>(data: T): DataResult<T> {
  return { data, origin: DataOrigin.Cache };
}