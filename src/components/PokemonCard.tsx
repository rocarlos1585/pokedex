import { memo, useCallback } from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { PokemonSummary } from '../domain/models/PokemonSummary';
import { formatPokemonName, formatPokemonNumber } from '../utils/formatters';

interface PokemonCardProps {
  readonly pokemon: PokemonSummary;
  readonly onPress: (pokemon: PokemonSummary) => void;
}

function PokemonCardComponent({ pokemon, onPress }: PokemonCardProps) {
  const name = formatPokemonName(pokemon.name);
  const handlePress = useCallback(() => onPress(pokemon), [onPress, pokemon]);

  return (
    <Pressable
      style={styles.card}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={`${name}, número ${pokemon.id}`}
      accessibilityHint="Abre el detalle del Pokémon"
    >
      <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
}

export const PokemonCard = memo(PokemonCardComponent);

const styles = StyleSheet.create({
  card: { flex: 1, margin: 6, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: '#DDDDDD', backgroundColor: '#FFFFFF', alignItems: 'center' },
  number: { alignSelf: 'flex-end', fontSize: 12, color: '#666666' },
  image: { width: 96, height: 96 },
  name: { marginTop: 8, fontSize: 16, fontWeight: '600' },
});