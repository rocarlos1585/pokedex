import { PokemonType } from '../domain/enums/PokemonType';
import { SceneKind } from './SceneKind';

export interface PokemonTypeStyle {
  readonly label: string;
  readonly color: string;
  readonly textColor: string;
  readonly scene: SceneKind;
}

const DARK_TEXT = '#1A1A1A';
const LIGHT_TEXT = '#FFFFFF';

export const pokemonTypeStyles: Record<PokemonType, PokemonTypeStyle> = {
  [PokemonType.Normal]: { label: 'Normal', color: '#A8A878', textColor: DARK_TEXT, scene: SceneKind.Meadow },
  [PokemonType.Fire]: { label: 'Fuego', color: '#F08030', textColor: DARK_TEXT, scene: SceneKind.Volcano },
  [PokemonType.Water]: { label: 'Agua', color: '#6890F0', textColor: DARK_TEXT, scene: SceneKind.Sea },
  [PokemonType.Electric]: { label: 'Eléctrico', color: '#F8D030', textColor: DARK_TEXT, scene: SceneKind.Storm },
  [PokemonType.Grass]: { label: 'Planta', color: '#78C850', textColor: DARK_TEXT, scene: SceneKind.Forest },
  [PokemonType.Ice]: { label: 'Hielo', color: '#98D8D8', textColor: DARK_TEXT, scene: SceneKind.Sea },
  [PokemonType.Fighting]: { label: 'Lucha', color: '#C03028', textColor: LIGHT_TEXT, scene: SceneKind.Volcano },
  [PokemonType.Poison]: { label: 'Veneno', color: '#A040A0', textColor: LIGHT_TEXT, scene: SceneKind.Forest },
  [PokemonType.Ground]: { label: 'Tierra', color: '#E0C068', textColor: DARK_TEXT, scene: SceneKind.Meadow },
  [PokemonType.Flying]: { label: 'Volador', color: '#A890F0', textColor: DARK_TEXT, scene: SceneKind.Meadow },
  [PokemonType.Psychic]: { label: 'Psíquico', color: '#F85888', textColor: DARK_TEXT, scene: SceneKind.Mystic },
  [PokemonType.Bug]: { label: 'Bicho', color: '#A8B820', textColor: DARK_TEXT, scene: SceneKind.Forest },
  [PokemonType.Rock]: { label: 'Roca', color: '#B8A038', textColor: DARK_TEXT, scene: SceneKind.Meadow },
  [PokemonType.Ghost]: { label: 'Fantasma', color: '#705898', textColor: LIGHT_TEXT, scene: SceneKind.Storm },
  [PokemonType.Dragon]: { label: 'Dragón', color: '#7038F8', textColor: LIGHT_TEXT, scene: SceneKind.Volcano },
  [PokemonType.Dark]: { label: 'Siniestro', color: '#705848', textColor: LIGHT_TEXT, scene: SceneKind.Storm },
  [PokemonType.Steel]: { label: 'Acero', color: '#B8B8D0', textColor: DARK_TEXT, scene: SceneKind.Meadow },
  [PokemonType.Fairy]: { label: 'Hada', color: '#EE99AC', textColor: DARK_TEXT, scene: SceneKind.Mystic },
};

export const DEFAULT_SCENE = SceneKind.Meadow;