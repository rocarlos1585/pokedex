import { NamedApiResourceDto } from './NamedApiResourceDto';

export interface PokemonTypeSlotDto {
  slot: number;
  type: NamedApiResourceDto;
}

export interface PokemonAbilitySlotDto {
  slot: number;
  is_hidden: boolean;
  ability: NamedApiResourceDto;
}

export interface PokemonStatDto {
  base_stat: number;
  effort: number;
  stat: NamedApiResourceDto;
}

export interface PokemonSpritesDto {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonDetailResponseDto {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: PokemonTypeSlotDto[];
  abilities: PokemonAbilitySlotDto[];
  stats: PokemonStatDto[];
  sprites: PokemonSpritesDto;
}