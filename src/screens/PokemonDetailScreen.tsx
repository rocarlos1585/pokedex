import { StyleSheet, Text, View } from 'react-native';
import { PokemonDetailScreenProps } from '../navigation/types';

export function PokemonDetailScreen({ route }: PokemonDetailScreenProps) {
  const { id, name } = route.params;

  return (
    <View style={styles.container}>
      <Text>{`#${id} ${name}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});