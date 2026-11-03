import { StyleSheet, Text, View } from 'react-native';

interface EmptyViewProps {
  readonly message: string;
}

export function EmptyView({ message }: EmptyViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { fontSize: 16, textAlign: 'center' },
});