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

const coinImage = require("../../../assets/coin.png");

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

const clampParticleCount = (count: number) => Math.max(6, Math.min(10, count));

export default function CoinFlyOverlay({
  startLayout,
  endLayout,
  count = 8,
  onComplete,
}: Props) {
  const doneRef = useRef(0);
  const targetCount = clampParticleCount(count);

  const particles = useMemo<ParticleMeta[]>(
    () =>
      Array.from({ length: targetCount }).map((_, index) => ({
        id: `coin-fly-${index}`,
        delayMs: index * 28,
        durationMs: 650 + ((index * 47) % 250),
        arcHeight: 42 + ((index * 17) % 36),
        driftX: (index % 2 === 0 ? -1 : 1) * (8 + ((index * 13) % 18)),
        size: 15 + (index % 3),
      })),
    [targetCount]
  );

  useEffect(() => {
    doneRef.current = 0;
  }, [particles]);

  const handleParticleDone = () => {
    doneRef.current += 1;
    if (doneRef.current >= particles.length) {
      onComplete?.();
    }
  };

  if (!startLayout || !endLayout) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { zIndex: 60, elevation: 60 }]}
    >
      {particles.map((particle) => (
        <CoinParticle
          key={particle.id}
          meta={particle}
          startLayout={startLayout}
          endLayout={endLayout}
          onDone={handleParticleDone}
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

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const startX = startLayout.x + startLayout.width * 0.5;
    const startY = startLayout.y + startLayout.height * 0.5;
    const endX = endLayout.x + endLayout.width * 0.5;
    const endY = endLayout.y + endLayout.height * 0.5;

    const baseX = startX + (endX - startX) * p;
    const baseY = startY + (endY - startY) * p;
    const arcY = meta.arcHeight * (4 * p * (1 - p));
    const driftX = meta.driftX * (1 - p) * p * 2;

    return {
      opacity: 1 - 0.8 * p,
      transform: [
        { translateX: baseX + driftX - meta.size / 2 },
        { translateY: baseY - arcY - meta.size / 2 },
        { scale: 1 - 0.3 * p },
      ],
    };
  });

  return (
    <Animated.View style={[styles.coinContainer, animatedStyle]}>
      <Image
        source={coinImage}
        style={{ width: meta.size, height: meta.size }}
        resizeMode="contain"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  coinContainer: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
