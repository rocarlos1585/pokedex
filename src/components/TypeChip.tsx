import { StyleSheet, Text, View } from 'react-native';
import { PokemonType } from '../domain/enums/PokemonType';
import { border, colors, pokemonTypeStyles, radius, spacing } from '../theme';

interface TypeChipProps {
  readonly type: PokemonType;
}

export function TypeChip({ type }: TypeChipProps) {
  const { label, color, textColor } = pokemonTypeStyles[type];

  return (
    <View style={[styles.chip, { backgroundColor: color }]} accessibilityLabel={`Tipo ${label}`}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: border.width,
    borderColor: colors.ink,
  },
  label: { fontSize: 14, fontWeight: '700' },
});