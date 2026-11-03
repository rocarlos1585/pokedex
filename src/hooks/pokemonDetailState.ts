import { DataOrigin } from '../domain/enums/DataOrigin';
import { AppError } from '../domain/errors/AppError';
import { PokemonDetail } from '../domain/models/PokemonDetail';

export type PokemonDetailState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly error: AppError }
  | { readonly status: 'success'; readonly pokemon: PokemonDetail; readonly origin: DataOrigin };

export type PokemonDetailAction =
  | { readonly type: 'LOAD' }
  | { readonly type: 'SUCCESS'; readonly pokemon: PokemonDetail; readonly origin: DataOrigin }
  | { readonly type: 'ERROR'; readonly error: AppError };

export const INITIAL_POKEMON_DETAIL_STATE: PokemonDetailState = { status: 'loading' };

export function pokemonDetailReducer(
  _state: PokemonDetailState,
  action: PokemonDetailAction,
): PokemonDetailState {
  switch (action.type) {
    case 'LOAD':
      return { status: 'loading' };
    case 'SUCCESS':
      return { status: 'success', pokemon: action.pokemon, origin: action.origin };
    case 'ERROR':
      return { status: 'error', error: action.error };
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}