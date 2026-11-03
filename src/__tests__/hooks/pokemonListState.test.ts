import { DataOrigin } from '../../../src/domain/enums/DataOrigin';
import { ErrorCode } from '../../../src/domain/enums/ErrorCode';
import { AppError } from '../../../src/domain/errors/AppError';
import { PokemonListState, pokemonListReducer } from '../../../src/hooks/pokemonListState';
import { buildPage, buildPokemonSummary } from '../fixtures/pokemonModelFixtures';

const ERROR = new AppError(ErrorCode.Network, 'No connection');

function successState(overrides: Partial<Extract<PokemonListState, { status: 'success' }>> = {}): PokemonListState {
  return {
    status: 'success',
    items: [buildPokemonSummary({ id: 1 })],
    nextOffset: 20,
    origin: DataOrigin.Remote,
    isLoadingMore: false,
    isRefreshing: false,
    transientError: null,
    ...overrides,
  };
}

describe('pokemonListReducer', () => {
  describe('first page', () => {
    it('moves to success with the received items', () => {
      const page = buildPage([buildPokemonSummary({ id: 1 })], 20);

      const state = pokemonListReducer({ status: 'loading' }, {
        type: 'FIRST_PAGE_SUCCESS',
        page,
        origin: DataOrigin.Remote,
      });

      expect(state).toEqual(successState());
    });

    it('moves to empty when the page has no items', () => {
      const state = pokemonListReducer({ status: 'loading' }, {
        type: 'FIRST_PAGE_SUCCESS',
        page: buildPage([]),
        origin: DataOrigin.Remote,
      });

      expect(state).toEqual({ status: 'empty' });
    });

    it('moves to error when there was no data', () => {
      const state = pokemonListReducer({ status: 'loading' }, { type: 'FIRST_PAGE_ERROR', error: ERROR });

      expect(state).toEqual({ status: 'error', error: ERROR });
    });

    it('keeps the list and stores a transient error when a refresh fails', () => {
      const refreshing = successState({ isRefreshing: true });

      const state = pokemonListReducer(refreshing, { type: 'FIRST_PAGE_ERROR', error: ERROR });

      expect(state).toEqual(successState({ transientError: ERROR }));
    });
  });

  describe('load more', () => {
    it('appends new items and updates the next offset', () => {
      const page = buildPage([buildPokemonSummary({ id: 2 })], 40);

      const state = pokemonListReducer(successState({ isLoadingMore: true }), {
        type: 'LOAD_MORE_SUCCESS',
        page,
        origin: DataOrigin.Remote,
      });

      expect(state).toMatchObject({ nextOffset: 40, isLoadingMore: false });
      expect(state.status === 'success' && state.items.map(item => item.id)).toEqual([1, 2]);
    });

    it('ignores duplicated items', () => {
      const page = buildPage([buildPokemonSummary({ id: 1 }), buildPokemonSummary({ id: 2 })], 40);

      const state = pokemonListReducer(successState(), {
        type: 'LOAD_MORE_SUCCESS',
        page,
        origin: DataOrigin.Remote,
      });

      expect(state.status === 'success' && state.items.map(item => item.id)).toEqual([1, 2]);
    });

    it('marks the list as cached when a page comes from the cache', () => {
      const state = pokemonListReducer(successState(), {
        type: 'LOAD_MORE_SUCCESS',
        page: buildPage([buildPokemonSummary({ id: 2 })], 40),
        origin: DataOrigin.Cache,
      });

      expect(state).toMatchObject({ origin: DataOrigin.Cache });
    });

    it('keeps the list and stores a transient error when loading more fails', () => {
      const state = pokemonListReducer(successState({ isLoadingMore: true }), {
        type: 'LOAD_MORE_ERROR',
        error: ERROR,
      });

      expect(state).toEqual(successState({ transientError: ERROR }));
    });

    it('ignores load more when the list is not loaded', () => {
      const loading: PokemonListState = { status: 'loading' };

      expect(pokemonListReducer(loading, { type: 'LOAD_MORE' })).toBe(loading);
    });
  });
});