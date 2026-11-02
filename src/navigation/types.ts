import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  PokemonList: undefined;
  PokemonDetail: { id: number; name: string };
};

export type PokemonListScreenProps = NativeStackScreenProps<RootStackParamList, 'PokemonList'>;
export type PokemonDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;