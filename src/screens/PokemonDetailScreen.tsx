import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CacheBanner } from '../components/CacheBanner';
import { ErrorView } from '../components/ErrorView';
import { LoadingView } from '../components/LoadingView';
import { StatBar } from '../components/StatBar';
import { DataOrigin } from '../domain/enums/DataOrigin';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { PokemonDetailScreenProps } from '../navigation/types';
import { getErrorMessage } from '../utils/errorMessages';
import {
  formatHeight,
  formatOptionalNumber,
  formatPokemonName,
  formatPokemonNumber,
  formatWeight,
} from '../utils/formatters';

export function PokemonDetailScreen({ route }: PokemonDetailScreenProps) {
  const { id } = route.params;
  const { state, retry } = usePokemonDetail(id);

  if (state.status === 'loading') {
    return <LoadingView />;
  }

  if (state.status === 'error') {
    return <ErrorView message={getErrorMessage(state.error)} onRetry={retry} />;
  }

  const { pokemon, origin } = state;
  const name = formatPokemonName(pokemon.name);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {origin === DataOrigin.Cache && <CacheBanner />}

      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        resizeMode="contain"
        accessibilityLabel={`Imagen de ${name}`}
      />

      <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
      <Text style={styles.name} accessibilityRole="header">
        {name}
      </Text>

      <View style={styles.types}>
        {pokemon.types.map(type => (
          <Text key={type} style={styles.typeChip}>
            {formatPokemonName(type)}
          </Text>
        ))}
      </View>

      <View style={styles.infoRow}>
        <InfoItem label="Altura" value={formatHeight(pokemon.heightInMeters)} />
        <InfoItem label="Peso" value={formatWeight(pokemon.weightInKilograms)} />
        <InfoItem label="Exp. base" value={formatOptionalNumber(pokemon.baseExperience)} />
      </View>

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Habilidades
      </Text>
      {pokemon.abilities.map(ability => (
        <Text key={ability.name} style={styles.ability}>
          {formatPokemonName(ability.name)}
          {ability.isHidden ? ' (oculta)' : ''}
        </Text>
      ))}

      <Text style={styles.sectionTitle} accessibilityRole="header">
        Estadísticas base
      </Text>
      {pokemon.stats.map(stat => (
        <StatBar key={stat.name} label={formatPokemonName(stat.name)} value={stat.baseValue} />
      ))}
    </ScrollView>
  );
}

interface InfoItemProps {
  readonly label: string;
  readonly value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.infoItem} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.infoValue}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: 8 },
  image: { width: 200, height: 200, alignSelf: 'center' },
  number: { textAlign: 'center', fontSize: 14, color: '#666666' },
  name: { textAlign: 'center', fontSize: 28, fontWeight: '700' },
  types: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginVertical: 8 },
  typeChip: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999, borderWidth: 1, fontSize: 13 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 12 },
  infoItem: { alignItems: 'center' },
  infoValue: { fontSize: 18, fontWeight: '600' },
  infoLabel: { fontSize: 12, color: '#666666' },
  sectionTitle: { marginTop: 16, fontSize: 18, fontWeight: '700' },
  ability: { fontSize: 15 },
});