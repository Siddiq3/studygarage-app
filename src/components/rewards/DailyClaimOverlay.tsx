import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, Modal, Text, UIManager, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  RadialGradient as SvgRadialGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import PressableScale from "../ui/PressableScale";
import Coin from "./Coin";
import FullScreenPaperBlast from "../ui/FullScreenPaperBlast";

const coinImage = require("../../../assets/coin.png");
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ENABLE_DAILY_CLAIM_BLUR = false;
const BlurView = ENABLE_DAILY_CLAIM_BLUR
  ? (() => {
      try {
        return require("expo-blur").BlurView;
      } catch (_error) {
        return null;
      }
    })()
  : null;

const blurNativeAvailable = ENABLE_DAILY_CLAIM_BLUR
  ? (() => {
      try {
        const getConfig = UIManager?.getViewManagerConfig;
        if (typeof getConfig !== "function") return false;
        return Boolean(
          getConfig("ViewManagerAdapter_ExpoBlurView") ||
            getConfig("RCTViewManagerAdapter_ExpoBlurView") ||
            getConfig("ExpoBlurView")
        );
      } catch (_error) {
        return false;
      }
    })()
  : false;

const ResolvedBlurView = BlurView && blurNativeAvailable ? BlurView : null;

type Props = {
  visible: boolean;
  coinsToGive: number;
  claimedToday: boolean;
  onClaim: () => void | Promise<void>;
  onDismiss: () => void;
  disabledReason?: string;
  isClaiming?: boolean;
  claimButtonRef?: React.RefObject<View | null>;
  showStreakFlame?: boolean;
  streakCount?: number;
  onRevealSound?: () => void;
  onClaimSound?: () => void;
};

type BurstParticle = {
  id: string;
  endX: number;
  endY: number;
  size: number;
  delay: number;
};

function createSeededRandom(seed: number) {
  let current = seed % 2147483647;
  if (current <= 0) current += 2147483646;
  return () => {
    current = (current * 16807) % 2147483647;
    return (current - 1) / 2147483646;
  };
}

const burstParticles: BurstParticle[] = (() => {
  const rand = createSeededRandom(97);
  const items: BurstParticle[] = [];
  const waveStarts = [0, 450, 900];
  const perWave = 6;
  waveStarts.forEach((waveStart, waveIndex) => {
    for (let index = 0; index < perWave; index += 1) {
      const totalIndex = waveIndex * perWave + index;
      const angle =
        (Math.PI * 2 * index) / perWave +
        (-0.2 + rand() * 0.4) +
        waveIndex * 0.1;
      const radius = 56 + rand() * 42;
      items.push({
        id: `p${totalIndex}`,
        endX: Math.cos(angle) * radius,
        endY: Math.sin(angle) * radius - 64,
        size: 14 + Math.round(rand() * 7),
        delay: waveStart + index * 34 + rand() * 12,
      });
    }
  });
  return items;
})();

const revealParticles: BurstParticle[] = [
  { id: "r0", endX: -46, endY: -56, size: 10, delay: 0 },
  { id: "r1", endX: -24, endY: -68, size: 11, delay: 20 },
  { id: "r2", endX: 18, endY: -70, size: 11, delay: 12 },
  { id: "r3", endX: 42, endY: -54, size: 10, delay: 26 },
];

export default function DailyClaimOverlay({
  visible,
  coinsToGive,
  claimedToday,
  onClaim,
  onDismiss,
  disabledReason,
  isClaiming = false,
  claimButtonRef,
  showStreakFlame = false,
  streakCount = 0,
  onRevealSound,
  onClaimSound,
}: Props) {
  const claimTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealHapticTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [displayCoins, setDisplayCoins] = useState(0);
  const [burstSeed, setBurstSeed] = useState(0);
  const [revealSeed, setRevealSeed] = useState(0);
  const [paperSeed, setPaperSeed] = useState(1);
  const [paperBlastToken, setPaperBlastToken] = useState(0);
  const [isMounted, setIsMounted] = useState(visible);

  const scrim = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.9);
  const cardTranslateY = useSharedValue(20);
  const rewardScale = useSharedValue(1);
  const countProgress = useSharedValue(0);
  const numberShimmerX = useSharedValue(-1.2);
  const buttonGlow = useSharedValue(0.62);
  const claimLiftY = useSharedValue(0);
  const claimShimmerX = useSharedValue(-1.2);
  const claimShimmerOpacity = useSharedValue(0);
  const haloScale = useSharedValue(1);
  const haloOpacity = useSharedValue(0.6);
  const flameScale = useSharedValue(1);
  const flameGlowOpacity = useSharedValue(0.22);

  const isLocked = useMemo(
    () => Boolean(disabledReason) && !claimedToday,
    [claimedToday, disabledReason]
  );
  const claimDisabled = claimedToday || isLocked || isClaiming;

  useAnimatedReaction(
    () => countProgress.value,
    (progress) => {
      runOnJS(setDisplayCoins)(Math.round(coinsToGive * progress));
    },
    [coinsToGive]
  );

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (revealHapticTimeoutRef.current) {
        clearTimeout(revealHapticTimeoutRef.current);
        revealHapticTimeoutRef.current = null;
      }

      scrim.value = withTiming(1, { duration: 180 });
      cardOpacity.value = withTiming(1, { duration: 180 });
      cardTranslateY.value = withSpring(0, {
        damping: 16,
        stiffness: 195,
        mass: 0.76,
      });
      cardScale.value = withSpring(1, {
        damping: 15,
        stiffness: 188,
        mass: 0.8,
      });
      onRevealSound?.();

      setDisplayCoins(0);
      setRevealSeed((prev) => prev + 1);
      countProgress.value = 0;
      countProgress.value = withTiming(
        1,
        { duration: 760, easing: Easing.out(Easing.cubic) },
        (finished) => {
          if (finished) {
            rewardScale.value = withSequence(
              withTiming(1.06, { duration: 120 }),
              withTiming(1, { duration: 140 })
            );

            if (showStreakFlame) {
              flameScale.value = withSequence(
                withTiming(1.14, {
                  duration: 160,
                  easing: Easing.out(Easing.cubic),
                }),
                withTiming(1, {
                  duration: 180,
                  easing: Easing.out(Easing.cubic),
                })
              );
              flameGlowOpacity.value = withSequence(
                withTiming(0.5, { duration: 160 }),
                withTiming(0.24, { duration: 220 })
              );
            }
          }
        }
      );

      numberShimmerX.value = -1.2;
      numberShimmerX.value = withRepeat(
        withTiming(1.2, { duration: 1200, easing: Easing.linear }),
        2,
        false
      );

      if (!claimDisabled) {
        buttonGlow.value = withRepeat(
          withSequence(
            withTiming(1, {
              duration: 1200,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(0.62, {
              duration: 1200,
              easing: Easing.inOut(Easing.quad),
            })
          ),
          3,
          false
        );
        claimLiftY.value = withRepeat(
          withSequence(
            withTiming(-1.5, {
              duration: 760,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(0, { duration: 760, easing: Easing.inOut(Easing.quad) })
          ),
          5,
          false
        );
        claimShimmerOpacity.value = withTiming(0.34, { duration: 220 });
        claimShimmerX.value = -1.2;
        claimShimmerX.value = withRepeat(
          withSequence(
            withTiming(1.2, {
              duration: 1280,
              easing: Easing.out(Easing.cubic),
            }),
            withTiming(-1.2, { duration: 0 })
          ),
          5,
          false
        );
      } else {
        buttonGlow.value = withTiming(0, { duration: 140 });
        claimLiftY.value = withTiming(0, { duration: 120 });
        claimShimmerOpacity.value = withTiming(0, { duration: 120 });
        claimShimmerX.value = withTiming(-1.2, { duration: 120 });
      }

      haloScale.value = withRepeat(
        withSequence(
          withTiming(1.05, {
            duration: 1250,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(1, { duration: 1250, easing: Easing.inOut(Easing.quad) })
        ),
        3,
        false
      );
      haloOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, {
            duration: 1250,
            easing: Easing.inOut(Easing.quad),
          }),
          withTiming(0.6, { duration: 1250, easing: Easing.inOut(Easing.quad) })
        ),
        3,
        false
      );

      if (showStreakFlame) {
        flameScale.value = withRepeat(
          withSequence(
            withTiming(1.03, {
              duration: 920,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(1, { duration: 920, easing: Easing.inOut(Easing.quad) })
          ),
          4,
          false
        );
        flameGlowOpacity.value = withRepeat(
          withSequence(
            withTiming(0.34, {
              duration: 920,
              easing: Easing.inOut(Easing.quad),
            }),
            withTiming(0.22, {
              duration: 920,
              easing: Easing.inOut(Easing.quad),
            })
          ),
          4,
          false
        );
      } else {
        flameScale.value = 1;
        flameGlowOpacity.value = 0.2;
      }

      revealHapticTimeoutRef.current = setTimeout(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      }, 120);
    } else {
      scrim.value = withTiming(0, { duration: 180 });
      cardOpacity.value = withTiming(0, { duration: 160 });
      cardTranslateY.value = withTiming(14, { duration: 180 });
      cardScale.value = withTiming(0.97, { duration: 180 });
      buttonGlow.value = withTiming(0, { duration: 120 });
      claimLiftY.value = withTiming(0, { duration: 120 });
      claimShimmerOpacity.value = withTiming(0, { duration: 120 });
      claimShimmerX.value = withTiming(-1.2, { duration: 120 });
      numberShimmerX.value = withTiming(-1.2, { duration: 100 });
      haloScale.value = withTiming(1, { duration: 120 });
      haloOpacity.value = withTiming(0.6, { duration: 120 });
      flameScale.value = withTiming(1, { duration: 120 });
      flameGlowOpacity.value = withTiming(0.22, { duration: 120 });

      closeTimeoutRef.current = setTimeout(() => {
        setIsMounted(false);
      }, 220);
    }
  }, [
    buttonGlow,
    cardOpacity,
    cardScale,
    cardTranslateY,
    claimDisabled,
    claimLiftY,
    claimShimmerOpacity,
    claimShimmerX,
    countProgress,
    flameGlowOpacity,
    flameScale,
    haloOpacity,
    haloScale,
    numberShimmerX,
    onRevealSound,
    rewardScale,
    scrim,
    showStreakFlame,
    visible,
  ]);

  useEffect(
    () => () => {
      if (claimTimeoutRef.current) {
        clearTimeout(claimTimeoutRef.current);
        claimTimeoutRef.current = null;
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (revealHapticTimeoutRef.current) {
        clearTimeout(revealHapticTimeoutRef.current);
        revealHapticTimeoutRef.current = null;
      }
      cancelAnimation(scrim);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(rewardScale);
      cancelAnimation(countProgress);
      cancelAnimation(numberShimmerX);
      cancelAnimation(buttonGlow);
      cancelAnimation(claimLiftY);
      cancelAnimation(claimShimmerOpacity);
      cancelAnimation(claimShimmerX);
      cancelAnimation(haloScale);
      cancelAnimation(haloOpacity);
      cancelAnimation(flameScale);
      cancelAnimation(flameGlowOpacity);
    },
    [
      buttonGlow,
      cardOpacity,
      cardScale,
      cardTranslateY,
      claimLiftY,
      claimShimmerOpacity,
      claimShimmerX,
      countProgress,
      flameGlowOpacity,
      flameScale,
      haloOpacity,
      haloScale,
      numberShimmerX,
      rewardScale,
      scrim,
    ]
  );

  useEffect(() => {
    if (!visible) return;

    if (isClaiming) {
      cardScale.value = withTiming(0.9, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
      cardTranslateY.value = withTiming(24, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
      cardOpacity.value = withTiming(0, { duration: 180 });
      buttonGlow.value = withTiming(0, { duration: 120 });
      claimLiftY.value = withTiming(0, { duration: 120 });
      claimShimmerOpacity.value = withTiming(0, { duration: 120 });
    }
  }, [
    buttonGlow,
    cardOpacity,
    cardScale,
    cardTranslateY,
    claimLiftY,
    claimShimmerOpacity,
    isClaiming,
    visible,
  ]);

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrim.value,
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const rewardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rewardScale.value }],
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: 0.6,
    transform: [{ translateX: numberShimmerX.value * 210 }],
  }));

  const claimGlowStyle = useAnimatedStyle(() => ({
    opacity: 0.62 + buttonGlow.value * 0.38,
  }));

  const claimButtonMotionStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: claimLiftY.value }],
  }));

  const claimButtonShineStyle = useAnimatedStyle(() => ({
    opacity: claimShimmerOpacity.value,
    transform: [{ translateX: claimShimmerX.value * 220 }],
  }));

  const haloStyle = useAnimatedStyle(() => ({
    opacity: haloOpacity.value,
    transform: [{ scale: haloScale.value }],
  }));

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
  }));

  const flameGlowStyle = useAnimatedStyle(() => ({
    opacity: flameGlowOpacity.value,
  }));

  const onClaimPress = useCallback(() => {
    if (claimDisabled) {
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onClaimSound?.();
    setPaperSeed((current) => current + 1);
    setPaperBlastToken((current) => current + 1);
    setBurstSeed((current) => current + 1);

    if (claimTimeoutRef.current) {
      clearTimeout(claimTimeoutRef.current);
    }

    claimTimeoutRef.current = setTimeout(() => {
      onClaim();
    }, 260);
  }, [claimDisabled, onClaim, onClaimSound]);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="none"
      visible={isMounted}
      statusBarTranslucent
      hardwareAccelerated
      onRequestClose={onDismiss}
    >
      <View
        className="flex-1"
        pointerEvents={visible || isClaiming ? "auto" : "none"}
      >
        <Animated.View style={scrimStyle} className="absolute inset-0">
          {ResolvedBlurView ? (
            <ResolvedBlurView
              intensity={86}
              tint="dark"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          ) : null}
          <View className="absolute inset-0 bg-black/60" />
        </Animated.View>

        <View className="flex-1 items-center justify-center px-5">
          <Animated.View
            style={cardStyle}
            className="w-full max-w-[392px] overflow-hidden rounded-[28px] border border-white/14 bg-[#141A26] px-5 pb-6 pt-5"
          >
            <LinearGradient
              colors={[
                "rgba(255,215,0,0.10)",
                "rgba(143,116,255,0.08)",
                "rgba(11,12,16,0)",
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="pointer-events-none absolute left-[-10%] top-[-30%] h-[260px] w-[120%] rounded-full"
            />

            <View className="flex-row items-start justify-between">
              <View className="flex-1 pr-3">
                <View className="self-start rounded-full border border-[#FFD700]/35 bg-[#FFD700]/12 px-2.5 py-1">
                  <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#FFD700]">
                    Daily Claim
                  </Text>
                </View>
                <View className="mt-2 flex-row items-center">
                  <Text className="text-[24px] font-black leading-[28px] text-[#F7FAFF]">
                    Daily Claim
                  </Text>
                  {showStreakFlame ? (
                    <Animated.View style={flameStyle} className="ml-2">
                      <View className="relative">
                        <Animated.View
                          pointerEvents="none"
                          style={flameGlowStyle}
                          className="absolute -inset-[2px] rounded-full border border-[#FF8A3D]/45 bg-[#FF8A3D]/14"
                        />
                        <View className="flex-row items-center rounded-full border border-[#FF8A3D]/32 bg-[#2E1F14]/70 px-2 py-0.5">
                          <Ionicons name="flame" size={12} color="#FF9D4B" />
                          <Text className="ml-1 text-[10px] font-black text-[#FFCAA2]">
                            {streakCount}d
                          </Text>
                        </View>
                      </View>
                    </Animated.View>
                  ) : null}
                </View>
                <Text className="mt-1 text-[14px] font-semibold text-[#C9D2E8]">
                  Claim your bonus coins for today
                </Text>
              </View>
              <PressableScale
                onPress={onDismiss}
                activeScale={0.96}
                disabled={isClaiming}
                className="h-8 w-8 items-center justify-center rounded-full border border-white/14 bg-[#1D2432]"
              >
                <Ionicons name="close" size={14} color="#D7DEF0" />
              </PressableScale>
            </View>

            <Animated.View style={rewardStyle} className="mt-6 items-center">
              <View className="relative h-[96px] w-[250px] items-center justify-center overflow-hidden">
                <Animated.View
                  pointerEvents="none"
                  style={haloStyle}
                  className="absolute"
                >
                  <RewardHalo />
                </Animated.View>
                <GoldGradientValue value={displayCoins} />
                <Animated.View
                  pointerEvents="none"
                  style={shimmerStyle}
                  className="absolute top-[8px] h-[74px] w-[56px] rotate-[12deg]"
                >
                  <LinearGradient
                    colors={[
                      "rgba(255,255,255,0)",
                      "rgba(255,255,255,0.54)",
                      "rgba(255,255,255,0)",
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    className="h-full w-full"
                  />
                </Animated.View>
              </View>
              <View className="mt-[-4px] flex-row items-center">
                <Text className="text-[17px] font-extrabold text-[#FFE7A6]">
                  Coins
                </Text>
              </View>
              <View className="mt-2 flex-row items-center rounded-full border border-[#FFD700]/30 bg-[#2D2410]/60 px-3 py-1.5">
                <Coin size={16} compact />
                <Text className="ml-1.5 text-[12px] font-bold text-[#FFD700]">
                  Daily reward unlocked
                </Text>
              </View>
            </Animated.View>

            <View className="mt-7">
              <View ref={claimButtonRef} collapsable={false}>
                <Animated.View
                  style={[
                    claimButtonMotionStyle,
                    !claimDisabled
                      ? {
                          shadowColor: "#D4B061",
                          shadowOffset: { width: 0, height: 5 },
                          shadowOpacity: 0.32,
                          shadowRadius: 10,
                          elevation: 7,
                        }
                      : null,
                    !claimDisabled ? claimGlowStyle : null,
                  ]}
                >
                  <PressableScale
                    onPress={onClaimPress}
                    activeScale={0.96}
                    disabled={claimDisabled}
                    className={`overflow-hidden rounded-[999px] border ${
                      claimDisabled
                        ? "border-white/14 bg-[#1A2130] opacity-60"
                        : "border-[#FFD700]/45"
                    }`}
                  >
                    {claimDisabled ? (
                      <View className="px-4 py-4">
                        <View className="flex-row items-center justify-center">
                          <Ionicons
                            name={
                              claimedToday
                                ? "checkmark-circle"
                                : isLocked
                                ? "lock-closed"
                                : "sparkles"
                            }
                            size={16}
                            color="#B8C0D4"
                          />
                          <Text className="ml-2 text-[14px] font-black text-white">
                            {claimedToday
                              ? "Claimed"
                              : isLocked
                              ? "Locked"
                              : "Claim Now"}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <LinearGradient
                        colors={["#2D2410", "#3A2D12", "#241A0A"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="px-4 py-4"
                      >
                        <Animated.View
                          pointerEvents="none"
                          style={claimButtonShineStyle}
                          className="absolute left-0 top-0 h-full w-[74px] rotate-[14deg]"
                        >
                          <LinearGradient
                            colors={[
                              "rgba(255,255,255,0)",
                              "rgba(255,255,255,0.34)",
                              "rgba(255,255,255,0)",
                            ]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            className="h-full w-full"
                          />
                        </Animated.View>
                        <View className="flex-row items-center justify-center">
                          <Ionicons name="sparkles" size={16} color="#FFD700" />
                          <Text className="ml-2 text-[14px] font-black text-white">
                            Claim Now
                          </Text>
                        </View>
                      </LinearGradient>
                    )}
                  </PressableScale>
                </Animated.View>
              </View>
              {!claimDisabled ? (
                <PressableScale
                  onPress={onDismiss}
                  activeScale={0.96}
                  disabled={isClaiming}
                  className="mt-3 self-center rounded-full border border-white/14 px-4 py-2"
                >
                  <Text className="text-[12px] font-bold text-[#C8D2E8]">
                    Not now
                  </Text>
                </PressableScale>
              ) : null}
              {isLocked ? (
                <Text className="mt-2 text-center text-[11px] font-semibold text-[#98A3BF]">
                  Check-in resets tomorrow
                </Text>
              ) : null}
            </View>

            <Text className="mt-3 text-center text-[11px] font-semibold text-[#8F9AB5]">
              Tap “Claim Now” to continue. Background tap won’t dismiss.
            </Text>

            <CoinRevealFloat seed={revealSeed} />
            <AmbientParticles active={visible && !isClaiming} />
            <CoinBurst seed={burstSeed} />
          </Animated.View>
        </View>

        <FullScreenPaperBlast
          visible={isMounted}
          triggerToken={paperBlastToken}
          seed={paperSeed}
          waveDelays={[80, 920, 1760]}
          piecesPerWave={48}
          zIndex={92}
        />
      </View>
    </Modal>
  );
}

function RewardHalo() {
  return (
    <Svg width={216} height={216} viewBox="0 0 216 216">
      <Defs>
        <SvgRadialGradient id="haloGradient" cx="50%" cy="50%" r="50%">
          <Stop offset="0%" stopColor="rgba(255,218,120,0.42)" />
          <Stop offset="42%" stopColor="rgba(255,198,78,0.24)" />
          <Stop offset="78%" stopColor="rgba(255,173,46,0.09)" />
          <Stop offset="100%" stopColor="rgba(255,173,46,0)" />
        </SvgRadialGradient>
      </Defs>
      <Circle cx="108" cy="108" r="96" fill="url(#haloGradient)" />
    </Svg>
  );
}

function GoldGradientValue({ value }: { value: number }) {
  const label = `+${value}`;
  const width = Math.max(196, label.length * 42);

  return (
    <Svg width={width} height={86} viewBox={`0 0 ${width} 86`}>
      <Defs>
        <SvgLinearGradient id="rewardGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor="#FFF4C8" />
          <Stop offset="38%" stopColor="#FFD700" />
          <Stop offset="100%" stopColor="#C18E26" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        x={8}
        y={68}
        fill="url(#rewardGold)"
        fontSize={64}
        fontWeight="900"
        letterSpacing={-1}
      >
        {label}
      </SvgText>
    </Svg>
  );
}

type AmbientParticleMeta = {
  id: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

const ambientParticlesMeta: AmbientParticleMeta[] = [
  { id: "a0", left: 20, size: 5, duration: 3800, delay: 0, drift: 6 },
  { id: "a1", left: 58, size: 4, duration: 4200, delay: 360, drift: 8 },
  { id: "a2", left: 96, size: 5, duration: 4600, delay: 640, drift: 7 },
  { id: "a3", left: 132, size: 4, duration: 4100, delay: 880, drift: 6 },
  { id: "a4", left: 174, size: 6, duration: 4800, delay: 420, drift: 9 },
  { id: "a5", left: 214, size: 5, duration: 4400, delay: 1120, drift: 8 },
  { id: "a6", left: 248, size: 4, duration: 4300, delay: 740, drift: 7 },
  { id: "a7", left: 284, size: 5, duration: 4700, delay: 1260, drift: 8 },
];

function AmbientParticles({ active }: { active: boolean }) {
  return (
    <View pointerEvents="none" className="absolute inset-0">
      {ambientParticlesMeta.map((meta) => (
        <AmbientParticle key={meta.id} meta={meta} active={active} />
      ))}
    </View>
  );
}

function AmbientParticle({
  meta,
  active,
}: {
  meta: AmbientParticleMeta;
  active: boolean;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!active) {
      progress.value = withTiming(0, { duration: 150 });
      return;
    }

    progress.value = 0;
    progress.value = withRepeat(
      withSequence(
        withDelay(
          meta.delay,
          withTiming(1, { duration: meta.duration, easing: Easing.linear })
        ),
        withTiming(0, { duration: 0 })
      ),
      2,
      false
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [active, meta.delay, meta.duration, progress]);

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const driftX = Math.sin(p * Math.PI * 2) * meta.drift;
    const op = p <= 0.5 ? p * 0.96 : (1 - p) * 0.96;
    return {
      opacity: 0.16 + Math.max(0, op) * 0.34,
      transform: [{ translateX: driftX }, { translateY: 88 - p * 190 }],
    };
  });

  return (
    <Animated.View
      style={[
        style,
        {
          position: "absolute",
          left: meta.left,
          bottom: 18,
          width: meta.size,
          height: meta.size,
          borderRadius: meta.size / 2,
          backgroundColor: "#FFD77A",
        },
      ]}
    />
  );
}

function CoinRevealFloat({ seed }: { seed: number }) {
  return (
    <View pointerEvents="none" className="absolute left-1/2 top-[184px]">
      {revealParticles.map((meta) => (
        <RevealCoin key={`${meta.id}-${seed}`} seed={seed} meta={meta} />
      ))}
    </View>
  );
}

function RevealCoin({ seed, meta }: { seed: number; meta: BurstParticle }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!seed) {
      progress.value = 0;
      return;
    }

    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 460 + meta.delay,
      easing: Easing.out(Easing.cubic),
    });

    return () => {
      cancelAnimation(progress);
    };
  }, [meta.delay, progress, seed]);

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      opacity: 0.85 - p * 0.85,
      transform: [
        { translateX: meta.endX * p },
        { translateY: meta.endY * p },
        { scale: 0.88 + (1 - p) * 0.18 },
      ],
    };
  });

  return (
    <Animated.View style={style} className="absolute left-0 top-0">
      <Animated.Image
        source={coinImage}
        resizeMode="contain"
        style={{ width: meta.size, height: meta.size }}
      />
    </Animated.View>
  );
}

function CoinBurst({ seed }: { seed: number }) {
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", left: "50%", top: "56%" }}
    >
      {burstParticles.map((meta) => (
        <BurstCoin key={`${meta.id}-${seed}`} seed={seed} meta={meta} />
      ))}
    </View>
  );
}

function BurstCoin({ seed, meta }: { seed: number; meta: BurstParticle }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!seed) {
      progress.value = 0;
      return;
    }

    progress.value = 0;
    progress.value = withDelay(
      meta.delay,
      withTiming(1, {
        duration: 820,
        easing: Easing.out(Easing.cubic),
      })
    );

    return () => {
      cancelAnimation(progress);
    };
  }, [meta.delay, progress, seed]);

  const style = useAnimatedStyle(() => {
    const p = progress.value;
    return {
      opacity: 1 - p,
      transform: [
        { translateX: meta.endX * p },
        { translateY: meta.endY * p },
        { scale: 1 - 0.35 * p },
      ],
    };
  });

  return (
    <Animated.View style={style} className="absolute left-0 top-0">
      <Animated.Image
        source={coinImage}
        resizeMode="contain"
        style={{ width: meta.size, height: meta.size }}
      />
    </Animated.View>
  );
}
