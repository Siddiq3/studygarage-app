import React, { useEffect, useMemo, useRef } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Coin from './Coin';

const DROP_COINS = 10;
const FLY_COINS = 3;

const dropMeta = Array.from({ length: DROP_COINS }).map((_, idx) => ({
  id: `drop-${idx}`,
  x: (idx - 4.5) * 10 + (idx % 2 ? -6 : 6),
  y: 62 - idx * 3,
  delay: 180 + idx * 65,
  rot: idx % 2 === 0 ? -16 : 16,
}));

const flyMeta = Array.from({ length: FLY_COINS }).map((_, idx) => ({
  id: `fly-${idx}`,
  delay: idx * 90,
  arc: 66 + idx * 10,
}));

export default function CoinDropAnimation({
  startFly = false,
  onCoinArrive,
  onFlyComplete,
}) {
  const { width, height } = useWindowDimensions();

  const spotlight = useSharedValue(0.22);
  const shadowPulse = useSharedValue(1);
  const shine = useSharedValue(0);
  const heroDrop = useSharedValue(0);
  const heroGlow = useSharedValue(0.24);

  const flyStartRef = useRef(false);
  const flyDoneRef = useRef(0);

  useEffect(() => {
    spotlight.value = withRepeat(
      withSequence(withTiming(0.36, { duration: 1800 }), withTiming(0.2, { duration: 1600 })),
      -1,
      false
    );

    shadowPulse.value = withRepeat(
      withSequence(withTiming(1.08, { duration: 900 }), withTiming(1, { duration: 900 })),
      -1,
      false
    );

    heroDrop.value = withDelay(
      360,
      withSequence(
        withTiming(1, { duration: 380, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 11, stiffness: 230 })
      )
    );

    heroGlow.value = withRepeat(
      withSequence(withTiming(0.36, { duration: 1000 }), withTiming(0.22, { duration: 1000 })),
      -1,
      true
    );

    shine.value = withSequence(
      withDelay(520, withTiming(1, { duration: 720, easing: Easing.out(Easing.cubic) })),
      withTiming(0, { duration: 220 }),
      withDelay(360, withTiming(1, { duration: 720, easing: Easing.out(Easing.cubic) })),
      withTiming(0, { duration: 200 })
    );
  }, [heroDrop, heroGlow, shadowPulse, shine, spotlight]);

  const spotlightStyle = useAnimatedStyle(() => ({
    opacity: spotlight.value,
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    transform: [
      { scaleX: (0.74 + heroDrop.value * 0.36) * shadowPulse.value },
      { scaleY: 0.78 + heroDrop.value * 0.28 },
    ],
    opacity: 0.18 + heroDrop.value * 0.24,
  }));

  const shineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: -92 + shine.value * 184 }, { rotate: '-22deg' }],
    opacity: shine.value <= 0 ? 0 : 0.26,
  }));

  const heroStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: -120 + heroDrop.value * 120 },
      { rotate: `${-8 + heroDrop.value * 8}deg` },
      { scale: 0.9 + heroDrop.value * 0.1 },
    ],
  }));

  const heroGlowStyle = useAnimatedStyle(() => ({
    opacity: heroGlow.value,
    transform: [{ scale: 0.92 + heroGlow.value * 0.24 }],
  }));

  const walletTarget = useMemo(
    () => ({
      x: Math.max(112, width * 0.34),
      y: -Math.max(210, height * 0.33),
    }),
    [height, width]
  );

  useEffect(() => {
    if (!startFly || flyStartRef.current) return;
    flyStartRef.current = true;
  }, [startFly]);

  const notifyArrive = () => {
    if (onCoinArrive) {
      onCoinArrive();
    }

    flyDoneRef.current += 1;
    if (flyDoneRef.current >= FLY_COINS && onFlyComplete) {
      onFlyComplete();
    }
  };

  return (
    <View className="relative h-[300px] w-full items-center justify-center">
      <Animated.View style={spotlightStyle} className="absolute -bottom-1 h-[230px] w-[230px]">
        <Svg width="100%" height="100%" viewBox="0 0 240 240">
          <Defs>
            <LinearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor="#8A76FF" stopOpacity="0.6" />
              <Stop offset="1" stopColor="#8A76FF" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path d="M120 28 L216 218 L24 218 Z" fill="url(#cone)" />
        </Svg>
      </Animated.View>

      <Animated.View style={shadowStyle} className="absolute bottom-[72px] h-6 w-40 rounded-full bg-black/55" />

      <View className="absolute bottom-[84px] items-center">
        <View className="relative h-[84px] w-[140px] items-center justify-end">
          {dropMeta.map((coin) => (
            <DropCoin key={coin.id} meta={coin} />
          ))}

          <Animated.View style={heroStyle} className="absolute -top-4 items-center justify-center">
            <Animated.View style={heroGlowStyle} className="absolute h-[96px] w-[96px] rounded-full bg-[#FCD348]/26" />
            <Animated.View style={heroGlowStyle} className="absolute h-[116px] w-[116px] rounded-full bg-[#A780FF]/18" />
            <Coin size={72} label="SG" />
            <Animated.View style={shineStyle} pointerEvents="none" className="absolute h-[84px] w-3 rounded-full bg-white" />
          </Animated.View>
        </View>
      </View>

      {flyMeta.map((coin) => (
        <FlyCoin
          key={coin.id}
          meta={coin}
          startFly={startFly}
          targetX={walletTarget.x}
          targetY={walletTarget.y}
          onArrive={notifyArrive}
        />
      ))}
    </View>
  );
}

function DropCoin({ meta }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      meta.delay,
      withSequence(
        withTiming(1, { duration: 340, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 12, stiffness: 240 })
      )
    );
  }, [meta.delay, progress]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      { translateX: meta.x },
      { translateY: -180 + (meta.y + 180) * progress.value },
      { rotate: `${meta.rot - meta.rot * progress.value}deg` },
      { scale: 0.84 + progress.value * 0.16 },
    ],
    opacity: progress.value,
  }));

  return (
    <Animated.View style={style}>
      <Coin size={24} compact />
    </Animated.View>
  );
}

function FlyCoin({ meta, startFly, targetX, targetY, onArrive }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!startFly) return;

    progress.value = withDelay(
      meta.delay,
      withTiming(
        1,
        {
          duration: 780,
          easing: Easing.inOut(Easing.quad),
        },
        (finished) => {
          if (finished) {
            runOnJS(onArrive)();
          }
        }
      )
    );
  }, [meta.delay, onArrive, progress, startFly]);

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const x = targetX * p;
    const y = targetY * p - meta.arc * (4 * p * (1 - p));

    return {
      position: 'absolute',
      opacity: p <= 0 ? 0 : 1 - p,
      transform: [
        { translateX: x },
        { translateY: y },
        { scale: 1 - p * 0.26 },
      ],
    };
  });

  return (
    <Animated.View style={style}>
      <Coin size={18} compact />
    </Animated.View>
  );
}
