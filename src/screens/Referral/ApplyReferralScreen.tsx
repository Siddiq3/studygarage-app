import React, { useCallback, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGButton from "../../design-system/components/SGButton";
import PressableScale from "../../components/ui/PressableScale";
import useReferral from "../../hooks/useReferral";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function ApplyReferralScreen({ navigation }) {
  const {
    isBusy,
    hasAppliedCode,
    appliedCode,
    claimToken,
    referralRewardCoins,
    applyReferral,
  } = useReferral();

  const [codeInput, setCodeInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const feedbackScale = useSharedValue(1);

  const feedbackStyle = useAnimatedStyle(() => ({
    transform: [{ scale: feedbackScale.value }],
  }));

  const canSubmit = useMemo(
    () => !hasAppliedCode && codeInput.trim().length > 0 && !isBusy,
    [codeInput, hasAppliedCode, isBusy]
  );

  const animateFeedback = useCallback(() => {
    feedbackScale.value = withSequence(
      withTiming(1.02, { duration: 100 }),
      withSpring(1, { damping: 12, stiffness: 230, mass: 0.6 })
    );
  }, [feedbackScale]);

  const handleApply = useCallback(async () => {
    if (!canSubmit) return;

    setErrorText("");
    setSuccessText("");

    const result = await applyReferral(codeInput);

    animateFeedback();

    if (!result.ok) {
      setErrorText(result.message);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
        () => {}
      );
      return;
    }

    setSuccessText(`Referral applied. +${referralRewardCoins} coins added.`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
  }, [
    animateFeedback,
    applyReferral,
    canSubmit,
    codeInput,
    referralRewardCoins,
  ]);

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <Text className="text-[28px] font-sg-display leading-[32px] text-sg-text">
          Apply Referral
        </Text>
        <Text className="mt-2 text-[13px] font-sg-semibold text-sg-muted">
          Enter a friend&apos;s code and unlock {referralRewardCoins} coins.
        </Text>
      </Animated.View>

      <AnimatedView
        entering={FadeInDown.delay(50).duration(240)}
        className="mt-4"
      >
        <SGCard>
          <Text className="text-[12px] font-sg-bold text-sg-muted">
            Referral Code
          </Text>

          <View className="mt-3 rounded-[16px] border border-sg-border bg-[#FFFCF5] px-3 py-2.5">
            <TextInput
              value={codeInput}
              onChangeText={(text) => setCodeInput(text.toUpperCase())}
              placeholder="SG7K2P9Q"
              placeholderTextColor="#5F6A63"
              editable={!hasAppliedCode && !isBusy}
              autoCapitalize="characters"
              autoCorrect={false}
              className="text-[18px] font-sg-bold text-[#1D2A24]"
            />
          </View>

          {hasAppliedCode ? (
            <View className="mt-3 flex-row items-center rounded-[14px] border border-[#1C7C55]/30 bg-[#FFFCF5] px-3 py-2.5">
              <Ionicons name="checkmark-circle" size={16} color="#1C7C55" />
              <Text className="ml-2 flex-1 text-[12px] font-sg-semibold text-[#1C7C55]">
                Referral already used on this device ({appliedCode}).
              </Text>
            </View>
          ) : null}

          {errorText ? (
            <View className="mt-3 rounded-[14px] border border-[#BF3F2B]/35 bg-[#FFFCF5] px-3 py-2.5">
              <Text className="text-[12px] font-sg-semibold text-[#BF3F2B]">
                {errorText}
              </Text>
            </View>
          ) : null}

          {successText ? (
            <AnimatedView
              style={feedbackStyle}
              className="mt-3 rounded-[14px] border border-[#1C7C55]/35 bg-[#FFFCF5] px-3 py-2.5"
            >
              <Text className="text-[12px] font-sg-semibold text-[#1C7C55]">
                {successText}
              </Text>
            </AnimatedView>
          ) : null}

          {claimToken ? (
            <AnimatedView
              style={feedbackStyle}
              className="mt-3 rounded-[14px] border border-[#9A6400]/30 bg-[#FFFCF5] px-3 py-2.5"
            >
              <Text className="text-[12px] font-sg-bold text-[#9A6400]">
                Confirmation Token
              </Text>
              <Text className="mt-1 text-[12px] font-sg-semibold text-[#9A6400]">
                {claimToken}
              </Text>
              <Text className="mt-1 text-[12px] font-sg-medium text-[#9A6400]">
                Send this token to your friend so they can claim{" "}
                {referralRewardCoins} coins.
              </Text>
            </AnimatedView>
          ) : null}

          <Text className="mt-4 text-[12px] font-sg-medium text-sg-muted">
            Referral rewards are verified by confirmation code (offline).
          </Text>
        </SGCard>
      </AnimatedView>

      <Animated.View
        entering={FadeInDown.delay(100).duration(220)}
        className="mt-4"
      >
        <PressableScale
          className={`overflow-hidden rounded-[999px] border p-[1px] ${
            canSubmit ? "border-[#17694F]/50" : "border-sg-border"
          }`}
          activeScale={0.96}
          disabled={!canSubmit}
          onPress={handleApply}
        >
          <View
            className={`min-h-[56px] items-center justify-center rounded-[999px] ${
              canSubmit ? "bg-[#FFFCF5]" : "bg-[#FFFCF5] opacity-55"
            }`}
          >
            <Text className="text-[16px] font-sg-extrabold text-[#1D2A24]">
              {isBusy ? "Applying..." : "Apply & Get Coins"}
            </Text>
          </View>
        </PressableScale>

        <SGButton
          label="Back to Referral"
          variant="ghost"
          className="mt-3"
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
