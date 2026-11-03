import { ErrorCode } from '../../../domain/enums/ErrorCode';
import { AppError } from '../../../domain/errors/AppError';
import { PokemonRepository } from '../../../domain/interfaces/PokemonRepository';
import {
  DEFAULT_PAGE_SIZE,
  GetPokemonListUseCase,
} from '../../../domain/usecases/GetPokemonListUseCase';
import { buildPage, buildPokemonSummary, remoteResult } from '../../fixtures/pokemonModelFixtures';
import { createMockPokemonRepository } from '../../mocks/createMockPokemonRepository';

describe('GetPokemonListUseCase', () => {
  let repository: jest.Mocked<PokemonRepository>;
  let useCase: GetPokemonListUseCase;

  beforeEach(() => {
    repository = createMockPokemonRepository();
    useCase = new GetPokemonListUseCase(repository);
  });

  it('requests the first page of 20 when no params are given', async () => {
    repository.getPokemonList.mockResolvedValue(remoteResult(buildPage([])));

    await useCase.execute();

    expect(repository.getPokemonList).toHaveBeenCalledTimes(1);
    expect(repository.getPokemonList).toHaveBeenCalledWith({ limit: DEFAULT_PAGE_SIZE, offset: 0 });
  });

  it('forwards the given pagination params to the repository', async () => {
    repository.getPokemonList.mockResolvedValue(remoteResult(buildPage([])));

    await useCase.execute({ limit: 20, offset: 40 });

    expect(repository.getPokemonList).toHaveBeenCalledWith({ limit: 20, offset: 40 });
  });

  it('returns the result from the repository', async () => {
    const expected = remoteResult(buildPage([buildPokemonSummary()], 20));
    repository.getPokemonList.mockResolvedValue(expected);

    const result = await useCase.execute();

    expect(result).toBe(expected);
  });

  it.each([
    { limit: 0, offset: 0 },
    { limit: -5, offset: 0 },
    { limit: 20, offset: -1 },
  ])('rejects invalid params $limit / $offset without calling the repository', async params => {
    await expect(useCase.execute(params)).rejects.toMatchObject({
      code: ErrorCode.InvalidArgument,
    });

    expect(repository.getPokemonList).not.toHaveBeenCalled();
  });

  it('propagates errors from the repository', async () => {
    const error = new AppError(ErrorCode.Network, 'No connection');
    repository.getPokemonList.mockRejectedValue(error);

    await expect(useCase.execute()).rejects.toBe(error);
  });
});