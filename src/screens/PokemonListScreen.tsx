import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { CacheBanner } from '../components/CacheBanner';
import { EmptyView } from '../components/EmptyView';
import { ErrorView } from '../components/ErrorView';
import { ListFooter } from '../components/ListFooter';
import { LoadingView } from '../components/LoadingView';
import { PokemonCard } from '../components/PokemonCard';
import { DataOrigin } from '../domain/enums/DataOrigin';
import { PokemonSummary } from '../domain/models/PokemonSummary';
import { usePokemonList } from '../hooks/usePokemonList';
import { PokemonListScreenProps } from '../navigation/types';
import { getErrorMessage } from '../utils/errorMessages';
import { formatPokemonName } from '../utils/formatters';

const keyExtractor = (item: PokemonSummary): string => String(item.id);

export function PokemonListScreen({ navigation }: PokemonListScreenProps) {
  const { state, retry, refresh, loadMore } = usePokemonList();

  const handlePokemonPress = useCallback(
    (pokemon: PokemonSummary) => {
      navigation.navigate('PokemonDetail', {
        id: pokemon.id,
        name: formatPokemonName(pokemon.name),
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<PokemonSummary>) => (
      <PokemonCard pokemon={item} onPress={handlePokemonPress} />
    ),
    [handlePokemonPress],
  );

  if (state.status === 'loading') {
    return <LoadingView />;
  }

  if (state.status === 'error') {
    return <ErrorView message={getErrorMessage(state.error)} onRetry={retry} />;
  }

  if (state.status === 'empty') {
    return <EmptyView message="No se encontraron Pokémon." />;
  }

  return (
    <FlatList
      data={state.items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      numColumns={2}
      contentContainerStyle={styles.content}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      refreshing={state.isRefreshing}
      onRefresh={refresh}
      ListHeaderComponent={state.origin === DataOrigin.Cache ? <CacheBanner /> : undefined}
      ListFooterComponent={
        <ListFooter
          isLoadingMore={state.isLoadingMore}
          errorMessage={state.transientError ? getErrorMessage(state.transientError) : null}
          onRetry={loadMore}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: 10 },
});