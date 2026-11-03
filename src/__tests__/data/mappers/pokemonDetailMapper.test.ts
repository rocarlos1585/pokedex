import { toPokemonDetail } from '../../../data/mappers/PokemonDetailMapper';
import { buildArtworkUrl } from '../../../data/mappers/PokemonUrlUtils';
import { PokemonType } from '../../../domain/enums/PokemonType';
import { StatName } from '../../../domain/enums/StatName';
import { buildPokemonDetailDto } from '../../fixtures/pokemonDtoFixtures';

describe('toPokemonDetail', () => {
  it('maps a complete DTO into a domain model', () => {
    const dto = buildPokemonDetailDto();

    const detail = toPokemonDetail(dto);

    expect(detail).toEqual({
      id: 25,
      name: 'pikachu',
      imageUrl: 'https://example.com/artwork.png',
      types: [PokemonType.Electric],
      abilities: [
        { name: 'static', isHidden: false },
        { name: 'lightning-rod', isHidden: true },
      ],
      stats: [
        { name: StatName.Hp, baseValue: 35 },
        { name: StatName.Attack, baseValue: 55 },
        { name: StatName.Defense, baseValue: 40 },
        { name: StatName.SpecialAttack, baseValue: 50 },
        { name: StatName.SpecialDefense, baseValue: 50 },
        { name: StatName.Speed, baseValue: 90 },
      ],
      heightInMeters: 0.4,
      weightInKilograms: 6,
      baseExperience: 112,
    });
  });

  describe('unit conversion', () => {
    it('converts height from decimeters to meters', () => {
      const detail = toPokemonDetail(buildPokemonDetailDto({ height: 17 }));

      expect(detail.heightInMeters).toBe(1.7);
    });

    it('converts weight from hectograms to kilograms', () => {
      const detail = toPokemonDetail(buildPokemonDetailDto({ weight: 905 }));

      expect(detail.weightInKilograms).toBe(90.5);
    });
  });

  describe('image selection', () => {
    it('falls back to the default sprite when there is no official artwork', () => {
      const dto = buildPokemonDetailDto({
        sprites: {
          front_default: 'https://example.com/front.png',
          other: { 'official-artwork': { front_default: null } },
        },
      });

      expect(toPokemonDetail(dto).imageUrl).toBe('https://example.com/front.png');
    });

    it('builds the artwork URL when the API returns no images', () => {
      const dto = buildPokemonDetailDto({ sprites: { front_default: null } });

      expect(toPokemonDetail(dto).imageUrl).toBe(buildArtworkUrl(25));
    });
  });

  describe('unknown values', () => {
    it('ignores types that are not in the PokemonType enum', () => {
      const dto = buildPokemonDetailDto({
        types: [
          { slot: 1, type: { name: 'electric', url: '' } },
          { slot: 2, type: { name: 'unknown-type', url: '' } },
        ],
      });

      expect(toPokemonDetail(dto).types).toEqual([PokemonType.Electric]);
    });

    it('ignores stats that are not in the StatName enum', () => {
      const dto = buildPokemonDetailDto({
        stats: [
          { base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } },
          { base_stat: 10, effort: 0, stat: { name: 'accuracy', url: '' } },
        ],
      });

      expect(toPokemonDetail(dto).stats).toEqual([{ name: StatName.Hp, baseValue: 35 }]);
    });
  });

  it('keeps a null base experience', () => {
    const dto = buildPokemonDetailDto({ base_experience: null });

    expect(toPokemonDetail(dto).baseExperience).toBeNull();
  });
});