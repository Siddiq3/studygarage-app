import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ReferralStreakRibbon({ streakDays = 0 }) {
  const previousDaysRef = useRef(streakDays);

  const translateX = useSharedValue(-180);
  const countScale = useSharedValue(1);
  const rippleOpacity = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(0, {
      duration: 380,
      easing: Easing.out(Easing.cubic),
    });

    countScale.value = withSequence(
      withTiming(1.06, { duration: 130 }),
      withSpring(1, { damping: 14, stiffness: 220, mass: 0.74 })
    );
  }, [countScale, translateX]);

  useEffect(() => {
    if (streakDays > previousDaysRef.current) {
      countScale.value = withSequence(
        withTiming(1.08, { duration: 120 }),
        withSpring(1, { damping: 14, stiffness: 240, mass: 0.72 })
      );

      rippleOpacity.value = 0;
      rippleOpacity.value = withSequence(
        withTiming(0.22, { duration: 170 }),
        withTiming(0, { duration: 360 })
      );
    }

    previousDaysRef.current = streakDays;
  }, [countScale, rippleOpacity, streakDays]);

  const ribbonStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const countStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    opacity: rippleOpacity.value,
    transform: [{ scale: 0.95 + rippleOpacity.value }],
  }));

  return (
    <AnimatedView style={ribbonStyle} className="mt-1 self-start">
      <View className="relative overflow-hidden rounded-full border border-white/10">
        <LinearGradient
          colors={['rgba(176,38,255,0.36)', 'rgba(17,20,30,0.96)']}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center px-3 py-1.5"
        >
          <View className="mr-2 rounded-full bg-[#FF7A1A]/20 p-1.5">
            <Ionicons name="flame-outline" size={12} color="#FF9A3D" />
          </View>

          <Text className="text-[11px] font-semibold text-[#B8C0D4]">
            Referral Streak:
          </Text>

          <View className="relative ml-1.5">
            <AnimatedView
              pointerEvents="none"
              style={rippleStyle}
              className="absolute -inset-1 rounded-full bg-[#B026FF]/20"
            />
            <Animated.Text
              style={countStyle}
              className="text-[12px] font-extrabold text-[#F5F7FF]"
            >
              {streakDays} Days
            </Animated.Text>
          </View>
        </LinearGradient>
      </View>
    </AnimatedView>
  );
}
