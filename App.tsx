import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createDependencies } from './src/core/di/container';
import { DependenciesProvider } from './src/core/di/DependenciesContext';
import { RootNavigator } from './src/navigation/RootNavigator';

const dependencies = createDependencies();

export default function App() {
  return (
    <DependenciesProvider dependencies={dependencies}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </DependenciesProvider>
  );
}