import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MAX_BASE_STAT } from '../theme';

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
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  label: { width: 120, fontSize: 13 },
  value: { width: 32, fontSize: 13, fontWeight: '600', textAlign: 'right' },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#EEEEEE', overflow: 'hidden' },
  fill: { height: 8, borderRadius: 4, backgroundColor: '#4A90E2' },
});