import { DataOrigin } from '../../../src/domain/enums/DataOrigin';
import { ErrorCode } from '../../../src/domain/enums/ErrorCode';
import { AppError } from '../../../src/domain/errors/AppError';
import { pokemonDetailReducer } from '../../../src/hooks/pokemonDetailState';
import { buildPokemonDetail } from '../fixtures/pokemonModelFixtures';

describe('pokemonDetailReducer', () => {
  it('moves to success with the pokemon and its origin', () => {
    const pokemon = buildPokemonDetail();

    const state = pokemonDetailReducer({ status: 'loading' }, {
      type: 'SUCCESS',
      pokemon,
      origin: DataOrigin.Cache,
    });

    expect(state).toEqual({ status: 'success', pokemon, origin: DataOrigin.Cache });
  });

  it('moves to error', () => {
    const error = new AppError(ErrorCode.NotFound, 'Not found');

    expect(pokemonDetailReducer({ status: 'loading' }, { type: 'ERROR', error })).toEqual({
      status: 'error',
      error,
    });
  });

  it('goes back to loading when retrying after an error', () => {
    const error = new AppError(ErrorCode.Network, 'No connection');

    expect(pokemonDetailReducer({ status: 'error', error }, { type: 'LOAD' })).toEqual({
      status: 'loading',
    });
  });
});