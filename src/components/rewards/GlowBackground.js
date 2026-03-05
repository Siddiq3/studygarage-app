import React, { useEffect, useMemo } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Circle, Defs, Pattern, RadialGradient, Rect, Stop } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const particlesSeed = Array.from({ length: 10 }).map((_, idx) => ({
  id: `p-${idx}`,
  x: (idx * 37) % 220,
  y: (idx * 51) % 420,
  size: 1.5 + (idx % 3),
  duration: 11000 + idx * 420,
}));

export default function GlowBackground() {
  const { width, height } = useWindowDimensions();
  const fade = useSharedValue(0);
  const drift1 = useSharedValue(0);
  const drift2 = useSharedValue(0);

  useEffect(() => {
    fade.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) });
    drift1.value = withRepeat(withTiming(1, { duration: 14000, easing: Easing.linear }), -1, true);
    drift2.value = withRepeat(withTiming(1, { duration: 18000, easing: Easing.linear }), -1, true);
  }, [drift1, drift2, fade]);

  const layerStyle = useAnimatedStyle(() => ({
    opacity: fade.value,
  }));

  const blob1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: -18 + drift1.value * 36 }, { translateY: -10 + drift2.value * 20 }],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: 20 - drift2.value * 42 }, { translateY: 16 - drift1.value * 24 }],
  }));

  const blob3Style = useAnimatedStyle(() => ({
    transform: [{ translateX: -6 + drift2.value * 16 }, { translateY: 18 - drift1.value * 26 }],
  }));

  const particles = useMemo(() => particlesSeed, []);

  return (
    <Animated.View style={layerStyle} pointerEvents="none" className="absolute inset-0">
      <View className="absolute inset-0 bg-[#070A10]" />

      <Animated.View style={blob1Style} className="absolute -left-14 -top-20 h-[280px] w-[280px] rounded-full bg-[#785DFF]/25" />
      <Animated.View style={blob2Style} className="absolute -right-16 top-[22%] h-[320px] w-[320px] rounded-full bg-[#2F7CFF]/18" />
      <Animated.View style={blob3Style} className="absolute bottom-[10%] left-[18%] h-[240px] w-[240px] rounded-full bg-[#6E49FF]/14" />
      <Animated.View style={blob1Style} className="absolute bottom-[24%] -right-10 h-[180px] w-[180px] rounded-full bg-[#7A5CFF]/12" />

      <Svg width={width} height={height} className="absolute inset-0">
        <Defs>
          <RadialGradient id="rg1" cx="24%" cy="18%" r="34%">
            <Stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.28" />
            <Stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="rg2" cx="76%" cy="36%" r="38%">
            <Stop offset="0%" stopColor="#3DA7FF" stopOpacity="0.24" />
            <Stop offset="100%" stopColor="#3DA7FF" stopOpacity="0" />
          </RadialGradient>
          <RadialGradient id="rg3" cx="52%" cy="70%" r="42%">
            <Stop offset="0%" stopColor="#8B74FF" stopOpacity="0.16" />
            <Stop offset="100%" stopColor="#8B74FF" stopOpacity="0" />
          </RadialGradient>
          <Pattern id="noise" patternUnits="userSpaceOnUse" width="6" height="6">
            <Circle cx="1" cy="1" r="0.6" fill="white" opacity="0.08" />
            <Circle cx="4.6" cy="3.8" r="0.55" fill="white" opacity="0.06" />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill="url(#rg1)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#rg2)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#rg3)" />
        <Rect x="0" y="0" width={width} height={height} fill="url(#noise)" opacity="0.03" />
      </Svg>

      {particles.map((particle) => (
        <FloatingParticle key={particle.id} particle={particle} />
      ))}
    </Animated.View>
  );
}

function FloatingParticle({ particle }) {
  const drift = useSharedValue(0);

  useEffect(() => {
    drift.value = withRepeat(
      withTiming(1, { duration: particle.duration, easing: Easing.linear }),
      -1,
      true
    );
  }, [drift, particle.duration]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: particle.x,
    top: particle.y,
    opacity: 0.03 + drift.value * 0.07,
    transform: [
      { translateY: -6 + drift.value * 12 },
      { translateX: -4 + drift.value * 8 },
    ],
  }));

  return <Animated.View style={[style, { width: particle.size, height: particle.size }]} className="rounded-full bg-white" />;
}
