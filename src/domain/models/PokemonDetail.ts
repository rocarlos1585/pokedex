import { PokemonType } from '../enums/PokemonType';
import { PokemonAbility } from './PokemonAbility';
import { PokemonStat } from './PokemonStat';

export interface PokemonDetail {
  readonly id: number;
  readonly name: string;
  readonly imageUrl: string;
  readonly types: readonly PokemonType[];
  readonly abilities: readonly PokemonAbility[];
  readonly stats: readonly PokemonStat[];
  readonly heightInMeters: number;
  readonly weightInKilograms: number;
  readonly baseExperience: number | null;
}