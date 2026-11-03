import { StyleSheet, Text, View } from 'react-native';

export function CacheBanner() {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.text}>Sin conexión · mostrando datos guardados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, marginBottom: 12, borderRadius: 8, backgroundColor: '#FFF3CD' },
  text: { fontSize: 13, textAlign: 'center' },
});