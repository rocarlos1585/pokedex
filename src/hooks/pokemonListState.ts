import { DataOrigin } from '../domain/enums/DataOrigin';
import { AppError } from '../domain/errors/AppError';
import { PokemonSummary } from '../domain/models/PokemonSummary';
import { PaginatedResult } from '../domain/types/Pagination';

export type PokemonListState =
  | { readonly status: 'loading' }
  | { readonly status: 'error'; readonly error: AppError }
  | { readonly status: 'empty' }
  | {
      readonly status: 'success';
      readonly items: readonly PokemonSummary[];
      readonly nextOffset: number | null;
      readonly origin: DataOrigin;
      readonly isLoadingMore: boolean;
      readonly isRefreshing: boolean;
      readonly transientError: AppError | null;
    };

export type PokemonListAction =
  | { readonly type: 'LOAD_INITIAL' }
  | { readonly type: 'REFRESH' }
  | { readonly type: 'FIRST_PAGE_SUCCESS'; readonly page: PaginatedResult<PokemonSummary>; readonly origin: DataOrigin }
  | { readonly type: 'FIRST_PAGE_ERROR'; readonly error: AppError }
  | { readonly type: 'LOAD_MORE' }
  | { readonly type: 'LOAD_MORE_SUCCESS'; readonly page: PaginatedResult<PokemonSummary>; readonly origin: DataOrigin }
  | { readonly type: 'LOAD_MORE_ERROR'; readonly error: AppError };

export const INITIAL_POKEMON_LIST_STATE: PokemonListState = { status: 'loading' };

function appendUnique(
  current: readonly PokemonSummary[],
  incoming: readonly PokemonSummary[],
): PokemonSummary[] {
  const existingIds = new Set(current.map(pokemon => pokemon.id));
  return [...current, ...incoming.filter(pokemon => !existingIds.has(pokemon.id))];
}

export function pokemonListReducer(
  state: PokemonListState,
  action: PokemonListAction,
): PokemonListState {
  switch (action.type) {
    case 'LOAD_INITIAL':
      return { status: 'loading' };

    case 'REFRESH':
      return state.status === 'success'
        ? { ...state, isRefreshing: true, transientError: null }
        : state;

    case 'FIRST_PAGE_SUCCESS':
      if (action.page.items.length === 0) {
        return { status: 'empty' };
      }
      return {
        status: 'success',
        items: action.page.items,
        nextOffset: action.page.nextOffset,
        origin: action.origin,
        isLoadingMore: false,
        isRefreshing: false,
        transientError: null,
      };

    case 'FIRST_PAGE_ERROR':
      return state.status === 'success'
        ? { ...state, isRefreshing: false, transientError: action.error }
        : { status: 'error', error: action.error };

    case 'LOAD_MORE':
      return state.status === 'success'
        ? { ...state, isLoadingMore: true, transientError: null }
        : state;

    case 'LOAD_MORE_SUCCESS':
      if (state.status !== 'success') {
        return state;
      }
      return {
        ...state,
        items: appendUnique(state.items, action.page.items),
        nextOffset: action.page.nextOffset,
        origin: action.origin === DataOrigin.Cache ? DataOrigin.Cache : state.origin,
        isLoadingMore: false,
      };

    case 'LOAD_MORE_ERROR':
      return state.status === 'success'
        ? { ...state, isLoadingMore: false, transientError: action.error }
        : state;

    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}