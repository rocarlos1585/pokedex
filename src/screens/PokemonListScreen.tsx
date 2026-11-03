import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { border, colors, radius, spacing, typography } from '../theme';
import { getErrorMessage } from '../utils/errorMessages';
import { formatPokemonName } from '../utils/formatters';

const keyExtractor = (item: PokemonSummary): string => String(item.id);

interface ListHeaderProps {
  readonly loadedCount: number;
  readonly isFromCache: boolean;
}

function ListHeader({ loadedCount, isFromCache }: ListHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text style={styles.title} accessibilityRole="header">
          Pokédex
        </Text>
        <View style={styles.countTag}>
          <Text style={styles.countText}>{`${loadedCount} cargados`}</Text>
        </View>
      </View>
      {isFromCache && <CacheBanner />}
    </View>
  );
}

export function PokemonListScreen({ navigation }: PokemonListScreenProps) {
  const { state, retry, refresh, loadMore, retryLoadMore } = usePokemonList();

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

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {state.status === 'loading' && <LoadingView />}

      {state.status === 'error' && (
        <ErrorView message={getErrorMessage(state.error)} onRetry={retry} />
      )}

      {state.status === 'empty' && <EmptyView message="No se encontraron Pokémon." />}

      {state.status === 'success' && (
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
          ListHeaderComponent={
            <ListHeader
              loadedCount={state.items.length}
              isFromCache={state.origin === DataOrigin.Cache}
            />
          }
          ListFooterComponent={
            <ListFooter
              isLoadingMore={state.isLoadingMore}
              errorMessage={state.transientError ? getErrorMessage(state.transientError) : null}
              onRetry={retryLoadMore}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl },
  header: { paddingHorizontal: spacing.sm, paddingTop: spacing.lg, paddingBottom: spacing.sm, gap: spacing.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { ...typography.title, color: colors.ink, letterSpacing: -0.8 },
  countTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
    backgroundColor: colors.accent,
  },
  countText: { ...typography.label, color: colors.ink },
});