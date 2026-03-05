import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import * as Haptics from "expo-haptics";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
} from "react-native-reanimated";
import GlowBackground from "../../components/rewards/GlowBackground";
import CoinDropAnimation from "../../components/rewards/CoinDropAnimation";
import CountUpNumber from "../../components/rewards/CountUpNumber";
import WalletPill from "../../components/rewards/WalletPill";
import PrimaryCTAButton from "../../components/rewards/PrimaryCTAButton";
import { useFirstInstallReward } from "../../services/rewards/useFirstInstallReward";
import useAppSound from "../../hooks/useAppSound";
import ShimmerSkeleton from "../../components/ui/ShimmerSkeleton";

export default function WelcomeRewardScreen({ navigation, route, onContinue }) {
  const insets = useSafeAreaInsets();

  const {
    isReady,
    shouldShowWelcomeReward,
    welcomeRewardPayload,
    completeWelcomeReward,
  } = useFirstInstallReward();
  const { playSound } = useAppSound();

  const hasRewardPersistedRef = useRef(false);
  const [startCount, setStartCount] = useState(false);
  const [startFly, setStartFly] = useState(false);
  const [showWelcomeBurst, setShowWelcomeBurst] = useState(false);
  const [showReferralBurst, setShowReferralBurst] = useState(false);
  const [burstToken, setBurstToken] = useState(0);
  const [walletPopToken, setWalletPopToken] = useState(0);
  const [walletDeltaToken, setWalletDeltaToken] = useState(0);
  const [showClaimed, setShowClaimed] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const tiltSensor = useAnimatedSensor(SensorType.ROTATION, { interval: 80 });

  const baseWelcomeCoins = welcomeRewardPayload?.baseWelcomeCoins ?? 50;
  const referralBonusCoins = welcomeRewardPayload?.referralBonusCoins ?? 0;
  const totalWelcomeCoins = welcomeRewardPayload?.totalWelcomeCoins ?? 50;

  const coinParallaxStyle = useAnimatedStyle(() => {
    const sensorValue = tiltSensor.sensor.value || {};
    const roll = sensorValue.roll || 0;
    const pitch = sensorValue.pitch || 0;
    const translateX = Math.max(-6, Math.min(6, roll * 8));
    const translateY = Math.max(-6, Math.min(6, pitch * 7));

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  const nextRouteParams = useMemo(
    () => ({
      ...(route?.params || {}),
      walletPulseOnce: true,
    }),
    [route?.params]
  );

  const persistWelcomeRewardOnce = useCallback(async () => {
    if (hasRewardPersistedRef.current) return;
    hasRewardPersistedRef.current = true;
    await completeWelcomeReward(totalWelcomeCoins);
  }, [completeWelcomeReward, totalWelcomeCoins]);

  const continueForward = useCallback(async () => {
    await persistWelcomeRewardOnce();

    if (typeof onContinue === "function") {
      onContinue();
      return;
    }

    navigation.replace("SecondPage", nextRouteParams);
  }, [navigation, nextRouteParams, onContinue, persistWelcomeRewardOnce]);

  useEffect(() => {
    if (!isReady) return;
    if (shouldShowWelcomeReward) return;
    navigation.replace("SecondPage", nextRouteParams);
  }, [isReady, navigation, nextRouteParams, shouldShowWelcomeReward]);

  useEffect(() => {
    if (!isReady || !shouldShowWelcomeReward) return;

    const welcomeBurstTimer = setTimeout(() => {
      setShowWelcomeBurst(true);
      setBurstToken((prev) => prev + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      // Sound disabled for now.
      // playSound("welcome_reward").catch(() => {});
    }, 420);

    const referralBurstTimer =
      referralBonusCoins > 0
        ? setTimeout(() => {
            setShowReferralBurst(true);
            setBurstToken((prev) => prev + 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
              () => {}
            );
          }, 980)
        : null;

    const countTimer = setTimeout(
      () => {
        setStartCount(true);
      },
      referralBonusCoins > 0 ? 1580 : 1120
    );

    const ctaTimer = setTimeout(
      () => {
        setShowCTA(true);
      },
      referralBonusCoins > 0 ? 2500 : 2040
    );

    return () => {
      clearTimeout(welcomeBurstTimer);
      if (referralBurstTimer) clearTimeout(referralBurstTimer);
      clearTimeout(countTimer);
      clearTimeout(ctaTimer);
    };
  }, [
    isReady,
    playSound,
    referralBonusCoins,
    shouldShowWelcomeReward,
  ]);

  const handleCoinArrive = useCallback(() => {
    setWalletPopToken((prev) => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    // Sound disabled for now.
    // playSound("coin_land").catch(() => {});
  }, [playSound]);

  const handleFlyComplete = useCallback(async () => {
    await persistWelcomeRewardOnce();
    setShowClaimed(true);
    setShowCTA(true);
    setWalletDeltaToken((prev) => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  }, [persistWelcomeRewardOnce]);

  const handleCounterComplete = useCallback(() => {
    setStartFly(true);
  }, []);

  const handleSkip = useCallback(() => {
    continueForward().catch(() => {});
  }, [continueForward]);

  if (!isReady) {
    return (
      <View
        className="flex-1 items-center justify-center bg-[#070A10]"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <GlowBackground />
        <View className="w-[220px]">
          <ShimmerSkeleton height={18} borderRadius={10} />
          <ShimmerSkeleton height={18} borderRadius={10} className="mt-3" />
        </View>
        <Text className="mt-3 text-[14px] font-semibold text-white/70">
          Preparing reward...
        </Text>
      </View>
    );
  }

  return (
    <View
      className="flex-1 bg-[#070A10]"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 14 }}
    >
      <GlowBackground />

      <View className="px-4">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={handleSkip}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
          >
            <Text className="text-[12px] font-bold text-white/80">Skip</Text>
          </TouchableOpacity>
          <WalletPill
            balance={totalWelcomeCoins}
            popToken={walletPopToken}
            deltaToken={walletDeltaToken}
            deltaAmount={totalWelcomeCoins}
            showClaimed={showClaimed}
          />
        </View>
      </View>

      <View className="flex-1 justify-between px-4">
        <View className="pt-4">
          <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 460 }}
            className="items-center"
          >
            <View className="relative items-center">
              <Text
                className="absolute text-center text-[38px] font-black leading-[42px] text-white/28"
                style={{ transform: [{ translateX: 2 }, { translateY: 2 }] }}
              >
                Welcome Pack
              </Text>
              <Text className="text-center text-[38px] font-black leading-[42px] tracking-[-0.6px] text-white">
                Welcome Pack
              </Text>
            </View>
            <Text className="mt-2 text-center text-[15px] font-semibold text-[#BAC4DA]">
              Your learning wallet just got a boost
            </Text>
            <View className="mt-4 flex-row flex-wrap items-center justify-center gap-2">
              <View className="rounded-full border border-[#8FA1C9]/35 bg-white/6 px-3 py-1.5">
                <Text className="text-[11px] font-bold text-[#E3EAFB]">
                  Welcome bonus +{baseWelcomeCoins}
                </Text>
              </View>
              {referralBonusCoins > 0 ? (
                <View className="rounded-full border border-[#FFD47A]/45 bg-[#2B2414]/65 px-3 py-1.5">
                  <Text className="text-[11px] font-bold text-[#FFE39A]">
                    Referral bonus +{referralBonusCoins}
                  </Text>
                </View>
              ) : null}
            </View>
          </MotiView>
        </View>

        <View className="items-center justify-center">
          <Animated.View
            style={coinParallaxStyle}
            className="w-full items-center"
          >
            <MotiView
              from={{ opacity: 0, scale: 0.9, translateY: 14 }}
              animate={{ opacity: 1, scale: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 420, delay: 220 }}
              className="w-full items-center"
            >
              <CoinDropAnimation
                startFly={startFly}
                onCoinArrive={handleCoinArrive}
                onFlyComplete={handleFlyComplete}
              />

              <CountUpNumber
                target={totalWelcomeCoins}
                start={startCount}
                onComplete={handleCounterComplete}
              />

              <View className="pointer-events-none absolute -top-4 left-0 right-0 items-center">
                {showWelcomeBurst ? (
                  <MotiView
                    key={`welcome-burst-${burstToken}`}
                    from={{ opacity: 0, translateY: 10, scale: 0.92 }}
                    animate={{ opacity: 1, translateY: 0, scale: 1 }}
                    transition={{ type: "timing", duration: 260 }}
                    className="mb-2 rounded-full border border-[#8FA1C9]/35 bg-white/8 px-3 py-1.5"
                  >
                    <Text className="text-[12px] font-extrabold text-[#EAF0FF]">
                      +{baseWelcomeCoins}
                    </Text>
                    <TinySparkleBurst triggerToken={burstToken} tone="cool" />
                  </MotiView>
                ) : null}

                {showReferralBurst && referralBonusCoins > 0 ? (
                  <MotiView
                    key={`referral-burst-${burstToken}`}
                    from={{ opacity: 0, translateY: 10, scale: 0.92 }}
                    animate={{ opacity: 1, translateY: 0, scale: 1 }}
                    transition={{ type: "timing", duration: 260 }}
                    className="rounded-full border border-[#FFD47A]/45 bg-[#2B2414]/65 px-3 py-1.5"
                  >
                    <Text className="text-[12px] font-extrabold text-[#FFE39A]">
                      +{referralBonusCoins}
                    </Text>
                    <TinySparkleBurst
                      triggerToken={burstToken + 100}
                      tone="gold"
                    />
                  </MotiView>
                ) : null}
              </View>
            </MotiView>
          </Animated.View>
        </View>

        <View className="pb-1">
          <MotiView
            from={{ opacity: 0, translateY: 18 }}
            animate={{
              opacity: showCTA ? 1 : 0.28,
              translateY: showCTA ? 0 : 10,
            }}
            transition={{ type: "timing", duration: 280 }}
          >
            <PrimaryCTAButton
              label="Start Learning"
              onPress={continueForward}
              disabled={!showCTA}
            />
            <Text className="mt-3 text-center text-[12px] font-semibold text-[#A3AECB]">
              Let&apos;s keep the streak going
            </Text>
          </MotiView>
        </View>
      </View>
    </View>
  );
}

function TinySparkleBurst({ triggerToken, tone = "gold" }) {
  const sparkColor = tone === "cool" ? "#DCE5FF" : "#FFE39A";
  const sparkMeta = [
    { dx: -22, dy: -10, delay: 0 },
    { dx: 0, dy: -14, delay: 45 },
    { dx: 22, dy: -10, delay: 90 },
    { dx: -10, dy: -18, delay: 60 },
    { dx: 10, dy: -18, delay: 120 },
  ];

  return (
    <View
      pointerEvents="none"
      className="absolute left-0 right-0 top-0 bottom-0"
    >
      {sparkMeta.map((spark, index) => (
        <MotiView
          key={`spark-${triggerToken}-${index}`}
          from={{ opacity: 0, translateX: 0, translateY: 0, scale: 0.7 }}
          animate={{
            opacity: 0,
            translateX: spark.dx,
            translateY: spark.dy,
            scale: 1,
          }}
          transition={{
            type: "timing",
            duration: 520,
            delay: spark.delay,
          }}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
          style={{ backgroundColor: sparkColor }}
        />
      ))}
    </View>
  );
}
