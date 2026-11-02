import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createDependencies } from './src/core/di/container';
import { DependenciesProvider } from './src/core/di/DependenciesContext';

const dependencies = createDependencies();

export default function App() {
  return (
    <DependenciesProvider dependencies={dependencies}>
      <View style={styles.container}>
        <Text>Pokédex</Text>
        <StatusBar style="auto" />
      </View>
    </DependenciesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});