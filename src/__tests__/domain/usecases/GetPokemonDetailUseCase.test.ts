import { ErrorCode } from '../../../domain/enums/ErrorCode';
import { AppError } from '../../../domain/errors/AppError';
import { PokemonRepository } from '../../../domain/interfaces/PokemonRepository';
import { GetPokemonDetailUseCase } from '../../../domain/usecases/GetPokemonDetailUseCase';
import { buildPokemonDetail, remoteResult } from '../../fixtures/pokemonModelFixtures';
import { createMockPokemonRepository } from '../../mocks/createMockPokemonRepository';

describe('GetPokemonDetailUseCase', () => {
  let repository: jest.Mocked<PokemonRepository>;
  let useCase: GetPokemonDetailUseCase;

  beforeEach(() => {
    repository = createMockPokemonRepository();
    useCase = new GetPokemonDetailUseCase(repository);
  });

  it('requests the detail for the given id', async () => {
    repository.getPokemonDetail.mockResolvedValue(remoteResult(buildPokemonDetail()));

    await useCase.execute(25);

    expect(repository.getPokemonDetail).toHaveBeenCalledWith(25);
  });

  it('returns the result from the repository', async () => {
    const expected = remoteResult(buildPokemonDetail());
    repository.getPokemonDetail.mockResolvedValue(expected);

    const result = await useCase.execute(25);

    expect(result).toBe(expected);
  });

  it.each([0, -1, 1.5, NaN])('rejects the invalid id %p without calling the repository', async id => {
    await expect(useCase.execute(id)).rejects.toMatchObject({
      code: ErrorCode.InvalidArgument,
    });

    expect(repository.getPokemonDetail).not.toHaveBeenCalled();
  });

  it('propagates errors from the repository', async () => {
    const error = new AppError(ErrorCode.NotFound, 'Not found');
    repository.getPokemonDetail.mockRejectedValue(error);

    await expect(useCase.execute(25)).rejects.toBe(error);
  });
});