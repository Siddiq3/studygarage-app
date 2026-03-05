import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal, Pressable, Text, UIManager, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import PressableScale from "../ui/PressableScale";
import useRemoteConfig from "../../hooks/useRemoteConfig";
import { defaultConfig } from "../../config/remoteConfig";

type LayoutRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Props = {
  visible: boolean;
  streakCount: number;
  streakIconRef?: React.RefObject<View | null>;
  onClose: () => void;
  onMergedToIcon?: () => void;
};

export default function StreakCelebrationOverlay({
  visible,
  streakCount,
  streakIconRef,
  onClose,
  onMergedToIcon,
}: Props) {
  const { config: remoteConfig } = useRemoteConfig();
  const streakTarget = Math.max(
    1,
    Number(remoteConfig?.streakDays ?? defaultConfig.streakDays)
  );
  const cardRef = useRef<View | null>(null);
  const isClosingRef = useRef(false);
  const [displayCount, setDisplayCount] = useState(0);
  const streakProgressPct = Math.min(
    100,
    Math.round((Math.min(streakCount, streakTarget) / streakTarget) * 100)
  );

  const BlurViewComponent = useMemo(() => {
    try {
      const blurModule = require("expo-blur");
      const BlurView = blurModule?.BlurView;
      const getConfig = UIManager?.getViewManagerConfig;
      const hasNativeBlurView =
        typeof getConfig === "function" &&
        Boolean(
          getConfig("ViewManagerAdapter_ExpoBlurView") ||
            getConfig("RCTViewManagerAdapter_ExpoBlurView") ||
            getConfig("ExpoBlurView")
        );

      if (!BlurView || !hasNativeBlurView) {
        return null;
      }

      return BlurView;
    } catch (_error) {
      return null;
    }
  }, []);

  const miniDayStates = useMemo(() => {
    const today = Math.min(
      streakCount >= streakTarget ? streakTarget : streakCount + 1,
      streakTarget
    );
    return Array.from({ length: streakTarget }, (_, idx) => {
      const day = idx + 1;
      if (day <= streakCount) {
        return { day, type: "completed" as const };
      }
      if (day === today) {
        return { day, type: "today" as const };
      }
      return { day, type: "upcoming" as const };
    });
  }, [streakCount, streakTarget]);

  const scrimOpacity = useSharedValue(0);
  const blurOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const cardTranslateY = useSharedValue(18);
  const travelX = useSharedValue(0);
  const travelY = useSharedValue(0);
  const shrinkScale = useSharedValue(1);
  const flameScale = useSharedValue(0.86);
  const flameGlow = useSharedValue(0.24);
  const flameHaloPulse = useSharedValue(0);
  const countProgress = useSharedValue(0);
  const progressFill = useSharedValue(0);

  const triggerSuccessHaptic = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
  }, []);

  useAnimatedReaction(
    () => countProgress.value,
    (progress) => {
      runOnJS(setDisplayCount)(Math.round(streakCount * progress));
    },
    [streakCount]
  );

  useEffect(() => {
    if (!visible) {
      cancelAnimation(scrimOpacity);
      cancelAnimation(blurOpacity);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(flameScale);
      cancelAnimation(flameGlow);
      cancelAnimation(flameHaloPulse);
      cancelAnimation(countProgress);
      cancelAnimation(progressFill);
      return;
    }

    isClosingRef.current = false;
    setDisplayCount(0);
    travelX.value = 0;
    travelY.value = 0;
    shrinkScale.value = 1;
    progressFill.value = 0;

    scrimOpacity.value = withTiming(1, { duration: 200 });
    blurOpacity.value = withTiming(1, { duration: 220 });
    cardOpacity.value = withTiming(1, { duration: 200 });
    cardTranslateY.value = withTiming(0, {
      duration: 250,
      easing: Easing.out(Easing.cubic),
    });
    cardScale.value = withSpring(1, {
      damping: 15,
      stiffness: 180,
      mass: 0.9,
    });
    flameScale.value = withSequence(
      withTiming(1.1, { duration: 180 }),
      withTiming(1, { duration: 160 })
    );
    flameGlow.value = withRepeat(
      withSequence(
        withTiming(0.58, { duration: 950 }),
        withTiming(0.24, { duration: 950 })
      ),
      -1,
      false
    );
    flameHaloPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1250, easing: Easing.inOut(Easing.quad) }),
        withTiming(0, { duration: 1250, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    );
    countProgress.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
    progressFill.value = withTiming(streakProgressPct, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });
  }, [
    blurOpacity,
    cardOpacity,
    cardScale,
    cardTranslateY,
    countProgress,
    flameGlow,
    flameHaloPulse,
    flameScale,
    progressFill,
    scrimOpacity,
    streakProgressPct,
    shrinkScale,
    travelX,
    travelY,
    visible,
  ]);

  useEffect(
    () => () => {
      cancelAnimation(scrimOpacity);
      cancelAnimation(blurOpacity);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(travelX);
      cancelAnimation(travelY);
      cancelAnimation(shrinkScale);
      cancelAnimation(flameScale);
      cancelAnimation(flameGlow);
      cancelAnimation(flameHaloPulse);
      cancelAnimation(countProgress);
      cancelAnimation(progressFill);
    },
    [
      blurOpacity,
      cardOpacity,
      cardScale,
      cardTranslateY,
      countProgress,
      flameGlow,
      flameHaloPulse,
      flameScale,
      progressFill,
      scrimOpacity,
      shrinkScale,
      travelX,
      travelY,
    ]
  );

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));

  const blurStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value * 0.95,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateX: travelX.value },
      { translateY: cardTranslateY.value + travelY.value },
      { scale: cardScale.value * shrinkScale.value },
    ],
  }));

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
  }));

  const flameGlowStyle = useAnimatedStyle(() => ({
    opacity: flameGlow.value,
  }));

  const haloPulseStyle = useAnimatedStyle(() => ({
    opacity: 0.28 + flameHaloPulse.value * 0.18,
    transform: [{ scale: 1 + flameHaloPulse.value * 0.07 }],
  }));

  const progressFillStyle = useAnimatedStyle(() => ({
    width: `${Math.max(2, progressFill.value)}%`,
  }));

  const measureInWindowAsync = useCallback(
    (ref: React.RefObject<View | null>) => {
      return new Promise<LayoutRect | null>((resolve) => {
        const node = ref?.current;
        if (!node || typeof node.measureInWindow !== "function") {
          resolve(null);
          return;
        }

        requestAnimationFrame(() => {
          node.measureInWindow((x, y, width, height) => {
            if (
              !Number.isFinite(width) ||
              !Number.isFinite(height) ||
              width <= 0 ||
              height <= 0
            ) {
              resolve(null);
              return;
            }
            resolve({ x, y, width, height });
          });
        });
      });
    },
    []
  );

  const closeWithMerge = useCallback(async () => {
    if (!visible || isClosingRef.current) {
      return;
    }

    isClosingRef.current = true;

    const [cardLayout, targetLayout] = await Promise.all([
      measureInWindowAsync(cardRef),
      streakIconRef
        ? measureInWindowAsync(streakIconRef)
        : Promise.resolve(null),
    ]);

    if (!cardLayout || !targetLayout) {
      scrimOpacity.value = withTiming(0, { duration: 180 }, (finished) => {
        if (finished) {
          runOnJS(onClose)();
        }
      });
      blurOpacity.value = withTiming(0, { duration: 180 });
      cardScale.value = withTiming(0.94, { duration: 180 });
      cardOpacity.value = withTiming(0, { duration: 180 });
      return;
    }

    const cardCenterX = cardLayout.x + cardLayout.width * 0.5;
    const cardCenterY = cardLayout.y + cardLayout.height * 0.5;
    const targetCenterX = targetLayout.x + targetLayout.width * 0.5;
    const targetCenterY = targetLayout.y + targetLayout.height * 0.5;

    const deltaX = targetCenterX - cardCenterX;
    const deltaY = targetCenterY - cardCenterY;

    travelX.value = withTiming(deltaX, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });
    travelY.value = withTiming(deltaY, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });
    shrinkScale.value = withTiming(0.26, {
      duration: 560,
      easing: Easing.out(Easing.cubic),
    });
    cardOpacity.value = withTiming(0.45, { duration: 500 });
    flameGlow.value = withTiming(0, { duration: 300 });
    blurOpacity.value = withTiming(0, { duration: 240 });
    scrimOpacity.value = withTiming(0, { duration: 240 });

    cardTranslateY.value = withTiming(0, { duration: 120 }, (finished) => {
      if (finished) {
        runOnJS(onMergedToIcon || (() => {}))();
        runOnJS(triggerSuccessHaptic)();
        runOnJS(onClose)();
      }
    });
  }, [
    blurOpacity,
    cardOpacity,
    cardScale,
    cardTranslateY,
    flameGlow,
    onClose,
    onMergedToIcon,
    triggerSuccessHaptic,
    scrimOpacity,
    shrinkScale,
    streakIconRef,
    travelX,
    travelY,
    visible,
    measureInWindowAsync,
  ]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      statusBarTranslucent
      onRequestClose={closeWithMerge}
    >
      <View className="flex-1 items-center justify-center px-5">
        {BlurViewComponent ? (
          <Animated.View style={blurStyle} className="absolute inset-0">
            <BlurViewComponent intensity={26} tint="dark" style={{ flex: 1 }} />
          </Animated.View>
        ) : null}

        <Animated.View style={scrimStyle} className="absolute inset-0">
          <Pressable
            onPress={closeWithMerge}
            className="absolute inset-0 bg-black/60"
          />
        </Animated.View>

        <Animated.View
          ref={cardRef}
          collapsable={false}
          style={cardStyle}
          className="w-full max-w-[388px] overflow-hidden rounded-[28px] border border-white/8 bg-white/5 px-5 pb-6 pt-6"
        >
          <View className="absolute left-1/2 top-4 h-32 w-32 -translate-x-16 rounded-full bg-[#8D5AFF]/8" />
          <PressableScale
            onPress={closeWithMerge}
            activeScale={0.96}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/14 bg-[#111726]/90 p-2"
          >
            <Ionicons name="close" size={16} color="#C8D0E2" />
          </PressableScale>

          <View className="items-center pt-1">
            <Animated.View
              pointerEvents="none"
              style={haloPulseStyle}
              className="absolute -top-2 h-[96px] w-[96px] rounded-full"
            >
              <LinearGradient
                colors={[
                  "rgba(255,122,61,0.35)",
                  "rgba(255,122,61,0.15)",
                  "rgba(255,122,61,0)",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 1, borderRadius: 999 }}
              />
            </Animated.View>
            <Animated.View
              style={flameGlowStyle}
              className="absolute -inset-2 rounded-full bg-[#FF7A3D]/24"
            />
            <Animated.View
              style={flameStyle}
              className="h-[74px] w-[74px] items-center justify-center rounded-full border border-[#FF7A3D]/45 bg-[#2A1712]/85"
            >
              <Ionicons name="flame" size={36} color="#FF9A3D" />
            </Animated.View>
          </View>

          <Text className="mt-5 text-center text-[34px] font-black leading-[38px] text-white">
            {displayCount} Day Streak
          </Text>
          <Text className="mt-2 text-center text-[14px] font-semibold text-[#B8C0D4]">
            Consistency builds champions.
          </Text>

          <View className="mt-5 rounded-[18px] border border-white/10 bg-black/24 px-3 py-3">
            <View className="flex-row items-center justify-between">
              {miniDayStates.map((item) => {
                const completed = item.type === "completed";
                const today = item.type === "today";
                return (
                  <View key={item.day} className="items-center">
                    <View
                      className={`h-6 w-6 items-center justify-center rounded-full border ${
                        completed
                          ? "border-[#FF9A3D]/85 bg-[#FF7A3D]/35"
                          : today
                          ? "border-[#FFB46E] bg-[#2A1712]"
                          : "border-white/18 bg-white/8"
                      }`}
                    >
                      {completed ? (
                        <Ionicons name="checkmark" size={12} color="#FFE0C2" />
                      ) : (
                        <View
                          className={`h-1.5 w-1.5 rounded-full ${
                            today ? "bg-[#FF9A3D]" : "bg-white/32"
                          }`}
                        />
                      )}
                    </View>
                    <Text className="mt-1 text-[9px] font-semibold text-[#9AA4BD]">
                      {item.day}
                    </Text>
                  </View>
                );
              })}
            </View>

            <View className="mt-3 h-[5px] overflow-hidden rounded-full bg-white/10">
              <Animated.View
                style={progressFillStyle}
                className="h-[5px] rounded-full bg-[#FF9A3D]"
              />
            </View>
          </View>

          <PressableScale
            onPress={closeWithMerge}
            activeScale={0.96}
            className="mt-6 overflow-hidden rounded-[999px] border border-white/15 bg-[#151A24] px-5 py-4"
          >
            <Text className="text-center text-[15px] font-black text-white">
              Continue
            </Text>
          </PressableScale>
        </Animated.View>
      </View>
    </Modal>
  );
}
