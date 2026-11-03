import { Pressable, StyleSheet, Text, View } from 'react-native';
import { border, colors, radius, shadow, spacing, typography } from '../theme';
import { formatPokemonNumber } from '../utils/formatters';
import { ComicSurface } from './ComicSurface';

interface DetailHeaderProps {
  readonly name: string;
  readonly id: number;
  readonly onBack: () => void;
}

export function DetailHeader({ name, id, onBack }: DetailHeaderProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onBack}
        accessibilityRole="button"
        accessibilityLabel="Volver al listado"
        hitSlop={8}
      >
        {({ pressed }) => (
          <ComicSurface
            pressed={pressed}
            offset={shadow.smallOffset}
            borderRadius={radius.md}
            contentStyle={styles.backButton}
          >
            <View style={styles.chevron} />          
        </ComicSurface>
        )}
      </Pressable>

      <Text style={styles.name} numberOfLines={1} accessibilityRole="header">
        {name}
      </Text>

      <View style={styles.numberTag}>
        <Text style={styles.number}>{formatPokemonNumber(id)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  chevron: {
    width: 12,
    height: 12,
    marginLeft: 4,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: colors.ink,
    transform: [{ rotate: '45deg' }],
  },  name: { ...typography.heading, flex: 1, textAlign: 'center', color: colors.ink },
  numberTag: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: border.width,
    borderColor: colors.ink,
    backgroundColor: colors.surface,
  },
  number: { fontSize: 14, fontWeight: '700', color: colors.ink },
});