import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Coin from '../rewards/Coin';

const STACK_SIZE = 10;
const FLY_SIZE = 9;

const stackMeta = Array.from({ length: STACK_SIZE }).map((_, index) => ({
  id: `stack-${index}`,
  delay: index * 75,
  baseY: Math.max(0, (STACK_SIZE - index) * 1.5),
}));

const flyMeta = Array.from({ length: FLY_SIZE }).map((_, index) => {
  const direction = index % 2 === 0 ? 1 : -1;
  return {
    id: `fly-${index}`,
    delay: 760 + index * 45,
    startX: direction * (10 + index * 4),
    startY: -10 - index * 4,
    endX: 132,
    endY: -132,
  };
});

export default function CoinFlyToBadge({ amount = 50 }) {
  const [displayCoins, setDisplayCoins] = useState(0);

  const counterProgress = useSharedValue(0);
  const bounce = useSharedValue(1);

  useEffect(() => {
    counterProgress.value = withTiming(1, {
      duration: 980,
      easing: Easing.out(Easing.cubic),
    });

    bounce.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 850 }),
        withTiming(1, { duration: 850 })
      ),
      -1,
      false
    );
  }, [bounce, counterProgress]);

  useAnimatedReaction(
    () => counterProgress.value,
    (progress) => {
      const next = Math.round(amount * progress);
      runOnJS(setDisplayCoins)(next);
    },
    [amount]
  );

  const numberStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounce.value }],
  }));

  const stackCoins = useMemo(() => stackMeta, []);
  const flyCoins = useMemo(() => flyMeta, []);

  return (
    <View className="relative mt-4 h-[250px] w-full items-center justify-center">
      <View className="absolute right-1 top-1 rounded-2xl border border-white/20 bg-white/8 px-3 py-2">
        <View className="flex-row items-center gap-1.5">
          <Coin size={18} compact />
          <Text className="text-[12px] font-extrabold text-white">Wallet</Text>
        </View>
      </View>

      <View className="items-center">
        <Text className="text-[12px] font-semibold uppercase tracking-[1.1px] text-[#96A0B9]">Welcome Gift</Text>

        <Animated.View style={numberStyle} className="mt-2 flex-row items-center gap-2">
          <Coin size={30} />
          <Text className="text-[48px] font-black leading-[50px] text-white">{displayCoins}</Text>
        </Animated.View>

        <Text className="mt-1 text-[13px] font-semibold text-[#AEB7CC]">coins collected</Text>
      </View>

      <View className="absolute bottom-5 items-center justify-end">
        {stackCoins.map((coin) => (
          <StackCoin key={coin.id} meta={coin} />
        ))}
      </View>

      {flyCoins.map((coin) => (
        <FlyCoin key={coin.id} meta={coin} />
      ))}

      <LinearGradient
        pointerEvents="none"
        colors={['rgba(124,92,255,0.24)', 'rgba(61,167,255,0.04)']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute -bottom-5 h-20 w-48 rounded-full"
      />
    </View>
  );
}

function StackCoin({ meta }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      meta.delay,
      withSequence(
        withTiming(1, { duration: 260, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 12, stiffness: 250 })
      )
    );
  }, [meta.delay, progress]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: progress.value,
    transform: [
      { translateY: -90 + (meta.baseY + 12) * progress.value },
      { scale: 0.92 + progress.value * 0.12 },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Coin size={20} compact />
    </Animated.View>
  );
}

function FlyCoin({ meta }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      meta.delay,
      withTiming(1, {
        duration: 720,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [meta.delay, progress]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    opacity: progress.value < 0.12 ? 0 : 1 - progress.value,
    transform: [
      { translateX: meta.startX + (meta.endX - meta.startX) * progress.value },
      { translateY: meta.startY + (meta.endY - meta.startY) * progress.value },
      { scale: 1 - progress.value * 0.35 },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Coin size={16} compact />
    </Animated.View>
  );
}
