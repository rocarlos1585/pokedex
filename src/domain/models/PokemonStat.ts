import { StatName } from '../enums/StatName';

export interface PokemonStat {
  readonly name: StatName;
  readonly baseValue: number;
}