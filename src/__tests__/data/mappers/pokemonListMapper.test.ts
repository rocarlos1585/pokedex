import { toPaginatedPokemonList, toPokemonSummary } from '../../../data/mappers/PokemonListMapper';
import { buildArtworkUrl } from '../../../data/mappers/PokemonUrlUtils';
import { buildPokemonListDto } from '../../fixtures/pokemonDtoFixtures';

describe('toPokemonSummary', () => {
  it('maps a list item into a summary with id and image', () => {
    const dto = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' };

    const summary = toPokemonSummary(dto);

    expect(summary).toEqual({
      id: 25,
      name: 'pikachu',
      imageUrl: buildArtworkUrl(25),
    });
  });
});

describe('toPaginatedPokemonList', () => {
  it('maps every result into a summary', () => {
    const dto = buildPokemonListDto();

    const result = toPaginatedPokemonList(dto, { limit: 2, offset: 0 });

    expect(result.items).toHaveLength(2);
    expect(result.items.map(item => item.id)).toEqual([1, 2]);
  });

  it('copies the total count from the response', () => {
    const result = toPaginatedPokemonList(buildPokemonListDto(), { limit: 2, offset: 0 });

    expect(result.totalCount).toBe(1302);
  });

  it('calculates the next offset when there is a next page', () => {
    const dto = buildPokemonListDto();

    const result = toPaginatedPokemonList(dto, { limit: 2, offset: 20 });

    expect(result.nextOffset).toBe(22);
  });

  it('returns a null next offset on the last page', () => {
    const dto = buildPokemonListDto({ next: null });

    const result = toPaginatedPokemonList(dto, { limit: 2, offset: 0 });

    expect(result.nextOffset).toBeNull();
  });
});