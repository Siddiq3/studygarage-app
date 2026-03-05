import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  FadeInUp,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import { prepareWelcomeRewardFlow } from "./src/services/rewards/firstInstallRewardService";
import { localStore } from "./src/services/storage/localStore";
import GlassCard from "./components/ui/GlassCard";
import AvatarPicker from "./components/onboarding/AvatarPicker";
import ChoiceTile from "./components/onboarding/ChoiceTile";
import ChoiceChip from "./components/onboarding/ChoiceChip";
import PressableScale from "./components/ui/PressableScale";
import useReducedMotionPreference from "./src/hooks/useReducedMotionPreference";
import ShimmerSkeleton from "./src/components/ui/ShimmerSkeleton";
// Referral feature temporarily disabled.
// import {
//   applyReferralCodeOnDevice,
//   getReferralSnapshot,
// } from "./src/services/referralStorage";

const stateBoards = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Telangana", value: "Telangana" },
  { label: "Karnataka", value: "Karnataka" },
];

const classes = [
  { label: "6th", value: "6thClass" },
  { label: "7th", value: "7thClass" },
  { label: "8th", value: "8thClass" },
  { label: "9th", value: "9thClass" },
  { label: "10th", value: "10thClass" },
  { label: "Inter", value: "Inter" },
];

const defaultAvatarImage = require("./assets/boy.png");
const girlAvatarImage = require("./assets/girl.png");

function OnboardingActionButton({
  label,
  onPress,
  disabled = false,
  secondary = false,
  reducedMotion = false,
  className = "",
}) {
  const glowEnabled = !secondary && !disabled;
  const glowOpacity = useSharedValue(glowEnabled ? 1 : 0);

  useEffect(() => {
    if (!glowEnabled) {
      glowOpacity.value = withTiming(0, { duration: 120 });
      return;
    }

    if (reducedMotion) {
      glowOpacity.value = withTiming(0.92, { duration: 140 });
      return;
    }

    glowOpacity.value = withTiming(1, { duration: 120 });
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.9, { duration: 2200 }),
        withTiming(1, { duration: 2200 })
      ),
      -1,
      false
    );
  }, [glowEnabled, glowOpacity, reducedMotion]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      hapticType="none"
      activeScale={0.96}
      containerClassName={className}
      className="rounded-full"
    >
      <View className="relative">
        {glowEnabled ? (
          <Animated.View
            pointerEvents="none"
            style={glowStyle}
            className="absolute -inset-[1px] rounded-full border border-[#8F74FF]/45 bg-[#8F74FF]/8"
          />
        ) : null}
        <View
          className={`min-h-[56px] items-center justify-center rounded-full border px-4 ${
            secondary
              ? "border-white/12 bg-[#151A24]"
              : disabled
              ? "border-white/16 bg-[#141A24] opacity-45"
              : "border-[#8F74FF]/48 bg-[#141A24]"
          }`}
          style={
            glowEnabled
              ? {
                  shadowColor: "#8F74FF",
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.16,
                  shadowRadius: 10,
                  elevation: 6,
                }
              : undefined
          }
        >
          <Text className="text-[16px] font-extrabold text-white">{label}</Text>
        </View>
      </View>
    </PressableScale>
  );
}

const FirstPage = ({ navigation, route }) => {
  const reducedMotionEnabled = useReducedMotionPreference();
  const isEditMode = route?.params?.editProfile === true;

  const [stateBoard, setStateBoard] = useState(null);
  const [classValue, setClassValue] = useState(null);
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("boy");
  // Referral feature temporarily disabled.
  // const [referralCodeInput, setReferralCodeInput] = useState("");
  // const [referralApplied, setReferralApplied] = useState(false);
  // const [referralApplyLoading, setReferralApplyLoading] = useState(false);
  // const [referralApplyState, setReferralApplyState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const nameFocus = useSharedValue(0);
  const progressFill = useSharedValue(0);
  const hasProgressAnimatedRef = useRef(false);

  useEffect(() => {
    nameFocus.value = withTiming(isNameFocused ? 1 : 0, { duration: 160 });
  }, [isNameFocused, nameFocus]);

  const nameInputStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      nameFocus.value,
      [0, 1],
      ["rgba(255,255,255,0.1)", "rgba(143,116,255,0.68)"]
    ),
    backgroundColor: interpolateColor(
      nameFocus.value,
      [0, 1],
      ["#141821", "#171B28"]
    ),
  }));

  useEffect(() => {
    const finalProgress = currentStep === 1 ? 50 : 100;

    if (reducedMotionEnabled) {
      progressFill.value = finalProgress;
      return;
    }

    if (!hasProgressAnimatedRef.current) {
      progressFill.value = 0;
      progressFill.value = withTiming(finalProgress, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      });
      hasProgressAnimatedRef.current = true;
      return;
    }

    progressFill.value = withTiming(finalProgress, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [currentStep, progressFill, reducedMotionEnabled]);

  const progressFillStyle = useAnimatedStyle(() => ({
    width: `${progressFill.value}%`,
  }));

  // Referral feature temporarily disabled.
  // useEffect(() => {
  //   const hydrateReferralState = async () => {
  //     try {
  //       const snapshot = await getReferralSnapshot();
  //       if (snapshot?.appliedCode) {
  //         setReferralCodeInput(snapshot.appliedCode);
  //         setReferralApplied(true);
  //         setReferralApplyState({
  //           type: "success",
  //           message: "Applied ✅",
  //         });
  //       }
  //     } catch (_error) {
  //       // keep silent fallback
  //     }
  //   };

  //   hydrateReferralState();
  // }, []);

  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem("userName");
        const storedAvatar = await AsyncStorage.getItem("avatar");
        const storedStateBoard = await AsyncStorage.getItem("stateBoard");
        const storedClassValue = await AsyncStorage.getItem("classValue");
        const pendingWelcome = await localStore.getBool(
          localStore.keys.pendingWelcome,
          false
        );

        if (
          storedUserName &&
          storedAvatar &&
          storedStateBoard &&
          storedClassValue
        ) {
          setUserName(storedUserName);
          setAvatar(storedAvatar);
          setStateBoard(storedStateBoard);
          setClassValue(storedClassValue);

          if (isEditMode) {
            return;
          }

          const nextParams = {
            userName: storedUserName,
            stateBoard: storedStateBoard,
            classValue: storedClassValue,
            avatar: storedAvatar,
          };

          if (pendingWelcome) {
            navigation.navigate("WelcomeReward", nextParams);
            return;
          }

          navigation.navigate("SecondPage", nextParams);
        }
      } catch (error) {
        console.error("Error checking stored data:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStoredData();
  }, [isEditMode, navigation]);

  const handleContinue = async () => {
    if (!userName.trim()) {
      Alert.alert("Name Required", "Please enter your name.");
      return;
    }

    try {
      await AsyncStorage.setItem("userName", userName);
      await AsyncStorage.setItem("avatar", avatar);
      await AsyncStorage.setItem("stateBoard", stateBoard || "");
      await AsyncStorage.setItem("classValue", classValue || "");

      // Referral feature temporarily disabled.
      const referralBonusEligible = false;
      // let referralBonusEligible = referralApplied;
      // const normalizedReferralCode = referralCodeInput.trim().toUpperCase();
      // if (normalizedReferralCode && !referralApplied) {
      //   const referralResult = await applyReferralCodeOnDevice(
      //     normalizedReferralCode
      //   );
      //   if (referralResult.ok || referralResult.reason === "already_applied") {
      //     referralBonusEligible = true;
      //     setReferralApplied(true);
      //     setReferralApplyState({
      //       type: "success",
      //       message:
      //         referralResult.reason === "already_applied"
      //           ? "Applied ✅"
      //           : "Referral applied. +100 welcome bonus ready.",
      //     });
      //   } else {
      //     setReferralApplyState({
      //       type: "error",
      //       message: referralResult.message,
      //     });
      //   }
      // }

      const { shouldShow } = await prepareWelcomeRewardFlow({
        onboardingCompleted: true,
        referralBonusEligible,
      });

      const nextParams = {
        userName,
        stateBoard,
        classValue,
        avatar,
      };

      try {
        await Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        );
      } catch (_error) {
        // haptics fallback
      }

      await new Promise((resolve) => setTimeout(resolve, 120));

      if (shouldShow) {
        navigation.navigate("WelcomeReward", nextParams);
        return;
      }

      navigation.navigate("SecondPage", nextParams);
    } catch (error) {
      console.log("Error storing data:", error);
    }
  };

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const handleStepOneContinue = async () => {
    if (!userName.trim()) {
      Alert.alert("Name Required", "Please enter your name.");
      return;
    }

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_error) {
      // haptics fallback
    }

    await new Promise((resolve) => setTimeout(resolve, 120));
    setCurrentStep(2);
  };

  // Referral feature temporarily disabled.
  // const handleApplyReferralCode = async () => {};

  return (
    <ScreenLayoutContainer
      variant="onboarding"
      contentClassName="px-5 pb-8"
      scroll
    >
      <Animated.View
        entering={FadeInUp.duration(reducedMotionEnabled ? 160 : 260)
          .easing(Easing.out(Easing.cubic))
          .withInitialValues({ opacity: 0, transform: [{ translateY: 16 }] })}
        className="relative pb-8 pt-2"
      >
        <View
          pointerEvents="none"
          className="absolute -top-14 left-[-8%] h-[220px] w-[116%] rounded-full"
          style={{ backgroundColor: "rgba(184,192,212,0.06)" }}
        />

        <View className="mb-4">
          <View className="h-[5px] w-full overflow-hidden rounded-full bg-white/10">
            <Animated.View
              className="h-full rounded-full bg-[#D8DFF0]"
              style={progressFillStyle}
            />
          </View>
          <Text className="mt-1.5 text-[11px] font-semibold tracking-[0.5px] text-[#B8C0D4]/90">
            Step {currentStep} of 2
          </Text>
        </View>

        <Text className="text-[44px] font-extrabold leading-[46px] tracking-[-0.45px] text-[#F5F7FF]">
          Welcome
        </Text>
        <Text className="text-[44px] font-extrabold leading-[46px] tracking-[-0.45px] text-[#F5F7FF]">
          StudyGarage
        </Text>
        <Text className="mt-2.5 text-[14px] font-medium tracking-[0.35px] text-[#B8C0D4]/90">
          Build your study identity
        </Text>
      </Animated.View>

      {loading ? (
        <View className="py-8">
          <View className="mb-5">
            <ShimmerSkeleton height={210} borderRadius={26} />
          </View>
          <View className="mb-3 flex-row gap-3">
            <View className="flex-1">
              <ShimmerSkeleton height={76} borderRadius={22} />
            </View>
            <View className="flex-1">
              <ShimmerSkeleton height={76} borderRadius={22} />
            </View>
          </View>
          <ShimmerSkeleton height={58} borderRadius={22} />
        </View>
      ) : (
        <>
          {currentStep === 1 ? (
            <>
              <Animated.View
                entering={FadeInUp.delay(
                  reducedMotionEnabled ? 0 : 80
                ).duration(reducedMotionEnabled ? 180 : 280)}
              >
                <GlassCard className="mb-5">
                  <Text className="mt-1 text-[30px] font-black leading-[34px] tracking-tight text-sg-text">
                    Create your profile
                  </Text>
                  <Text className="mt-2 text-[13px] font-semibold text-sg-muted">
                    Choose your photo, gender, and display name
                  </Text>

                  <Animated.View
                    entering={FadeInUp.delay(
                      reducedMotionEnabled ? 0 : 140
                    ).duration(220)}
                    className="mt-8 items-center"
                  >
                    <Text className="mb-2 text-[11px] font-bold uppercase tracking-[1px] text-sg-muted">
                      Profile Photo
                    </Text>
                    <AvatarPicker
                      value={avatar}
                      onChange={setAvatar}
                      boySource={defaultAvatarImage}
                      girlSource={girlAvatarImage}
                    />
                  </Animated.View>

                  <Text className="mt-7 text-[11px] font-bold uppercase tracking-[1px] text-sg-muted">
                    Select Gender
                  </Text>
                  <View className="mt-2 flex-row gap-3">
                    <Animated.View
                      entering={FadeInUp.delay(
                        reducedMotionEnabled ? 0 : 200
                      ).duration(220)}
                      className="flex-1"
                    >
                      <ChoiceTile
                        label="Girl"
                        imageSource={girlAvatarImage}
                        selected={avatar === "girl"}
                        onPress={() => handleAvatarSelect("girl")}
                      />
                    </Animated.View>
                    <Animated.View
                      entering={FadeInUp.delay(
                        reducedMotionEnabled ? 0 : 260
                      ).duration(220)}
                      className="flex-1"
                    >
                      <ChoiceTile
                        label="Boy"
                        imageSource={defaultAvatarImage}
                        selected={avatar === "boy"}
                        onPress={() => handleAvatarSelect("boy")}
                      />
                    </Animated.View>
                  </View>

                  <Animated.View
                    entering={FadeInUp.delay(
                      reducedMotionEnabled ? 0 : 260
                    ).duration(220)}
                  >
                    <Animated.View
                      style={nameInputStyle}
                      className="mt-6 rounded-[18px] border px-4 py-3.5"
                    >
                      <Text className="mb-1 text-[11px] font-bold uppercase tracking-[1px] text-sg-muted">
                        Name
                      </Text>
                      <TextInput
                        placeholder="What should we call you?"
                        placeholderTextColor="#9AA3B7"
                        value={userName}
                        onChangeText={setUserName}
                        onFocus={() => setIsNameFocused(true)}
                        onBlur={() => setIsNameFocused(false)}
                        cursorColor="#F5F7FF"
                        selectionColor="rgba(245,247,255,0.45)"
                        className="text-[18px] font-black text-sg-text"
                      />
                    </Animated.View>
                  </Animated.View>

                  {/* Referral feature temporarily disabled. */}
                  {/* <Animated.View
                    entering={FadeInUp.delay(
                      reducedMotionEnabled ? 0 : 290
                    ).duration(220)}
                  >
                    <View className="mt-4 rounded-[18px] border border-white/10 bg-[#141821] px-4 py-3.5">
                      ...
                    </View>
                  </Animated.View> */}
                </GlassCard>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(
                  reducedMotionEnabled ? 0 : 320
                ).duration(220)}
                className="pb-2 pt-2"
              >
                <OnboardingActionButton
                  label="Continue →"
                  onPress={handleStepOneContinue}
                  disabled={!userName.trim()}
                  reducedMotion={reducedMotionEnabled}
                  className="w-full"
                />
              </Animated.View>
            </>
          ) : (
            <>
              <Animated.View
                entering={FadeInUp.delay(
                  reducedMotionEnabled ? 0 : 80
                ).duration(reducedMotionEnabled ? 180 : 280)}
              >
                <GlassCard className="mb-5">
                  <Text className="mt-1 text-[28px] font-black leading-[32px] tracking-tight text-sg-text">
                    Choose Board
                  </Text>
                  <Text className="mt-1 text-[13px] font-semibold text-sg-muted">
                    Select your curriculum
                  </Text>

                  <View className="mt-5 flex-row flex-wrap gap-2.5">
                    {stateBoards.map((item) => (
                      <ChoiceChip
                        key={item.value}
                        label={item.label}
                        selected={stateBoard === item.value}
                        onPress={() => setStateBoard(item.value)}
                        compact
                      />
                    ))}
                  </View>
                </GlassCard>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(
                  reducedMotionEnabled ? 0 : 150
                ).duration(260)}
              >
                <GlassCard className="mb-5">
                  <Text className="text-[28px] font-black leading-[32px] tracking-tight text-sg-text">
                    Choose Class
                  </Text>
                  <Text className="mt-1 text-[13px] font-semibold text-sg-muted">
                    Used for papers, quiz, tests, and videos
                  </Text>

                  <View className="mt-5 flex-row flex-wrap justify-between gap-y-3">
                    {classes.map((item) => (
                      <ChoiceChip
                        key={item.value}
                        label={item.label}
                        selected={classValue === item.value}
                        onPress={() => setClassValue(item.value)}
                        compact={false}
                        className="w-[48.5%]"
                      />
                    ))}
                  </View>
                </GlassCard>
              </Animated.View>

              <Animated.View
                entering={FadeInUp.delay(
                  reducedMotionEnabled ? 0 : 230
                ).duration(220)}
                className="pb-2 pt-2"
              >
                <View className="flex-row gap-3">
                  <OnboardingActionButton
                    label="← Back"
                    secondary
                    onPress={() => setCurrentStep(1)}
                    reducedMotion={reducedMotionEnabled}
                    className="flex-1"
                  />
                  <OnboardingActionButton
                    label="Start Learning →"
                    onPress={handleContinue}
                    disabled={!userName.trim() || !stateBoard || !classValue}
                    reducedMotion={reducedMotionEnabled}
                    className="flex-1"
                  />
                </View>
              </Animated.View>
            </>
          )}
        </>
      )}
    </ScreenLayoutContainer>
  );
};

export default FirstPage;
