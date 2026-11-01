import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text } from "react-native";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";

type SuccessRouteParams = {
  rewardCoins?: number;
  countdownSeconds?: number;
  onCollectCoins?: () => Promise<void> | void;
  onContinueQuiz?: () => Promise<void> | void;
  showInterstitialAdAndWait?: () => Promise<boolean> | boolean;
};

type Props = {
  navigation: any;
  route: {
    params?: SuccessRouteParams;
  };
};

type CountdownProps = {
  start: boolean;
  initialSeconds?: number;
  onComplete?: () => void;
};

type AnimatedRewardChipProps = {
  targetValue: number;
  start: boolean;
};

const SUCCESS_HEADLINES = [
  "Nice work!",
  "Brilliant!",
  "Great job!",
  "Correct!",
];
const NEXT_QUESTION_WAIT_SECONDS = 8;

const NextQuestionCountdown = React.memo(function NextQuestionCountdown({
  start,
  initialSeconds = NEXT_QUESTION_WAIT_SECONDS,
  onComplete,
}: CountdownProps) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!start) return;

    let active = true;
    setRemaining(initialSeconds);

    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const tick = (secondsLeft: number) => {
      if (!active) return;
      setRemaining(secondsLeft);

      if (secondsLeft <= 0) {
        onComplete?.();
        return;
      }

      clearTimer();
      timeoutRef.current = setTimeout(() => {
        tick(secondsLeft - 1);
      }, 1000);
    };

    tick(initialSeconds);

    return () => {
      active = false;
      clearTimer();
    };
  }, [initialSeconds, onComplete, start]);

  if (!start) return null;

  return (
    <Text className="mt-4 text-[14px] font-sg-semibold text-[#B5C6BB]">
      Next question in {remaining}...
    </Text>
  );
});

const AnimatedRewardChip = React.memo(function AnimatedRewardChip({
  targetValue,
  start,
}: AnimatedRewardChipProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const shimmerX = useSharedValue(-1);
  const chipScale = useSharedValue(1);
  const isDailyCapReached = targetValue <= 0;

  useEffect(() => {
    if (!start) return;
    if (isDailyCapReached) {
      setDisplayValue(0);
      shimmerX.value = -1;
      chipScale.value = 1;
      return;
    }

    let active = true;
    let frameTimer: ReturnType<typeof setTimeout> | null = null;
    const durationMs = 460;
    const startedAt = Date.now();
    setDisplayValue(0);

    const tick = () => {
      if (!active) return;
      const elapsed = Date.now() - startedAt;
      const progress = Math.min(1, elapsed / durationMs);
      const nextValue = Math.round(targetValue * progress);
      setDisplayValue((prev) => (prev === nextValue ? prev : nextValue));

      if (progress < 1) {
        frameTimer = setTimeout(tick, 16);
        return;
      }

      chipScale.value = withSequence(
        withSpring(1.06, { damping: 10, stiffness: 240, mass: 0.55 }),
        withSpring(1, { damping: 12, stiffness: 240, mass: 0.6 })
      );
      shimmerX.value = -1;
      shimmerX.value = withTiming(1, {
        duration: 720,
        easing: Easing.out(Easing.cubic),
      });
    };

    tick();

    return () => {
      active = false;
      if (frameTimer) {
        clearTimeout(frameTimer);
      }
    };
  }, [chipScale, isDailyCapReached, shimmerX, start, targetValue]);

  const chipAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chipScale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: shimmerX.value <= -0.95 ? 0 : 0.36,
    transform: [
      { translateX: interpolate(shimmerX.value, [-1, 1], [-160, 210]) },
      { skewX: "-18deg" },
    ],
  }));

  if (isDailyCapReached) {
    return (
      <Animated.View
        style={chipAnimatedStyle}
        className="mt-5 self-start rounded-[14px] bg-[#1C4336] px-4 py-2.5"
      >
        <Text className="text-[13px] font-sg-bold text-[#F4EFE2]">
          Daily quiz coin limit reached
        </Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={chipAnimatedStyle}
      className="relative mt-5 flex-row items-center self-start overflow-hidden rounded-[14px] bg-[#F2B632] px-4 py-2.5"
    >
      <Animated.View
        pointerEvents="none"
        style={shimmerStyle}
        className="absolute bottom-[-16px] top-[-16px] w-14 bg-[#FFFCF5]"
      />
      <Text className="text-[26px] font-sg-display text-[#14342A]">
        +{displayValue} coins
      </Text>
    </Animated.View>
  );
});

export default function SuccessScreen({ navigation, route }: Props) {
    const [countdownStarted, setCountdownStarted] = useState(false);
  const [showRewardChip, setShowRewardChip] = useState(false);
  const hasStartedFlowRef = useRef(false);
  const isMountedRef = useRef(true);
  const autoReturnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const entryHapticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(10);
  const cardScale = useSharedValue(0.96);
  const iconOpacity = useSharedValue(0);
  const iconTranslateY = useSharedValue(8);
  const iconRingScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(10);
  const chipOpacity = useSharedValue(0);
  const chipTranslateY = useSharedValue(10);

  const rewardCoins = Math.max(0, Number(route?.params?.rewardCoins ?? 1));
  const isDailyCapReached = rewardCoins <= 0;
  const countdownSeconds = Math.max(
    0,
    Number(
      route?.params?.countdownSeconds ?? NEXT_QUESTION_WAIT_SECONDS
    ) || 0
  );
  const successHeadline = useMemo(
    () =>
      SUCCESS_HEADLINES[Math.floor(Math.random() * SUCCESS_HEADLINES.length)],
    []
  );

  useEffect(() => {
    cardOpacity.value = withTiming(1, { duration: 200 });
    cardTranslateY.value = withTiming(0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
    cardScale.value = withSpring(1, {
      damping: 14,
      stiffness: 240,
      mass: 0.7,
    });

    iconOpacity.value = withDelay(80, withTiming(1, { duration: 180 }));
    iconTranslateY.value = withDelay(
      80,
      withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) })
    );

    textOpacity.value = withDelay(150, withTiming(1, { duration: 180 }));
    textTranslateY.value = withDelay(
      150,
      withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) })
    );

    chipOpacity.value = withDelay(220, withTiming(1, { duration: 180 }));
    chipTranslateY.value = withDelay(
      220,
      withTiming(0, { duration: 220, easing: Easing.out(Easing.cubic) })
    );
    iconRingScale.value = withDelay(
      240,
      withSequence(
        withTiming(1.05, { duration: 170, easing: Easing.out(Easing.quad) }),
        withTiming(1, { duration: 190, easing: Easing.inOut(Easing.quad) })
      )
    );

    const chipTimer = setTimeout(() => {
      setShowRewardChip(true);
    }, 260);

    entryHapticTimeoutRef.current = setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }, 180);

    return () => {
      clearTimeout(chipTimer);
      if (entryHapticTimeoutRef.current) {
        clearTimeout(entryHapticTimeoutRef.current);
        entryHapticTimeoutRef.current = null;
      }
    };
  }, [
    cardOpacity,
    cardScale,
    cardTranslateY,
    chipOpacity,
    chipTranslateY,
    iconOpacity,
    iconRingScale,
    iconTranslateY,
    textOpacity,
    textTranslateY,
  ]);

  const finishQuizFlow = useCallback(async () => {
    if (!isMountedRef.current) return;

    if (typeof route?.params?.onContinueQuiz === "function") {
      await route.params.onContinueQuiz();
    }

    if (!isMountedRef.current) return;

    if (navigation?.canGoBack?.()) {
      navigation.goBack();
    } else {
      navigation.replace("Quiz");
    }
  }, [navigation, route?.params]);

  const badgeStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ translateY: iconTranslateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  const chipStyle = useAnimatedStyle(() => ({
    opacity: chipOpacity.value,
    transform: [{ translateY: chipTranslateY.value }],
  }));

  const iconRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconRingScale.value }],
  }));

  const startSuccessFlow = useCallback(async () => {
    if (hasStartedFlowRef.current) return;
    hasStartedFlowRef.current = true;

    try {
      if (typeof route?.params?.onCollectCoins === "function") {
        await route.params.onCollectCoins();
      }

      if (typeof route?.params?.showInterstitialAdAndWait === "function") {
        await route.params.showInterstitialAdAndWait();
      }
    } catch (error) {
      console.log("Success flow failed:", error);
    } finally {
      if (!isMountedRef.current) return;
      if (countdownSeconds <= 0) {
        if (autoReturnTimeoutRef.current) {
          clearTimeout(autoReturnTimeoutRef.current);
        }
        autoReturnTimeoutRef.current = setTimeout(() => {
          if (!isMountedRef.current) return;
          finishQuizFlow().catch((error) => {
            console.log("Continue quiz flow failed:", error);
          });
        }, 650);
        return;
      }
      setCountdownStarted(true);
    }
  }, [countdownSeconds, finishQuizFlow, route?.params]);

  useEffect(() => {
    isMountedRef.current = true;
    startSuccessFlow();

    return () => {
      isMountedRef.current = false;
      if (autoReturnTimeoutRef.current) {
        clearTimeout(autoReturnTimeoutRef.current);
        autoReturnTimeoutRef.current = null;
      }
    };
  }, [startSuccessFlow]);

  return (
    <ScreenLayoutContainer variant="board" contentClassName="px-5" scroll={false}>
      <View className="flex-1 justify-center">
        <Animated.View
          style={[badgeStyle, iconRingStyle, { alignSelf: "flex-start" }]}
          className="h-[84px] w-[84px] items-center justify-center rounded-[26px] bg-[#8FD9B4]"
        >
          <Ionicons name="checkmark" size={52} color="#14342A" />
        </Animated.View>

        <Animated.View style={textStyle}>
          <Text className="mt-5 text-[56px] font-sg-display leading-[60px] tracking-[-1.4px] text-[#F4EFE2]">
            {successHeadline}
          </Text>
        </Animated.View>

        <Animated.View style={chipStyle}>
          <AnimatedRewardChip start={showRewardChip} targetValue={rewardCoins} />
        </Animated.View>

        <Animated.View style={textStyle}>
          <NextQuestionCountdown
            start={countdownStarted}
            initialSeconds={countdownSeconds}
            onComplete={() => {
              finishQuizFlow().catch((error) => {
                console.log("Continue quiz flow failed:", error);
              });
            }}
          />
        </Animated.View>
      </View>
    </ScreenLayoutContainer>
  );
}
