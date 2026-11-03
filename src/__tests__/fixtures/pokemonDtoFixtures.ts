import { PokemonDetailResponseDto } from '../../data/dtos/PokemonDetailResponseDto';
import { PokemonListResponseDto } from '../../data/dtos/PokemonListResponseDto';

const API = 'https://pokeapi.co/api/v2';

export function buildPokemonDetailDto(
  overrides: Partial<PokemonDetailResponseDto> = {},
): PokemonDetailResponseDto {
  return {
    id: 25,
    name: 'pikachu',
    height: 4,
    weight: 60,
    base_experience: 112,
    types: [{ slot: 1, type: { name: 'electric', url: `${API}/type/13/` } }],
    abilities: [
      { slot: 1, is_hidden: false, ability: { name: 'static', url: `${API}/ability/9/` } },
      { slot: 3, is_hidden: true, ability: { name: 'lightning-rod', url: `${API}/ability/31/` } },
    ],
    stats: [
      { base_stat: 35, effort: 0, stat: { name: 'hp', url: `${API}/stat/1/` } },
      { base_stat: 55, effort: 0, stat: { name: 'attack', url: `${API}/stat/2/` } },
      { base_stat: 40, effort: 0, stat: { name: 'defense', url: `${API}/stat/3/` } },
      { base_stat: 50, effort: 0, stat: { name: 'special-attack', url: `${API}/stat/4/` } },
      { base_stat: 50, effort: 0, stat: { name: 'special-defense', url: `${API}/stat/5/` } },
      { base_stat: 90, effort: 2, stat: { name: 'speed', url: `${API}/stat/6/` } },
    ],
    sprites: {
      front_default: 'https://example.com/front.png',
      other: { 'official-artwork': { front_default: 'https://example.com/artwork.png' } },
    },
    ...overrides,
  };
}

export function buildPokemonListDto(
  overrides: Partial<PokemonListResponseDto> = {},
): PokemonListResponseDto {
  return {
    count: 1302,
    next: `${API}/pokemon?offset=2&limit=2`,
    previous: null,
    results: [
      { name: 'bulbasaur', url: `${API}/pokemon/1/` },
      { name: 'ivysaur', url: `${API}/pokemon/2/` },
    ],
    ...overrides,
  };
}