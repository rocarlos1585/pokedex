import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useDependencies } from '../core/di/DependenciesContext';
import { toAppError } from '../domain/errors/toAppError';
import {
  INITIAL_POKEMON_DETAIL_STATE,
  PokemonDetailState,
  pokemonDetailReducer,
} from './pokemonDetailState';

export interface UsePokemonDetailResult {
  readonly state: PokemonDetailState;
  readonly retry: () => void;
}

export function usePokemonDetail(id: number): UsePokemonDetailResult {
  const { getPokemonDetailUseCase } = useDependencies();
  const [state, dispatch] = useReducer(pokemonDetailReducer, INITIAL_POKEMON_DETAIL_STATE);
  const requestGenerationRef = useRef(0);

  const loadDetail = useCallback(async () => {
    const generation = ++requestGenerationRef.current;
    dispatch({ type: 'LOAD' });

    try {
      const result = await getPokemonDetailUseCase.execute(id);
      if (generation !== requestGenerationRef.current) return;
      dispatch({ type: 'SUCCESS', pokemon: result.data, origin: result.origin });
    } catch (error) {
      if (generation !== requestGenerationRef.current) return;
      dispatch({ type: 'ERROR', error: toAppError(error) });
    }
  }, [getPokemonDetailUseCase, id]);

  useEffect(() => {
    void loadDetail();
    return () => {
      requestGenerationRef.current += 1;
    };
  }, [loadDetail]);

  const retry = useCallback(() => {
    void loadDetail();
  }, [loadDetail]);

  return { state, retry };
}