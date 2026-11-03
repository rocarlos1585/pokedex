import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { ComicSurface } from './ComicSurface';

interface ErrorViewProps {
  readonly message: string;
  readonly onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Pressable onPress={onRetry} accessibilityRole="button" accessibilityLabel="Reintentar" style={styles.retryPressable}>
        {({ pressed }) => (
          <ComicSurface
            backgroundColor={colors.accent}
            borderRadius={radius.md}
            pressed={pressed}
            contentStyle={styles.button}
          >
            <Text style={styles.buttonText}>Reintentar</Text>
          </ComicSurface>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.xl,
    backgroundColor: colors.background,
  },
  retryPressable: { alignSelf: 'center' },
  message: { fontSize: 16, textAlign: 'center', color: colors.ink },
  button: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, minHeight: 44, justifyContent: 'center' },
  buttonText: { fontSize: 16, fontWeight: '700', color: colors.ink },
});