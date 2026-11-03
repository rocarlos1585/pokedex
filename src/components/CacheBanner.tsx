import { StyleSheet, Text, View } from 'react-native';
import { border, colors, radius, spacing } from '../theme';

export function CacheBanner() {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.text}>Sin conexión · mostrando datos guardados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: radius.md,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
    backgroundColor: colors.cacheWarning,
  },
  text: { fontSize: 13, fontWeight: '700', textAlign: 'center', color: colors.ink },
});