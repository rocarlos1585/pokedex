import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useDependencies } from '../core/di/DependenciesContext';
import { toAppError } from '../domain/errors/toAppError';
import { DEFAULT_PAGE_SIZE } from '../domain/usecases/GetPokemonListUseCase';
import {
  INITIAL_POKEMON_LIST_STATE,
  PokemonListState,
  pokemonListReducer,
} from './pokemonListState';

export interface UsePokemonListResult {
  readonly state: PokemonListState;
  readonly retry: () => void;
  readonly refresh: () => void;
  readonly loadMore: () => void;
}

export function usePokemonList(): UsePokemonListResult {
  const { getPokemonListUseCase } = useDependencies();
  const [state, dispatch] = useReducer(pokemonListReducer, INITIAL_POKEMON_LIST_STATE);

  const stateRef = useRef(state);
  const requestGenerationRef = useRef(0);
  const isLoadingMoreRef = useRef(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const loadFirstPage = useCallback(
    async (isRefresh: boolean) => {
      const generation = ++requestGenerationRef.current;
      isLoadingMoreRef.current = false;
      dispatch({ type: isRefresh ? 'REFRESH' : 'LOAD_INITIAL' });

      try {
        const result = await getPokemonListUseCase.execute({ limit: DEFAULT_PAGE_SIZE, offset: 0 });
        if (generation !== requestGenerationRef.current) return;
        dispatch({ type: 'FIRST_PAGE_SUCCESS', page: result.data, origin: result.origin });
      } catch (error) {
        if (generation !== requestGenerationRef.current) return;
        dispatch({ type: 'FIRST_PAGE_ERROR', error: toAppError(error) });
      }
    },
    [getPokemonListUseCase],
  );

  useEffect(() => {
    void loadFirstPage(false);
  }, [loadFirstPage]);

  const retry = useCallback(() => {
    void loadFirstPage(false);
  }, [loadFirstPage]);

  const refresh = useCallback(() => {
    void loadFirstPage(stateRef.current.status === 'success');
  }, [loadFirstPage]);

  const loadMore = useCallback(() => {
    const current = stateRef.current;
    if (
      current.status !== 'success' ||
      current.nextOffset === null ||
      current.isRefreshing ||
      isLoadingMoreRef.current
    ) {
      return;
    }

    const generation = requestGenerationRef.current;
    const offset = current.nextOffset;
    isLoadingMoreRef.current = true;
    dispatch({ type: 'LOAD_MORE' });

    getPokemonListUseCase
      .execute({ limit: DEFAULT_PAGE_SIZE, offset })
      .then(result => {
        if (generation !== requestGenerationRef.current) return;
        dispatch({ type: 'LOAD_MORE_SUCCESS', page: result.data, origin: result.origin });
      })
      .catch((error: unknown) => {
        if (generation !== requestGenerationRef.current) return;
        dispatch({ type: 'LOAD_MORE_ERROR', error: toAppError(error) });
      })
      .finally(() => {
        if (generation === requestGenerationRef.current) {
          isLoadingMoreRef.current = false;
        }
      });
  }, [getPokemonListUseCase]);

  return { state, retry, refresh, loadMore };
}