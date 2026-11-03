import { PokemonLocalDataSource } from '../../../data/datasources/local/PokemonLocalDataSource';
import { PokemonRemoteDataSource } from '../../../data/datasources/remote/PokemonRemoteDataSource';
import { toPokemonDetail } from '../../../data/mappers/PokemonDetailMapper';
import { toPaginatedPokemonList } from '../../../data/mappers/PokemonListMapper';
import { PokemonRepositoryImpl } from '../../../data/repositories/PokemonRepositoryImpl';
import { DataOrigin } from '../../../domain/enums/DataOrigin';
import { ErrorCode } from '../../../domain/enums/ErrorCode';
import { AppError } from '../../../domain/errors/AppError';
import { buildPokemonDetailDto, buildPokemonListDto } from '../../fixtures/pokemonDtoFixtures';
import { buildPage, buildPokemonDetail, buildPokemonSummary } from '../../fixtures/pokemonModelFixtures';

const PARAMS = { limit: 20, offset: 0 };
const SAVED_AT = 1_700_000_000_000;
const NETWORK_ERROR = new AppError(ErrorCode.Network, 'No connection');

function createMockRemote(): jest.Mocked<PokemonRemoteDataSource> {
  return {
    fetchPokemonList: jest.fn(),
    fetchPokemonDetail: jest.fn(),
  };
}

function createMockLocal(): jest.Mocked<PokemonLocalDataSource> {
  return {
    getPokemonList: jest.fn().mockResolvedValue(null),
    savePokemonList: jest.fn().mockResolvedValue(undefined),
    getPokemonDetail: jest.fn().mockResolvedValue(null),
    savePokemonDetail: jest.fn().mockResolvedValue(undefined),
  };
}

describe('PokemonRepositoryImpl', () => {
  let remote: jest.Mocked<PokemonRemoteDataSource>;
  let local: jest.Mocked<PokemonLocalDataSource>;
  let repository: PokemonRepositoryImpl;

  beforeEach(() => {
    remote = createMockRemote();
    local = createMockLocal();
    repository = new PokemonRepositoryImpl(remote, local);
  });

  describe('getPokemonList', () => {
    describe('when the network responds', () => {
      it('returns the mapped list marked as remote', async () => {
        const dto = buildPokemonListDto();
        remote.fetchPokemonList.mockResolvedValue(dto);

        const result = await repository.getPokemonList(PARAMS);

        expect(result).toEqual({
          data: toPaginatedPokemonList(dto, PARAMS),
          origin: DataOrigin.Remote,
        });
      });

      it('saves the mapped list in the cache', async () => {
        const dto = buildPokemonListDto();
        remote.fetchPokemonList.mockResolvedValue(dto);

        await repository.getPokemonList(PARAMS);

        expect(local.savePokemonList).toHaveBeenCalledWith(
          PARAMS,
          toPaginatedPokemonList(dto, PARAMS),
        );
      });

      it('does not read the cache', async () => {
        remote.fetchPokemonList.mockResolvedValue(buildPokemonListDto());

        await repository.getPokemonList(PARAMS);

        expect(local.getPokemonList).not.toHaveBeenCalled();
      });

      it('still returns the data when saving to the cache fails', async () => {
        remote.fetchPokemonList.mockResolvedValue(buildPokemonListDto());
        local.savePokemonList.mockRejectedValue(new Error('Disk full'));

        const result = await repository.getPokemonList(PARAMS);

        expect(result.origin).toBe(DataOrigin.Remote);
      });
    });

    describe('when the network fails', () => {
      beforeEach(() => {
        remote.fetchPokemonList.mockRejectedValue(NETWORK_ERROR);
      });

      it('returns the cached list marked as cache', async () => {
        const cachedPage = buildPage([buildPokemonSummary()], 20);
        local.getPokemonList.mockResolvedValue({ data: cachedPage, savedAt: SAVED_AT });

        const result = await repository.getPokemonList(PARAMS);

        expect(result).toEqual({ data: cachedPage, origin: DataOrigin.Cache });
        expect(local.getPokemonList).toHaveBeenCalledWith(PARAMS);
      });

      it('rethrows the original error when there is no cache', async () => {
        await expect(repository.getPokemonList(PARAMS)).rejects.toBe(NETWORK_ERROR);
      });

      it('rethrows the original error when reading the cache fails', async () => {
        local.getPokemonList.mockRejectedValue(new Error('Storage unavailable'));

        await expect(repository.getPokemonList(PARAMS)).rejects.toBe(NETWORK_ERROR);
      });
    });

    it('wraps unexpected errors in an AppError when there is no cache', async () => {
      remote.fetchPokemonList.mockRejectedValue(new TypeError('Unexpected'));

      const promise = repository.getPokemonList(PARAMS);

      await expect(promise).rejects.toBeInstanceOf(AppError);
      await expect(promise).rejects.toMatchObject({ code: ErrorCode.Unknown });
    });
  });

  describe('getPokemonDetail', () => {
    it('returns the mapped detail and saves it when the network responds', async () => {
      const dto = buildPokemonDetailDto();
      remote.fetchPokemonDetail.mockResolvedValue(dto);

      const result = await repository.getPokemonDetail(25);

      expect(result).toEqual({ data: toPokemonDetail(dto), origin: DataOrigin.Remote });
      expect(remote.fetchPokemonDetail).toHaveBeenCalledWith(25);
      expect(local.savePokemonDetail).toHaveBeenCalledWith(toPokemonDetail(dto));
    });

    it('returns the cached detail when the network fails', async () => {
      const cachedDetail = buildPokemonDetail();
      remote.fetchPokemonDetail.mockRejectedValue(NETWORK_ERROR);
      local.getPokemonDetail.mockResolvedValue({ data: cachedDetail, savedAt: SAVED_AT });

      const result = await repository.getPokemonDetail(25);

      expect(result).toEqual({ data: cachedDetail, origin: DataOrigin.Cache });
      expect(local.getPokemonDetail).toHaveBeenCalledWith(25);
    });

    it('rethrows the original error when the network fails and there is no cache', async () => {
      remote.fetchPokemonDetail.mockRejectedValue(NETWORK_ERROR);

      await expect(repository.getPokemonDetail(25)).rejects.toBe(NETWORK_ERROR);
    });
  });
});