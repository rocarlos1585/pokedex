import { PokemonRepository } from '../../domain/interfaces/PokemonRepository';

export function createMockPokemonRepository(): jest.Mocked<PokemonRepository> {
  return {
    getPokemonList: jest.fn(),
    getPokemonDetail: jest.fn(),
  };
}