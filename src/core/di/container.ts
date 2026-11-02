import { AsyncPokemonLocalDataSource } from '../../data/datasources/local/AsyncPokemonLocalDataSource';
import { PokeApiRemoteDataSource } from '../../data/datasources/remote/PokeApiRemoteDataSource';
import { PokemonRepositoryImpl } from '../../data/repositories/PokemonRepositoryImpl';
import { GetPokemonDetailUseCase } from '../../domain/usecases/GetPokemonDetailUseCase';
import { GetPokemonListUseCase } from '../../domain/usecases/GetPokemonListUseCase';
import { POKE_API_BASE_URL } from '../http/apiConfig';
import { FetchHttpClient } from '../http/FetchHttpClient';
import { AsyncStorageAdapter } from '../storage/AsyncStorageAdapter';

export interface Dependencies {
  readonly getPokemonListUseCase: GetPokemonListUseCase;
  readonly getPokemonDetailUseCase: GetPokemonDetailUseCase;
}

export function createDependencies(): Dependencies {
  const httpClient = new FetchHttpClient(POKE_API_BASE_URL);
  const storage = new AsyncStorageAdapter();

  const remoteDataSource = new PokeApiRemoteDataSource(httpClient);
  const localDataSource = new AsyncPokemonLocalDataSource(storage);

  const pokemonRepository = new PokemonRepositoryImpl(remoteDataSource, localDataSource);

  return {
    getPokemonListUseCase: new GetPokemonListUseCase(pokemonRepository),
    getPokemonDetailUseCase: new GetPokemonDetailUseCase(pokemonRepository),
  };
}