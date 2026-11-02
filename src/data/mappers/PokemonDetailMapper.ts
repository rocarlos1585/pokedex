import { PokemonType } from '../../domain/enums/PokemonType';
import { StatName } from '../../domain/enums/StatName';
import { PokemonAbility } from '../../domain/models/PokemonAbility';
import { PokemonDetail } from '../../domain/models/PokemonDetail';
import { PokemonStat } from '../../domain/models/PokemonStat';
import {
  PokemonAbilitySlotDto,
  PokemonDetailResponseDto,
  PokemonStatDto,
} from '../dtos/PokemonDetailResponseDto';
import { buildArtworkUrl } from './PokemonUrlUtils';

const DECIMETERS_PER_METER = 10;
const HECTOGRAMS_PER_KILOGRAM = 10;

function isPokemonType(value: string): value is PokemonType {
  return (Object.values(PokemonType) as string[]).includes(value);
}

function isStatName(value: string): value is StatName {
  return (Object.values(StatName) as string[]).includes(value);
}

function toPokemonAbility(dto: PokemonAbilitySlotDto): PokemonAbility {
  return {
    name: dto.ability.name,
    isHidden: dto.is_hidden,
  };
}

function toPokemonStats(dtos: PokemonStatDto[]): PokemonStat[] {
  return dtos
    .filter(dto => isStatName(dto.stat.name))
    .map(dto => ({
      name: dto.stat.name as StatName,
      baseValue: dto.base_stat,
    }));
}

export function toPokemonDetail(dto: PokemonDetailResponseDto): PokemonDetail {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl:
      dto.sprites.other?.['official-artwork']?.front_default ??
      dto.sprites.front_default ??
      buildArtworkUrl(dto.id),
    types: dto.types.map(slot => slot.type.name).filter(isPokemonType),
    abilities: dto.abilities.map(toPokemonAbility),
    stats: toPokemonStats(dto.stats),
    heightInMeters: dto.height / DECIMETERS_PER_METER,
    weightInKilograms: dto.weight / HECTOGRAMS_PER_KILOGRAM,
    baseExperience: dto.base_experience,
  };
}