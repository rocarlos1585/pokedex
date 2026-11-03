import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CacheBanner } from '../components/CacheBanner';
import { ComicSurface } from '../components/ComicSurface';
import { DetailHeader } from '../components/DetailHeader';
import { ErrorView } from '../components/ErrorView';
import { LoadingView } from '../components/LoadingView';
import { StatBar } from '../components/StatBar';
import { TypeChip } from '../components/TypeChip';
import { TypeScene } from '../components/TypeScene';
import { DataOrigin } from '../domain/enums/DataOrigin';
import { PokemonDetail } from '../domain/models/PokemonDetail';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { PokemonDetailScreenProps } from '../navigation/types';
import {
  border,
  colors,
  getSceneForTypes,
  radius,
  shadow,
  spacing,
  statLabels,
  typography,
} from '../theme';
import { getErrorMessage } from '../utils/errorMessages';
import {
  formatHeight,
  formatOptionalNumber,
  formatPokemonName,
  formatWeight,
} from '../utils/formatters';

export function PokemonDetailScreen({ navigation, route }: PokemonDetailScreenProps) {
  const { id, name } = route.params;
  const { state, retry } = usePokemonDetail(id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <DetailHeader name={name} id={id} onBack={navigation.goBack} />

      {state.status === 'loading' && <LoadingView />}

      {state.status === 'error' && (
        <ErrorView message={getErrorMessage(state.error)} onRetry={retry} />
      )}

      {state.status === 'success' && (
        <DetailContent
          pokemon={state.pokemon}
          isFromCache={state.origin === DataOrigin.Cache}
          displayName={name}
        />
      )}
    </SafeAreaView>
  );
}

interface DetailContentProps {
  readonly pokemon: PokemonDetail;
  readonly isFromCache: boolean;
  readonly displayName: string;
}

function DetailContent({ pokemon, isFromCache, displayName }: DetailContentProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {isFromCache && <CacheBanner />}

      <ComicSurface borderRadius={radius.xl} offset={5}>
        <TypeScene scene={getSceneForTypes(pokemon.types)} style={styles.scene}>
          <Image
            source={{ uri: pokemon.imageUrl }}
            style={styles.image}
            resizeMode="contain"
            accessibilityLabel={`Imagen de ${displayName}`}
          />
        </TypeScene>
      </ComicSurface>

      <View style={styles.types}>
        {pokemon.types.map(type => (
          <TypeChip key={type} type={type} />
        ))}
      </View>

      <View style={styles.infoRow}>
        <InfoPill label="Peso" value={formatWeight(pokemon.weightInKilograms)} />
        <InfoPill label="Altura" value={formatHeight(pokemon.heightInMeters)} />
        <InfoPill label="Exp. base" value={formatOptionalNumber(pokemon.baseExperience)} />
      </View>

      <ComicSurface contentStyle={styles.panel}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Habilidades
        </Text>
        <View style={styles.abilities}>
          {pokemon.abilities.map(ability => (
            <View
              key={ability.name}
              style={[styles.abilityTag, ability.isHidden && styles.abilityTagHidden]}
            >
              <Text style={styles.abilityText}>
                {formatPokemonName(ability.name)}
                {ability.isHidden ? ' · oculta' : ''}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[styles.sectionTitle, styles.statsTitle]} accessibilityRole="header">
          Estadísticas base
        </Text>
        {pokemon.stats.map(stat => (
          <StatBar key={stat.name} label={statLabels[stat.name]} value={stat.baseValue} />
        ))}
      </ComicSurface>
    </ScrollView>
  );
}

interface InfoPillProps {
  readonly label: string;
  readonly value: string;
}

function InfoPill({ label, value }: InfoPillProps) {
  return (
    <View style={styles.infoItem} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.infoLabel}>{label}</Text>
      <ComicSurface
        backgroundColor={colors.accent}
        borderRadius={radius.md}
        offset={shadow.smallOffset}
        style={styles.infoSurface}
        contentStyle={styles.infoValueBox}
      >
        <Text style={styles.infoValue}>{value}</Text>
      </ComicSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.xl, paddingBottom: spacing.xxl, gap: spacing.lg },
  scene: { height: 260 },
  image: { width: 190, height: 190 },
  types: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  infoRow: { flexDirection: 'row', gap: spacing.md },
  infoItem: { flex: 1, alignItems: 'center', gap: 6 },
  infoLabel: { ...typography.label, color: colors.textMuted },
  infoSurface: { alignSelf: 'stretch' },
  infoValueBox: { paddingVertical: 6, alignItems: 'center' },
  infoValue: { fontSize: 15, fontWeight: '700', color: colors.ink },
  panel: { padding: spacing.lg, gap: spacing.sm },
  sectionTitle: { ...typography.subheading, color: colors.ink },
  statsTitle: { marginTop: spacing.sm },
  abilities: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  abilityTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.sm,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
  },
  abilityTagHidden: { borderStyle: 'dashed' },
  abilityText: { fontSize: 13, color: colors.ink },
});