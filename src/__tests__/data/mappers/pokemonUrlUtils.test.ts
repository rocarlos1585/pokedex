import { buildArtworkUrl, extractIdFromUrl } from '../../../data/mappers/PokemonUrlUtils';
import { ErrorCode } from '../../../domain/enums/ErrorCode';
import { AppError } from '../../../domain/errors/AppError';

describe('extractIdFromUrl', () => {
  it('extracts the id from a URL with a trailing slash', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25);
  });

  it('extracts the id from a URL without a trailing slash', () => {
    expect(extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/25')).toBe(25);
  });

  it('throws an AppError when the URL has no id', () => {
    expect(() => extractIdFromUrl('https://pokeapi.co/api/v2/pokemon/')).toThrow(AppError);
  });

  it('uses the Unknown error code when the URL is invalid', () => {
    expect.assertions(1);

    try {
      extractIdFromUrl('not-a-url');
    } catch (error) {
      expect((error as AppError).code).toBe(ErrorCode.Unknown);
    }
  });
});

describe('buildArtworkUrl', () => {
  it('builds the official artwork URL for an id', () => {
    expect(buildArtworkUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    );
  });
});