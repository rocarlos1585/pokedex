import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SceneKind } from '../theme';

const INK = '#1A1A1A';
const OUTLINE = 2.5;

function Shape({ style }: { readonly style: StyleProp<ViewStyle> }) {
  return <View style={[styles.shape, style]} />;
}

function circle(size: number): ViewStyle {
  return { width: size, height: size, borderRadius: size / 2 };
}

function ForestScene() {
  return (
    <>
      <Shape style={[circle(46), { top: 20, right: 26, backgroundColor: '#FFE27A' }]} />
      <Shape style={[circle(320), { left: -80, bottom: -230, backgroundColor: '#8BD17C', borderWidth: OUTLINE, borderColor: INK }]} />
      <Shape style={[circle(360), { right: -120, bottom: -270, backgroundColor: '#5FB052', borderWidth: OUTLINE, borderColor: INK }]} />
    </>
  );
}

function VolcanoScene() {
  return (
    <>
      <Shape style={[circle(56), { top: 18, left: 24, backgroundColor: '#FF7A45' }]} />
      <Shape style={{ width: 220, height: 220, left: '50%', marginLeft: -110, bottom: -150, backgroundColor: '#8A3B2B', borderWidth: OUTLINE, borderColor: INK, transform: [{ rotate: '45deg' }] }} />
      <Shape style={[circle(700), { left: '50%', marginLeft: -350, bottom: -650, backgroundColor: '#5E2A20', borderWidth: OUTLINE, borderColor: INK }]} />
    </>
  );
}

function SeaScene() {
  return (
    <>
      <Shape style={{ top: 24, left: 28, width: 70, height: 22, borderRadius: 11, backgroundColor: '#FFFFFF' }} />
      <Shape style={{ top: 44, right: 40, width: 48, height: 16, borderRadius: 8, backgroundColor: '#FFFFFF' }} />
      <Shape style={{ left: 0, right: 0, bottom: 0, height: '38%', backgroundColor: '#3E9BD8', borderTopWidth: OUTLINE, borderColor: INK }} />
      <Shape style={{ left: 30, bottom: 30, width: 60, height: 6, borderRadius: 3, backgroundColor: '#9FD6F5' }} />
      <Shape style={{ right: 40, bottom: 50, width: 44, height: 6, borderRadius: 3, backgroundColor: '#9FD6F5' }} />
    </>
  );
}

function StormScene() {
  return (
    <>
      <Shape style={[circle(42), { top: 20, right: 28, backgroundColor: '#FFF4B8' }]} />
      <Shape style={{ top: 30, left: 24, width: 72, height: 26, borderRadius: 13, backgroundColor: '#5B5EB8' }} />
      <Shape style={[circle(34), { top: 18, left: 44, backgroundColor: '#5B5EB8' }]} />
      <Shape style={{ top: 54, left: 58, width: 10, height: 34, backgroundColor: '#FFD43B', transform: [{ rotate: '20deg' }] }} />
      <Shape style={{ top: 80, left: 52, width: 10, height: 30, backgroundColor: '#FFD43B', transform: [{ rotate: '-30deg' }] }} />
      <Shape style={{ top: 96, right: 42, width: 8, height: 26, backgroundColor: '#FFD43B', transform: [{ rotate: '20deg' }] }} />
      <Shape style={{ top: 116, right: 38, width: 8, height: 22, backgroundColor: '#FFD43B', transform: [{ rotate: '-30deg' }] }} />
      <Shape style={[circle(700), { left: '50%', marginLeft: -350, bottom: -640, backgroundColor: '#23256A', borderWidth: OUTLINE, borderColor: INK }]} />
    </>
  );
}

function MysticScene() {
  return (
    <>
      <Shape style={[circle(260), { left: '50%', top: '50%', marginLeft: -130, marginTop: -130, borderWidth: 2, borderColor: '#D98BBF' }]} />
      <Shape style={[circle(180), { left: '50%', top: '50%', marginLeft: -90, marginTop: -90, borderWidth: 2, borderColor: '#D98BBF' }]} />
      <Shape style={[circle(10), { top: 22, left: 28, backgroundColor: '#FFFFFF' }]} />
      <Shape style={[circle(12), { bottom: 28, right: 32, backgroundColor: '#FFFFFF' }]} />
      <Shape style={[circle(8), { top: 40, right: 60, backgroundColor: '#FFFFFF' }]} />
    </>
  );
}

function MeadowScene() {
  return (
    <>
      <Shape style={{ top: 22, left: 24, width: 76, height: 24, borderRadius: 12, backgroundColor: '#FFFFFF' }} />
      <Shape style={{ top: 44, right: 34, width: 56, height: 18, borderRadius: 9, backgroundColor: '#FFFFFF' }} />
      <Shape style={[circle(700), { left: '50%', marginLeft: -350, bottom: -630, backgroundColor: '#E3C77A', borderWidth: OUTLINE, borderColor: INK }]} />
    </>
  );
}

const SCENE_BACKGROUNDS: Record<SceneKind, string> = {
  [SceneKind.Forest]: '#CDEFFF',
  [SceneKind.Volcano]: '#FFD2B0',
  [SceneKind.Sea]: '#CFF2FF',
  [SceneKind.Storm]: '#2F3180',
  [SceneKind.Mystic]: '#F7C8E6',
  [SceneKind.Meadow]: '#FFF0C2',
};

const SCENE_SHAPES: Record<SceneKind, () => ReactNode> = {
  [SceneKind.Forest]: ForestScene,
  [SceneKind.Volcano]: VolcanoScene,
  [SceneKind.Sea]: SeaScene,
  [SceneKind.Storm]: StormScene,
  [SceneKind.Mystic]: MysticScene,
  [SceneKind.Meadow]: MeadowScene,
};

interface TypeSceneProps {
  readonly scene: SceneKind;
  readonly children?: ReactNode;
  readonly style?: StyleProp<ViewStyle>;
}

export function TypeScene({ scene, children, style }: TypeSceneProps) {
  const renderShapes = SCENE_SHAPES[scene];

  return (
    <View style={[styles.container, { backgroundColor: SCENE_BACKGROUNDS[scene] }, style]}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        {renderShapes()}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  shape: { position: 'absolute' },
});