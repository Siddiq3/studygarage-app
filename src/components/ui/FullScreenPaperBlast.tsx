import React, { useEffect, useMemo } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

type PaperMeta = {
  id: string;
  wave: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  rotateStart: number;
  rotateEnd: number;
  duration: number;
  delay: number;
  color: string;
};

type Props = {
  visible: boolean;
  triggerToken: number;
  seed: number;
  waveDelays?: number[];
  piecesPerWave?: number;
  zIndex?: number;
};

function createSeededRandom(seed: number) {
  let current = seed % 2147483647;
  if (current <= 0) current += 2147483646;
  return () => {
    current = (current * 16807) % 2147483647;
    return (current - 1) / 2147483646;
  };
}

function buildPaperMeta(
  seed: number,
  waveCount: number,
  piecesPerWave: number
): PaperMeta[] {
  const rand = createSeededRandom(seed * 17 + 91);
  const colors = ["#FFD86B", "#9D78FF", "#36D8A3", "#DCE3F8", "#7C5CFF"];
  const result: PaperMeta[] = [];

  for (let wave = 0; wave < waveCount; wave += 1) {
    for (let index = 0; index < piecesPerWave; index += 1) {
      const absoluteIndex = wave * piecesPerWave + index;
      const edgeRoll = rand();
      const startRegion: "top" | "left" | "right" =
        edgeRoll < 0.45 ? "top" : edgeRoll < 0.72 ? "left" : "right";

      let startX = 0;
      let startY = 0;
      let endX = 0;

      if (startRegion === "top") {
        startX = rand() * SCREEN_WIDTH;
        startY = -30 - rand() * 190;
        endX = startX + (-170 + rand() * 340);
      } else if (startRegion === "left") {
        startX = -35 - rand() * 105;
        startY = -52 + rand() * SCREEN_HEIGHT * 0.72;
        endX = startX + SCREEN_WIDTH * (0.58 + rand() * 0.68);
      } else {
        startX = SCREEN_WIDTH + 35 + rand() * 105;
        startY = -52 + rand() * SCREEN_HEIGHT * 0.72;
        endX = startX - SCREEN_WIDTH * (0.58 + rand() * 0.68);
      }

      const endY = SCREEN_HEIGHT + 95 + rand() * 250;
      const width = 3 + rand() * 5;
      const height = 13 + rand() * 22;
      const rotateStart = -45 + rand() * 90;
      const rotateEnd = rotateStart + (-390 + rand() * 780);
      const duration = 2100 + rand() * 1800;
      const delay = rand() * 2850;
      const color = colors[absoluteIndex % colors.length];

      result.push({
        id: `paper_${seed}_${absoluteIndex}`,
        wave,
        startX,
        startY,
        endX,
        endY,
        width,
        height,
        rotateStart,
        rotateEnd,
        duration,
        delay,
        color,
      });
    }
  }

  return result;
}

function PaperPiece({
  meta,
  visible,
  triggerToken,
  waveDelay,
}: {
  meta: PaperMeta;
  visible: boolean;
  triggerToken: number;
  waveDelay: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!visible || triggerToken < 1) {
      progress.value = 0;
      return;
    }

    progress.value = 0;
    progress.value = withDelay(
      waveDelay + meta.delay,
      withTiming(1, {
        duration: meta.duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [meta.delay, meta.duration, progress, triggerToken, visible, waveDelay]);

  useEffect(
    () => () => {
      cancelAnimation(progress);
    },
    [progress]
  );

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const fallCurve = p * p * 0.82 + p * 0.18;
    const x = meta.startX + (meta.endX - meta.startX) * p;
    const y = meta.startY + (meta.endY - meta.startY) * fallCurve;
    const rotate = meta.rotateStart + (meta.rotateEnd - meta.rotateStart) * p;

    return {
      opacity: interpolate(p, [0, 0.08, 0.82, 1], [0, 0.95, 0.9, 0]),
      transform: [
        { translateX: x },
        { translateY: y },
        { rotateZ: `${rotate}deg` },
        { scale: interpolate(p, [0, 1], [0.8, 1]) },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        style,
        {
          position: "absolute",
          width: meta.width,
          height: meta.height,
          borderRadius: 2,
          backgroundColor: meta.color,
        },
      ]}
    />
  );
}

export default function FullScreenPaperBlast({
  visible,
  triggerToken,
  seed,
  waveDelays = [80, 900, 1720],
  piecesPerWave = 48,
  zIndex = 90,
}: Props) {
  const waves = Math.max(1, waveDelays.length);
  const pieces = useMemo(
    () => buildPaperMeta(seed, waves, Math.max(1, piecesPerWave)),
    [piecesPerWave, seed, waves]
  );

  if (!visible) {
    return null;
  }

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex,
        elevation: zIndex,
      }}
    >
      {pieces.map((piece) => (
        <PaperPiece
          key={piece.id}
          meta={piece}
          visible={visible}
          triggerToken={triggerToken}
          waveDelay={waveDelays[piece.wave] ?? 0}
        />
      ))}
    </View>
  );
}
