import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import SGButton from "../../design-system/components/SGButton";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import { useFirstInstallReward } from "../../services/rewards/useFirstInstallReward";

const COIN_LOGO = require("../../../assets/branding/chalk/coin-sg.png");
const COIN_SIZE = 148;
const START_DELAY_MS = 250;
const FALL_MS = 1300;
const LAND_MS = START_DELAY_MS + FALL_MS;
const NUMBER_MS = LAND_MS + 350;
const WALLET_MS = NUMBER_MS + 750;
const BUTTON_MS = WALLET_MS + 350;
const EASE_OUT = Easing.out(Easing.cubic);
const EASE_SETTLE = Easing.bezier(0.22, 0.8, 0.3, 1);

// One coin, transform and opacity only, nothing loops: this has to stay smooth on budget phones.
export default function WelcomeRewardScreen({ navigation, route, onContinue }) {
  const insets = useSafeAreaInsets();
  const reducedMotion = useReducedMotionPreference();
  const {
    isReady,
    shouldShowWelcomeReward,
    welcomeRewardPayload,
    completeWelcomeReward,
  } = useFirstInstallReward();

  const totalWelcomeCoins = welcomeRewardPayload?.totalWelcomeCoins ?? 50;
  const referralBonusCoins = welcomeRewardPayload?.referralBonusCoins ?? 0;
  const firstName = String(route?.params?.userName || "").trim();

  const [walletBalance, setWalletBalance] = useState(0);
  const hasRewardPersistedRef = useRef(false);
  const startedRef = useRef(false);

  const coin = useSharedValue(0);
  const ring = useSharedValue(0);
  const amount = useSharedValue(0);
  const wallet = useSharedValue(1);
  const button = useSharedValue(0);

  const nextRouteParams = useMemo(
    () => ({ ...(route?.params || {}), walletPulseOnce: true }),
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
    if (!isReady || shouldShowWelcomeReward) return;
    navigation.replace("SecondPage", nextRouteParams);
  }, [isReady, navigation, nextRouteParams, shouldShowWelcomeReward]);

  useEffect(() => {
    if (!isReady || !shouldShowWelcomeReward || startedRef.current) return undefined;
    startedRef.current = true;

    const credit = () => {
      setWalletBalance(totalWelcomeCoins);
      persistWelcomeRewardOnce().catch(() => {});
    };

    if (reducedMotion) {
      coin.value = 1;
      amount.value = 1;
      button.value = 1;
      credit();
      return undefined;
    }

    coin.value = withDelay(
      START_DELAY_MS,
      withTiming(1, { duration: FALL_MS, easing: EASE_SETTLE })
    );
    ring.value = withDelay(LAND_MS - 150, withTiming(1, { duration: 1000, easing: EASE_OUT }));
    amount.value = withDelay(NUMBER_MS, withTiming(1, { duration: 500, easing: EASE_OUT }));
    button.value = withDelay(BUTTON_MS, withTiming(1, { duration: 400, easing: EASE_OUT }));

    const landTimer = setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    }, LAND_MS - 150);
    const walletTimer = setTimeout(() => {
      credit();
      wallet.value = withSequence(
        withTiming(1.12, { duration: 180, easing: EASE_OUT }),
        withTiming(1, { duration: 280, easing: EASE_OUT })
      );
    }, WALLET_MS);

    return () => {
      clearTimeout(landTimer);
      clearTimeout(walletTimer);
    };
  }, [isReady, shouldShowWelcomeReward, reducedMotion]);

  const coinStyle = useAnimatedStyle(() => ({
    opacity: Math.min(1, coin.value * 4),
    transform: [
      { perspective: 800 },
      { translateY: (1 - coin.value) * -190 },
      { rotateY: `${(1 - coin.value) * 360}deg` },
      { scale: 0.8 + coin.value * 0.2 },
    ],
  }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: ring.value === 0 ? 0 : (1 - ring.value) * 0.5,
    transform: [{ scale: 1 + ring.value * 0.85 }],
  }));
  const amountStyle = useAnimatedStyle(() => ({
    opacity: amount.value,
    transform: [{ translateY: (1 - amount.value) * 10 }],
  }));
  const walletStyle = useAnimatedStyle(() => ({
    transform: [{ scale: wallet.value }],
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: button.value,
    transform: [{ translateY: (1 - button.value) * 8 }],
  }));

  return (
    <View
      className="flex-1 bg-[#14342A] px-5"
      style={{ paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }}
    >
      <StatusBar style="light" />

      <View className="h-10 flex-row justify-end">
        <Animated.View
          style={walletStyle}
          accessibilityLabel={`Wallet: ${walletBalance} coins`}
          className="h-10 flex-row items-center rounded-[12px] bg-[#1C4336] px-3"
        >
          <Ionicons name="wallet-outline" size={17} color="#F4EFE2" />
          <Text
            className="ml-1.5 text-[15px] font-sg-bold text-[#F2B632]"
            style={{ fontVariant: ["tabular-nums"] }}
          >
            {walletBalance}
          </Text>
        </Animated.View>
      </View>

      <View className="mt-4">
        <Text className="text-[36px] font-sg-display leading-[40px] tracking-[-0.7px] text-[#F4EFE2]">
          {firstName ? `Welcome, ${firstName}` : "Welcome to StudyGarage"}
        </Text>
        <Text className="mt-2 text-[15px] leading-[22px] font-sg-medium text-[#B5C6BB]">
          Here are your first coins. Earn more with every quiz.
        </Text>
      </View>

      <View className="flex-1 items-center justify-center">
        <View
          className="items-center justify-center"
          style={{ width: COIN_SIZE, height: COIN_SIZE }}
        >
          <Animated.View
            pointerEvents="none"
            style={[
              ringStyle,
              {
                position: "absolute",
                width: COIN_SIZE,
                height: COIN_SIZE,
                borderRadius: COIN_SIZE / 2,
                borderWidth: 3,
                borderColor: "#F4EFE2",
              },
            ]}
          />
          <Animated.View
            style={[
              coinStyle,
              {
                width: COIN_SIZE,
                height: COIN_SIZE,
                borderRadius: COIN_SIZE / 2,
                backgroundColor: "#F2B632",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <View
              className="items-center justify-center rounded-full border-2 border-[#14342A]/20"
              style={{ width: COIN_SIZE - 22, height: COIN_SIZE - 22 }}
            >
              <Image
                source={COIN_LOGO}
                accessibilityLabel="StudyGarage coin"
                resizeMode="contain"
                style={{ width: COIN_SIZE * 0.68, height: COIN_SIZE * 0.68 }}
              />
            </View>
          </Animated.View>
        </View>

        <Animated.View style={amountStyle} className="mt-7 items-center">
          <Text
            className="text-[64px] leading-[70px] font-sg-display tracking-[-1.2px] text-[#F2B632]"
            style={{ fontVariant: ["tabular-nums"] }}
          >
            +{totalWelcomeCoins}
          </Text>
          <Text className="text-[16px] font-sg-semibold text-[#F4EFE2]">
            {referralBonusCoins > 0
              ? `coins, with +${referralBonusCoins} referral bonus`
              : "coins"}
          </Text>
        </Animated.View>
      </View>

      <Animated.View style={buttonStyle}>
        <SGButton label="Start learning" variant="board" onPress={continueForward} />
      </Animated.View>
    </View>
  );
}
