import { Pressable, StyleSheet, Text, View } from 'react-native';

interface ErrorViewProps {
  readonly message: string;
  readonly onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Pressable style={styles.button} onPress={onRetry} accessibilityRole="button">
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  message: { fontSize: 16, textAlign: 'center' },
  button: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, borderWidth: 1, minHeight: 44 },
  buttonText: { fontSize: 16, fontWeight: '600' },
});