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

export default function ClaimRewardScreen({ navigation }) {
  const {
    isBusy,
    referralRewardCoins,
    claimedTokensCount,
    claimRewardByToken,
  } = useReferral();

  const [tokenInput, setTokenInput] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");

  const successScale = useSharedValue(1);

  const successStyle = useAnimatedStyle(() => ({
    transform: [{ scale: successScale.value }],
  }));

  const canSubmit = useMemo(
    () => tokenInput.trim().length >= 20 && !isBusy,
    [isBusy, tokenInput]
  );

  const animateSuccess = useCallback(() => {
    successScale.value = withSequence(
      withTiming(1.03, { duration: 120 }),
      withSpring(1, { damping: 12, stiffness: 240, mass: 0.7 })
    );
  }, [successScale]);

  const handleClaim = useCallback(async () => {
    if (!canSubmit) return;

    setErrorText("");
    setSuccessText("");

    const result = await claimRewardByToken(tokenInput.trim());
    if (!result.ok) {
      if (result.reason === "cooldown" && result.retryAfterSeconds) {
        setErrorText(
          `${result.message} Retry in ${result.retryAfterSeconds}s.`
        );
      } else {
        setErrorText(result.message);
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(
        () => {}
      );
      return;
    }

    animateSuccess();
    setSuccessText(`Claim successful. +${referralRewardCoins} coins added.`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
      () => {}
    );
    setTokenInput("");
  }, [
    animateSuccess,
    canSubmit,
    claimRewardByToken,
    referralRewardCoins,
    tokenInput,
  ]);

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <Text className="text-[28px] font-sg-display leading-[32px] text-[#F4EFE2]">
          Claim Referral Reward
        </Text>
        <Text className="mt-2 text-[13px] font-sg-semibold text-[#B5C6BB]">
          Paste your friend&apos;s confirmation token to claim coins.
        </Text>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(50).duration(240)}
        className="mt-4"
      >
        <SGCard>
          <Text className="text-[12px] font-sg-bold text-[#B5C6BB]">
            Confirmation Token
          </Text>

          <View className="mt-3 rounded-[16px] border border-[#F4EFE2]/12 bg-[#14342A] px-3 py-2.5">
            <TextInput
              value={tokenInput}
              onChangeText={setTokenInput}
              placeholder="Paste token"
              placeholderTextColor="#B5C6BB"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isBusy}
              className="text-[14px] font-sg-semibold text-[#F4EFE2]"
            />
          </View>

          <View className="mt-3 rounded-[14px] border border-[#F4EFE2]/10 bg-[#14342A] px-3 py-2.5">
            <Text className="text-[12px] font-sg-semibold text-[#F4EFE2]">
              Claimed tokens on this device: {claimedTokensCount}
            </Text>
          </View>

          {errorText ? (
            <View className="mt-3 rounded-[14px] border border-[#F28B76]/35 bg-[#1C4336] px-3 py-2.5">
              <Text className="text-[12px] font-sg-semibold text-[#F28B76]">
                {errorText}
              </Text>
            </View>
          ) : null}

          {successText ? (
            <AnimatedView
              style={successStyle}
              className="mt-3 rounded-[14px] border border-[#8FD9B4]/35 bg-[#1C4336] px-3 py-2.5"
            >
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={16} color="#8FD9B4" />
                <Text className="ml-2 flex-1 text-[12px] font-sg-semibold text-[#8FD9B4]">
                  {successText}
                </Text>
              </View>
            </AnimatedView>
          ) : null}

          <Text className="mt-4 text-[12px] font-sg-medium text-[#B5C6BB]">
            Referral rewards are verified by confirmation code (offline).
          </Text>
        </SGCard>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(100).duration(220)}
        className="mt-4"
      >
        <PressableScale
          className={`overflow-hidden rounded-[999px] border p-[1px] ${
            canSubmit ? "border-[#F2B632]/50" : "border-[#F4EFE2]/12"
          }`}
          activeScale={0.96}
          disabled={!canSubmit}
          onPress={handleClaim}
        >
          <View
            className={`min-h-[56px] items-center justify-center rounded-[999px] ${
              canSubmit ? "bg-[#1C4336]" : "bg-[#14342A] opacity-55"
            }`}
          >
            <Text className="text-[16px] font-sg-extrabold text-[#F4EFE2]">
              {isBusy ? "Checking..." : `Claim ${referralRewardCoins} Coins`}
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
