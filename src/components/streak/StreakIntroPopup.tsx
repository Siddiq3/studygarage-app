import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../ui/PressableScale";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import { defaultConfig } from "../../config/remoteConfig";

type Props = {
  visible: boolean;
  streakCount?: number;
  onClose: () => void;
};

type ParticleMeta = {
  id: number;
  startX: number;
  startY: number;
  size: number;
  drift: number;
  delay: number;
  duration: number;
};

const PARTICLES: ParticleMeta[] = [
  {
    id: 1,
    startX: -54,
    startY: 10,
    size: 4,
    drift: 8,
    delay: 0,
    duration: 3600,
  },
  {
    id: 2,
    startX: -34,
    startY: -2,
    size: 3,
    drift: -6,
    delay: 220,
    duration: 4100,
  },
  {
    id: 3,
    startX: -10,
    startY: -12,
    size: 4,
    drift: 7,
    delay: 420,
    duration: 3900,
  },
  {
    id: 4,
    startX: 16,
    startY: -10,
    size: 3,
    drift: -8,
    delay: 620,
    duration: 4300,
  },
  {
    id: 5,
    startX: 40,
    startY: -4,
    size: 4,
    drift: 6,
    delay: 820,
    duration: 3800,
  },
  {
    id: 6,
    startX: 54,
    startY: 8,
    size: 3,
    drift: -7,
    delay: 980,
    duration: 4200,
  },
  {
    id: 7,
    startX: -18,
    startY: 18,
    size: 2,
    drift: 5,
    delay: 300,
    duration: 3500,
  },
  {
    id: 8,
    startX: 20,
    startY: 16,
    size: 2,
    drift: -5,
    delay: 480,
    duration: 3700,
  },
];

function PremiumAmbientParticle({
  meta,
  active,
  reducedMotionEnabled,
}: {
  meta: ParticleMeta;
  active: boolean;
  reducedMotionEnabled: boolean;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      progress.value = 0;
      return;
    }

    if (reducedMotionEnabled) {
      progress.value = 0.5;
      return;
    }

    progress.value = withRepeat(
      withSequence(
        withDelay(
          meta.delay,
          withTiming(1, {
            duration: meta.duration,
            easing: Easing.linear,
          })
        ),
        withTiming(0, { duration: 0 })
      ),
      -1,
      false
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [active, meta.delay, meta.duration, progress, reducedMotionEnabled]);

  const particleStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const opacity = reducedMotionEnabled
      ? 0.18
      : Math.max(0.05, Math.sin(Math.PI * p) * 0.2);
    return {
      opacity,
      transform: [
        { translateX: meta.startX + meta.drift * Math.sin(p * Math.PI * 2) },
        { translateY: meta.startY - 24 * p },
        { scale: 0.9 + Math.sin(p * Math.PI) * 0.25 },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={particleStyle}
      className="absolute left-1/2 top-1/2 rounded-full"
    >
      <View
        style={{ width: meta.size, height: meta.size, borderRadius: 99 }}
        className="bg-[#FFD88E]/60"
      />
    </Animated.View>
  );
}

export default function StreakIntroPopup({
  visible,
  streakCount = 1,
  onClose,
}: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const { config: remoteConfig } = useRemoteConfig();
  const streakTarget = Math.max(
    1,
    Number(remoteConfig?.streakDays ?? defaultConfig.streakDays)
  );
  const isClosingRef = useRef(false);
  const [mounted, setMounted] = useState(visible);

  const scrimOpacity = useSharedValue(0);
  const backdropScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.92);
  const cardTranslateY = useSharedValue(18);
  const haloOpacity = useSharedValue(0);
  const haloPulse = useSharedValue(0);
  const flameFlicker = useSharedValue(0);
  const rowOpacity = useSharedValue(0);
  const rowTranslateY = useSharedValue(10);

  const miniDays = useMemo(() => {
    const todayDay = Math.min(Math.max(1, streakCount), streakTarget);
    return Array.from({ length: streakTarget }, (_, idx) => {
      const day = idx + 1;
      if (day < todayDay) return { day, type: "completed" as const };
      if (day === todayDay) return { day, type: "today" as const };
      return { day, type: "upcoming" as const };
    });
  }, [streakCount, streakTarget]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setMounted(true);
    isClosingRef.current = false;

    scrimOpacity.value = withTiming(1, { duration: 180 });
    backdropScale.value = reducedMotionEnabled
      ? 1
      : withTiming(0.98, { duration: 220, easing: Easing.out(Easing.cubic) });

    cardOpacity.value = withTiming(1, { duration: 180 });
    cardTranslateY.value = withTiming(0, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
    cardScale.value = withSpring(1, {
      damping: 14,
      stiffness: 180,
      mass: 0.9,
    });

    haloOpacity.value = withTiming(1, { duration: 260 });
    rowOpacity.value = withDelay(120, withTiming(1, { duration: 240 }));
    rowTranslateY.value = withDelay(
      120,
      withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) })
    );

    if (reducedMotionEnabled) {
      haloPulse.value = 0;
      flameFlicker.value = 0;
      return;
    }

    haloPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1200, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );

    flameFlicker.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 900, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
  }, [
    backdropScale,
    cardOpacity,
    cardScale,
    cardTranslateY,
    flameFlicker,
    haloOpacity,
    haloPulse,
    reducedMotionEnabled,
    rowOpacity,
    rowTranslateY,
    scrimOpacity,
    visible,
  ]);

  useEffect(
    () => () => {
      cancelAnimation(scrimOpacity);
      cancelAnimation(backdropScale);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(haloOpacity);
      cancelAnimation(haloPulse);
      cancelAnimation(flameFlicker);
      cancelAnimation(rowOpacity);
      cancelAnimation(rowTranslateY);
    },
    [
      backdropScale,
      cardOpacity,
      cardScale,
      cardTranslateY,
      flameFlicker,
      haloOpacity,
      haloPulse,
      rowOpacity,
      rowTranslateY,
      scrimOpacity,
    ]
  );

  const handleDismiss = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    scrimOpacity.value = withTiming(0, { duration: 160 });
    backdropScale.value = withTiming(1, {
      duration: 200,
      easing: Easing.out(Easing.cubic),
    });
    rowOpacity.value = withTiming(0, { duration: 120 });
    cardOpacity.value = withTiming(0, { duration: 160 });
    cardScale.value = withTiming(0.94, { duration: 180 });
    cardTranslateY.value = withTiming(12, { duration: 180 }, (finished) => {
      if (finished) {
        runOnJS(setMounted)(false);
        runOnJS(onClose)();
      }
    });
  }, [
    backdropScale,
    cardOpacity,
    cardScale,
    cardTranslateY,
    onClose,
    rowOpacity,
    scrimOpacity,
  ]);

  const scrimStyle = useAnimatedStyle(() => ({ opacity: scrimOpacity.value }));
  const backdropStyle = useAnimatedStyle(() => ({
    transform: [{ scale: backdropScale.value }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));
  const haloStyle = useAnimatedStyle(() => ({
    opacity: haloOpacity.value * (0.62 + haloPulse.value * 0.32),
    transform: [{ scale: 1 + haloPulse.value * 0.06 }],
  }));
  const flameStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + flameFlicker.value * 0.03 },
      { rotateZ: `${-2 + flameFlicker.value * 4}deg` },
    ],
  }));
  const rowStyle = useAnimatedStyle(() => ({
    opacity: rowOpacity.value,
    transform: [{ translateY: rowTranslateY.value }],
  }));
  const todayRingStyle = useAnimatedStyle(() => ({
    opacity: reducedMotionEnabled ? 0.82 : 0.62 + haloPulse.value * 0.34,
    transform: [
      { scale: 1 + (reducedMotionEnabled ? 0 : haloPulse.value * 0.08) },
    ],
  }));

  if (!visible && !mounted) return null;

  return (
    <Modal
      transparent
      animationType="none"
      visible={mounted}
      statusBarTranslucent
      hardwareAccelerated
      presentationStyle="overFullScreen"
    >
      <Animated.View style={backdropStyle} className="flex-1">
        <Animated.View style={scrimStyle} className="absolute inset-0">
          <Pressable
            onPress={handleDismiss}
            className="absolute inset-0 bg-black/72"
          />
        </Animated.View>

        <View className="flex-1 items-center justify-center px-5">
          <View
            pointerEvents="none"
            className="absolute h-[360px] w-[360px] rounded-full bg-[#FFB46E]/10"
          />
          <Animated.View
            className="w-full max-w-[392px] overflow-hidden rounded-[28px] border border-white/14 bg-[#151B28] px-5 pb-6 pt-5"
            style={[styles.cardShadow, cardStyle]}
          >
            <View
              pointerEvents="none"
              className="absolute inset-x-0 top-0 h-[128px] bg-white/[0.03]"
            />
            <View className="items-center">
              <View className="relative h-[112px] w-[112px] items-center justify-center">
                <Animated.View
                  pointerEvents="none"
                  style={haloStyle}
                  className="absolute h-[112px] w-[112px] rounded-full overflow-hidden"
                />
                <Animated.View
                  pointerEvents="none"
                  style={[StyleSheet.absoluteFillObject, haloStyle]}
                  className="overflow-hidden rounded-full"
                >
                  <LinearGradient
                    colors={[
                      "rgba(255,170,77,0.18)",
                      "rgba(176,38,255,0.10)",
                      "rgba(0,0,0,0)",
                    ]}
                    start={{ x: 0.5, y: 0.1 }}
                    end={{ x: 0.5, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                </Animated.View>
                {!reducedMotionEnabled
                  ? PARTICLES.map((meta) => (
                      <PremiumAmbientParticle
                        key={meta.id}
                        meta={meta}
                        active={mounted}
                        reducedMotionEnabled={reducedMotionEnabled}
                      />
                    ))
                  : null}
                <Animated.View
                  style={flameStyle}
                  className="h-[76px] w-[76px] items-center justify-center rounded-full border border-[#FF7A3D]/45 bg-[#2E1F14]/82"
                >
                  <Ionicons name="flame" size={35} color="#FF9A3D" />
                </Animated.View>
              </View>
            </View>

            <Text className="mt-4 text-center text-[30px] font-black leading-[34px] text-white">
              Streak Boost
            </Text>
            <Text className="mt-2 text-center text-[14px] font-semibold text-[#B8C0D4]">
              1 quiz + 30 mins active study
            </Text>

            <Animated.View
              style={rowStyle}
              className="mt-4 flex-row items-center justify-between rounded-[14px] border border-white/12 bg-[#1C2434] px-3 py-2.5"
            >
              {miniDays.map((item) => {
                const completed = item.type === "completed";
                const today = item.type === "today";
                return (
                  <View key={item.day} className="items-center">
                    <View className="relative h-5 w-5 items-center justify-center">
                      {today ? (
                        <Animated.View
                          style={todayRingStyle}
                          className="absolute h-5 w-5 rounded-full border border-[#FFB46E]/90"
                        />
                      ) : null}
                      <View
                        className={`h-4 w-4 items-center justify-center rounded-full border ${
                          completed
                            ? "border-[#FF9A3D]/85 bg-[#FF7A3D]/35"
                            : today
                            ? "border-[#FFB46E] bg-[#2A1712]"
                            : "border-white/20 bg-white/7"
                        }`}
                      >
                        {completed ? (
                          <Ionicons name="checkmark" size={10} color="#FFE0C2" />
                        ) : today ? (
                          <View className="h-1.5 w-1.5 rounded-full bg-[#FF9A3D]" />
                        ) : null}
                      </View>
                    </View>
                  </View>
                );
              })}
            </Animated.View>

            <View className="mt-4 rounded-[16px] border border-white/12 bg-[#1C2434] px-3 py-3">
              <Text className="text-[12px] font-semibold text-[#D2D9EA]">
                Keep consistency, unlock milestone coins, and don’t break the
                chain.
              </Text>
            </View>

            <PressableScale
              onPress={handleDismiss}
              activeScale={0.96}
              hapticType="tap"
              className="mt-6 overflow-hidden rounded-[999px] border border-white/14 bg-[#202A3D] px-5 py-4"
              containerStyle={styles.ctaShadow}
            >
              <Text className="text-center text-[15px] font-black text-white">
                Got it
              </Text>
            </PressableScale>
          </Animated.View>
        </View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaShadow: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
});
