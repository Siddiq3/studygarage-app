import React, { useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type Props = {
  progressPct: number;
  reducedMotionEnabled?: boolean;
  onDisplayChange?: (value: number) => void;
};

export default function ProgressBar({
  progressPct,
  reducedMotionEnabled = false,
  onDisplayChange,
}: Props) {
  const progress = useSharedValue(0);
  const sweep = useSharedValue(-34);

  useEffect(() => {
    const target = Math.max(0, Math.min(100, progressPct));
    if (reducedMotionEnabled) {
      progress.value = target;
    } else {
      progress.value = withSpring(target, {
        damping: 16,
        stiffness: 140,
        mass: 0.8,
      });
    }
  }, [progress, progressPct, reducedMotionEnabled]);

  useEffect(() => {
    if (reducedMotionEnabled) {
      sweep.value = 0;
      return;
    }

    sweep.value = withRepeat(
      withSequence(
        withTiming(104, { duration: 1600, easing: Easing.inOut(Easing.quad) }),
        withTiming(-34, { duration: 1600, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [reducedMotionEnabled, sweep]);

  useAnimatedReaction(
    () => progress.value,
    (value) => {
      if (onDisplayChange) {
        runOnJS(onDisplayChange)(Math.round(value));
      }
    },
    [onDisplayChange]
  );

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  const sweepStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sweep.value }],
  }));

  return (
    <View className="overflow-hidden rounded-full border border-white/12 bg-white/7">
      <Animated.View
        className="h-3 overflow-hidden rounded-full"
        style={fillStyle}
      >
        <LinearGradient
          colors={["#7E2CFF", "#B026FF", "#FF5A2F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-3 rounded-full"
        />
        <View className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-[5px] rounded-full border border-white/60 bg-white/80" />

        {reducedMotionEnabled ? null : (
          <Animated.View
            style={sweepStyle}
            className="absolute inset-y-0 left-0 w-10 overflow-hidden"
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0)",
                "rgba(255,255,255,0.45)",
                "rgba(255,255,255,0)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="h-3 w-full"
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}
