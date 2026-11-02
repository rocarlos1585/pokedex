import { Button, StyleSheet, View } from 'react-native';
import { PokemonListScreenProps } from '../navigation/types';

export function PokemonListScreen({ navigation }: PokemonListScreenProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a Pikachu"
        onPress={() => navigation.navigate('PokemonDetail', { id: 25, name: 'pikachu' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});