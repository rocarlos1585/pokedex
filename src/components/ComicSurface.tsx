import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { border, colors, radius as radii, shadow } from '../theme';

interface ComicSurfaceProps {
  readonly children: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
  readonly contentStyle?: StyleProp<ViewStyle>;
  readonly backgroundColor?: string;
  readonly borderRadius?: number;
  readonly offset?: number;
  readonly pressed?: boolean;
}

export function ComicSurface({
  children,
  style,
  contentStyle,
  backgroundColor = colors.surface,
  borderRadius = radii.lg,
  offset = shadow.offset,
  pressed = false,
}: ComicSurfaceProps) {
  return (
    <View style={[{ paddingRight: offset, paddingBottom: offset }, style]}>
      <View
        style={[styles.shadow, { top: offset, left: offset, borderRadius }]}
        pointerEvents="none"
      />
      <View
        style={[
          styles.surface,
          { backgroundColor, borderRadius },
          pressed && { transform: [{ translateX: offset }, { translateY: offset }] },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.ink,
  },
  surface: {
    flexGrow: 1,
    borderWidth: border.width,
    borderColor: colors.ink,
    overflow: 'hidden',
  },
});