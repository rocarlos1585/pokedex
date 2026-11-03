import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

interface ListFooterProps {
  readonly isLoadingMore: boolean;
  readonly errorMessage: string | null;
  readonly onRetry: () => void;
}

export function ListFooter({ isLoadingMore, errorMessage, onRetry }: ListFooterProps) {
  if (isLoadingMore) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  if (errorMessage) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{errorMessage}</Text>
        <Pressable style={styles.button} onPress={onRetry} accessibilityRole="button">
          <Text>Reintentar</Text>
        </Pressable>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  container: { paddingVertical: 16, alignItems: 'center', gap: 8 },
  message: { fontSize: 13, textAlign: 'center' },
  button: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, minHeight: 44 },
});