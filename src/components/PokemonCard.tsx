import { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { PokemonSummary } from '../domain/models/PokemonSummary';
import { border, colors, radius, spacing } from '../theme';
import { formatPokemonName, formatPokemonNumber } from '../utils/formatters';
import { ComicSurface } from './ComicSurface';

interface PokemonCardProps {
  readonly pokemon: PokemonSummary;
  readonly onPress: (pokemon: PokemonSummary) => void;
}

function PokemonCardComponent({ pokemon, onPress }: PokemonCardProps) {
  const name = formatPokemonName(pokemon.name);
  const handlePress = useCallback(() => onPress(pokemon), [onPress, pokemon]);

  return (
    <Pressable
      style={styles.pressable}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, número ${pokemon.id}`}
      accessibilityHint="Abre el detalle del Pokémon"
    >
      {({ pressed }) => (
        <ComicSurface pressed={pressed} contentStyle={styles.content}>
          <View style={styles.numberTag}>
            <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
          </View>
          <View style={styles.backdrop}>
            <View style={styles.backdropCircle} />
            <View style={styles.backdropGround} />
            <Image
              source={{ uri: pokemon.imageUrl }}
              style={styles.image}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </ComicSurface>
      )}
    </Pressable>
  );
}

export const PokemonCard = memo(PokemonCardComponent);

const styles = StyleSheet.create({
  pressable: { flex: 1, margin: spacing.sm },
  content: { padding: spacing.sm, gap: spacing.sm },
  numberTag: {
    alignSelf: 'flex-end',
    paddingHorizontal: 7,
    paddingVertical: 1,
    borderRadius: radius.sm,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
  },
  number: { fontSize: 12, fontWeight: '700', color: colors.ink },
  backdrop: {
    height: 110,
    borderRadius: radius.md,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
    backgroundColor: colors.cardBackdrop,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdropCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.cardBackdropShape,
  },
  backdropGround: {
    position: 'absolute',
    bottom: -150,
    width: 300,
    height: 180,
    borderRadius: 150,
    backgroundColor: '#F5D58A',
  },
  image: { width: 96, height: 96 },
  name: { fontSize: 15, fontWeight: '700', textAlign: 'center', color: colors.ink },
});