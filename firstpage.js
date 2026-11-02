import React, { useEffect, useState } from "react";
import { Alert, Image, Keyboard, Pressable, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import SGSelect from "./src/design-system/components/SGSelect";
import SGButton from "./src/design-system/components/SGButton";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import { prepareWelcomeRewardFlow } from "./src/services/rewards/firstInstallRewardService";
import { localStore } from "./src/services/storage/localStore";
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
  { label: "Degree", value: "Degree" },
  { label: "B.Tech", value: "BTech" },
];

const ALL_SCHOOL = ["6thClass", "7thClass", "8thClass", "9thClass", "10thClass"];

// Keep in step with componentLookup in secondpage.js: these combinations have modules.
const COLLEGE = ["Degree", "BTech"];
const availableClasses = {
  "Andhra Pradesh": [...ALL_SCHOOL, "Inter", ...COLLEGE],
  Telangana: ["10thClass", ...COLLEGE],
  Karnataka: [...ALL_SCHOOL, ...COLLEGE],
};

const classLabel = (value) => {
  if (value === "Inter") return "Intermediate";
  if (COLLEGE.includes(value)) return classes.find((item) => item.value === value).label;
  const match = classes.find((item) => item.value === value);
  return match ? `${match.label} class` : "";
};

const selectionTick = () => Haptics.selectionAsync().catch(() => {});

const defaultAvatarImage = require("./assets/boy.png");
const girlAvatarImage = require("./assets/girl.png");

function OnboardingActionButton({ label, onPress, disabled = false, secondary = false, className = "" }) {
  return (
    <SGButton
      label={label}
      onPress={onPress}
      disabled={disabled}
      variant={secondary ? "ghost" : "primary"}
      className={className}
      style={{ flex: className.includes("flex-1") ? 1 : undefined }}
    />
  );
}

const isCustomPhoto = (value) =>
  typeof value === "string" &&
  /^(http|file:|content:|data:image)/.test(value);

function PictureTile({ label, selected, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      className={`h-[108px] w-[31.8%] items-center justify-center rounded-[16px] border ${
        selected
          ? "border-sg-board bg-sg-board"
          : "border-sg-border bg-sg-surface active:bg-sg-bg2"
      }`}
    >
      {children}
      <Text
        numberOfLines={1}
        className={`mt-2 text-[14px] font-sg-semibold ${
          selected ? "text-[#F2B632]" : "text-sg-text"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function StepProgress({ step }) {
  return (
    <View
      className="flex-1 flex-row gap-1.5"
      accessibilityLabel={`Step ${step} of 2`}
    >
      {[1, 2].map((item) => (
        <View
          key={item}
          className={`h-1.5 flex-1 rounded-full ${
            item <= step ? "bg-sg-primary" : "bg-sg-bg2"
          }`}
        />
      ))}
    </View>
  );
}

const FirstPage = ({ navigation, route }) => {
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
  const [isPickingPhoto, setIsPickingPhoto] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const classesForBoard = availableClasses[stateBoard] || [...ALL_SCHOOL, "Inter", ...COLLEGE];

  const handleSelectBoard = (board) => {
    selectionTick();
    setStateBoard(board);
    if (classValue && !(availableClasses[board] || []).includes(classValue)) {
      setClassValue(null);
    }
  };

  const handleSelectClass = (value) => {
    selectionTick();
    setClassValue(value);
  };

  const stepTwoReady = Boolean(userName.trim() && stateBoard && classValue);

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
      Alert.alert("Name required", "Please enter your name.");
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

  const handlePickPhoto = async () => {
    if (isPickingPhoto) return;
    setIsPickingPhoto(true);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission needed",
          "Please allow photo access to use your own picture."
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });
      if (!result.canceled && result.assets?.length > 0) {
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Upload failed", "We couldn't open your photos. Please try again.");
    } finally {
      setIsPickingPhoto(false);
    }
  };

  const avatarSource = isCustomPhoto(avatar)
    ? { uri: avatar }
    : avatar === "girl"
    ? girlAvatarImage
    : defaultAvatarImage;

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const handleStepOneContinue = async () => {
    if (!userName.trim()) {
      Alert.alert("Name required", "Please enter your name.");
      return;
    }

    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (_error) {
      // haptics fallback
    }

    Keyboard.dismiss();
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
      {loading ? (
        <View className="mt-1">
          <ShimmerSkeleton height={6} borderRadius={3} />
          <View className="mb-4 mt-6">
            <ShimmerSkeleton height={84} borderRadius={14} />
          </View>
          <View className="mb-4">
            <ShimmerSkeleton height={220} borderRadius={22} />
          </View>
          <ShimmerSkeleton height={108} borderRadius={16} />
        </View>
      ) : (
        <>
          {/* Step 1 stays mounted when hidden: removing it mid press-animation crashed Fabric. */}
          <View style={{ display: currentStep === 1 ? "flex" : "none" }}>
            <View className="mb-5 mt-1">
              <StepProgress step={1} />
            </View>

            <Text className="text-[34px] font-sg-display leading-[38px] tracking-[-0.7px] text-sg-text">
              {isEditMode ? "Your profile" : "Welcome to StudyGarage"}
            </Text>
            <Text className="mb-5 mt-2 text-[15px] font-sg-medium text-sg-muted">
              First, tell us who you are.
            </Text>

            {/* The student writes their own name on the board. */}
            <View className="mb-5 rounded-[22px] bg-sg-board p-5">
              <Image
                source={avatarSource}
                accessibilityLabel="Your picture"
                resizeMode="cover"
                className="mb-4 h-[84px] w-[84px] rounded-[24px] bg-[#1C4336]"
              />
              <Text className="text-[14px] font-sg-medium text-[#B5C6BB]">
                What should we call you?
              </Text>
              <TextInput
                placeholder="Your name"
                placeholderTextColor="rgba(244,239,226,0.35)"
                value={userName}
                onChangeText={setUserName}
                onFocus={() => setIsNameFocused(true)}
                onBlur={() => setIsNameFocused(false)}
                onSubmitEditing={() => {
                  if (userName.trim()) handleStepOneContinue();
                }}
                returnKeyType="next"
                autoCapitalize="words"
                autoCorrect={false}
                maxLength={30}
                cursorColor="#F2B632"
                selectionColor="rgba(242,182,50,0.4)"
                accessibilityLabel="Your name"
                className={`mt-1 border-b-2 pb-2 pt-1 text-[30px] font-sg-display text-[#F4EFE2] ${
                  isNameFocused ? "border-[#F2B632]" : "border-[#F4EFE2]/25"
                }`}
              />
            </View>

            <Text className="mb-2 text-[20px] font-sg-display text-sg-text">
              Your picture
            </Text>
            <View
              accessibilityRole="radiogroup"
              className="mb-5 flex-row justify-between"
            >
              <PictureTile
                label="Girl"
                selected={avatar === "girl"}
                onPress={() => {
                  selectionTick();
                  handleAvatarSelect("girl");
                }}
              >
                <Image
                  source={girlAvatarImage}
                  className="h-[52px] w-[52px] rounded-[16px]"
                  resizeMode="cover"
                />
              </PictureTile>
              <PictureTile
                label="Boy"
                selected={avatar === "boy"}
                onPress={() => {
                  selectionTick();
                  handleAvatarSelect("boy");
                }}
              >
                <Image
                  source={defaultAvatarImage}
                  className="h-[52px] w-[52px] rounded-[16px]"
                  resizeMode="cover"
                />
              </PictureTile>
              <PictureTile
                label={isPickingPhoto ? "Opening" : "Your photo"}
                selected={isCustomPhoto(avatar)}
                onPress={handlePickPhoto}
              >
                {isCustomPhoto(avatar) ? (
                  <Image
                    source={{ uri: avatar }}
                    className="h-[52px] w-[52px] rounded-[16px]"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-sg-primarySoft">
                    <Ionicons name="camera-outline" size={24} color="#17694F" />
                  </View>
                )}
              </PictureTile>
            </View>

            {userName.trim() ? (
              <OnboardingActionButton
                label="Continue"
                onPress={handleStepOneContinue}
              />
            ) : (
              <View className="min-h-[52px] items-center justify-center rounded-[14px] bg-sg-bg2">
                <Text className="text-[15px] font-sg-semibold text-sg-muted">
                  Enter your name
                </Text>
              </View>
            )}
          </View>
          {currentStep === 2 ? (
            <>
              <View className="mb-4 mt-1 flex-row items-center gap-3">
                <Pressable
                  onPress={() => setCurrentStep(1)}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Back to your profile"
                  className="h-11 w-11 items-center justify-center rounded-[14px] border border-sg-border bg-sg-surface active:opacity-60"
                >
                  <Ionicons name="arrow-back" size={20} color="#1D2A24" />
                </Pressable>
                <StepProgress step={2} />
              </View>

              {/* The board writes itself as the student chooses. */}
              <View className="mb-5 min-h-[138px] justify-center rounded-[22px] bg-sg-board px-5 py-5">
                <Text
                  numberOfLines={1}
                  className="text-[14px] font-sg-medium text-[#B5C6BB]"
                >
                  {`${userName.trim()}, you study in`}
                </Text>
                <Text
                  className={`mt-1 text-[32px] leading-[38px] font-sg-display tracking-[-0.5px] ${
                    classValue ? "text-[#F2B632]" : "text-[#F4EFE2]/35"
                  }`}
                >
                  {classValue ? classLabel(classValue) : "Which class or course?"}
                </Text>
                <Text
                  className={`mt-0.5 text-[16px] font-sg-semibold ${
                    stateBoard ? "text-[#F4EFE2]" : "text-[#F4EFE2]/35"
                  }`}
                >
                  {stateBoard || "Which state?"}
                </Text>
              </View>

              <SGSelect
                label="Your state"
                placeholder="Choose your state"
                value={stateBoard}
                options={stateBoards}
                onChange={handleSelectBoard}
              />
              <SGSelect
                label="What do you study?"
                placeholder="Choose your class or course"
                value={classValue}
                options={classes.map((item) => {
                  const available = classesForBoard.includes(item.value);
                  return {
                    value: item.value,
                    label: classLabel(item.value),
                    section: COLLEGE.includes(item.value) ? "After Inter" : "School and Inter",
                    disabled: !available,
                    hint: available ? undefined : "Soon",
                  };
                })}
                onChange={handleSelectClass}
              />

              {stepTwoReady ? (
                <OnboardingActionButton
                  label="Start learning"
                  onPress={handleContinue}
                />
              ) : (
                <View className="min-h-[52px] items-center justify-center rounded-[14px] bg-sg-bg2">
                  <Text className="text-[15px] font-sg-semibold text-sg-muted">
                    {stateBoard ? "Choose what you study" : "Choose your state"}
                  </Text>
                </View>
              )}
            </>
          ) : null}
        </>
      )}
    </ScreenLayoutContainer>
  );
};

export default FirstPage;
