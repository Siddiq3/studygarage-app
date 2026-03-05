import React, { useEffect, useMemo, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

export type LayoutRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  startLayout: LayoutRect | null;
  endLayout: LayoutRect | null;
  count?: number;
  minSize?: number;
  maxSize?: number;
  zIndex?: number;
  delayStepMs?: number;
  baseDurationMs?: number;
  durationJitterMs?: number;
  arcMin?: number;
  arcJitter?: number;
  driftBase?: number;
  driftJitter?: number;
  onComplete?: () => void;
};

type ParticleMeta = {
  id: string;
  delayMs: number;
  durationMs: number;
  arcHeight: number;
  driftX: number;
  size: number;
};

const coinImage = require("../../../assets/coin.png");
const clampCoinCount = (count: number) => Math.max(6, Math.min(18, count));

export default function CoinFlyOverlay({
  startLayout,
  endLayout,
  count = 8,
  minSize = 14,
  maxSize = 18,
  zIndex = 60,
  delayStepMs = 28,
  baseDurationMs = 650,
  durationJitterMs = 250,
  arcMin = 44,
  arcJitter = 34,
  driftBase = 8,
  driftJitter = 20,
  onComplete,
}: Props) {
  const completedRef = useRef(0);
  const particleCount = clampCoinCount(count);
  const safeMinSize = Math.max(8, Math.min(minSize, maxSize));
  const safeMaxSize = Math.max(safeMinSize, maxSize);
  const sizeSpread = Math.max(1, safeMaxSize - safeMinSize + 1);
  const safeDurationJitter = Math.max(1, durationJitterMs);
  const safeArcJitter = Math.max(1, arcJitter);
  const safeDriftJitter = Math.max(1, driftJitter);

  const particles = useMemo<ParticleMeta[]>(
    () =>
      Array.from({ length: particleCount }).map((_, index) => ({
        id: `wallet-coin-fly-${index}`,
        delayMs: index * delayStepMs,
        durationMs: baseDurationMs + ((index * 57) % safeDurationJitter),
        arcHeight: arcMin + ((index * 19) % safeArcJitter),
        driftX:
          (index % 2 === 0 ? -1 : 1) *
          (driftBase + ((index * 11) % safeDriftJitter)),
        size: safeMinSize + ((index * 5) % sizeSpread),
      })),
    [
      arcJitter,
      arcMin,
      baseDurationMs,
      delayStepMs,
      driftBase,
      driftJitter,
      safeDurationJitter,
      particleCount,
      safeArcJitter,
      safeDriftJitter,
      safeMinSize,
      sizeSpread,
    ]
  );

  useEffect(() => {
    completedRef.current = 0;
  }, [particles]);

  const onParticleComplete = () => {
    completedRef.current += 1;
    if (completedRef.current >= particles.length) {
      onComplete?.();
    }
  };

  if (!startLayout || !endLayout) return null;

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { zIndex, elevation: zIndex }]}
    >
      {particles.map((particle) => (
        <CoinParticle
          key={particle.id}
          meta={particle}
          startLayout={startLayout}
          endLayout={endLayout}
          onDone={onParticleComplete}
        />
      ))}
    </View>
  );
}

function CoinParticle({
  meta,
  startLayout,
  endLayout,
  onDone,
}: {
  meta: ParticleMeta;
  startLayout: LayoutRect;
  endLayout: LayoutRect;
  onDone: () => void;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = 0;
    progress.value = withDelay(
      meta.delayMs,
      withTiming(
        1,
        {
          duration: meta.durationMs,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(onDone)();
          }
        }
      )
    );
  }, [meta.delayMs, meta.durationMs, onDone, progress]);

  const animatedStyle = useAnimatedStyle((): any => {
    const p = progress.value;
    const startX = startLayout.x + startLayout.width * 0.5;
    const startY = startLayout.y + startLayout.height * 0.5;
    const endX = endLayout.x + endLayout.width * 0.5;
    const endY = endLayout.y + endLayout.height * 0.5;

    const pathX = startX + (endX - startX) * p;
    const pathY = startY + (endY - startY) * p;
    const arcY = meta.arcHeight * (4 * p * (1 - p));
    const driftX = meta.driftX * (1 - p) * p * 2;

    return {
      opacity: 1 - 0.8 * p,
      transform: [
        { translateX: pathX + driftX - meta.size / 2 },
        { translateY: pathY - arcY - meta.size / 2 },
        { scale: 1 - 0.3 * p },
      ],
    };
  });

  return (
    <Animated.View style={[styles.coin, animatedStyle]}>
      <View
        style={[
          styles.glow,
          {
            width: meta.size + 8,
            height: meta.size + 8,
            borderRadius: (meta.size + 8) * 0.5,
            top: -4,
            left: -4,
          },
        ]}
      />
      <View
        style={{
          width: meta.size,
          height: meta.size,
          borderRadius: meta.size * 0.5,
          overflow: "hidden",
        }}
      >
        <Image
          source={coinImage}
          style={{ width: meta.size, height: meta.size }}
          resizeMode="contain"
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  coin: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  glow: {
    position: "absolute",
    backgroundColor: "rgba(255, 215, 0, 0.22)",
  },
});
