import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { border, colors, MAX_BASE_STAT } from '../theme';

interface StatBarProps {
  readonly label: string;
  readonly value: number;
}

function StatBarComponent({ label, value }: StatBarProps) {
  const percentage = Math.min(value / MAX_BASE_STAT, 1) * 100;

  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

export const StatBar = memo(StatBarComponent);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 3 },
  label: { width: 72, fontSize: 12, color: colors.textMuted },
  value: { width: 28, fontSize: 13, fontWeight: '700', textAlign: 'right', color: colors.ink },
  track: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    borderWidth: border.thinWidth,
    borderColor: colors.ink,
    backgroundColor: colors.statTrack,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.statFill,
    borderRightWidth: border.thinWidth,
    borderColor: colors.ink,
  },
});