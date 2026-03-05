import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import PressableScale from "../ui/PressableScale";

function RatingStar({ index, active, selectedStars, disabled, onPress }) {
  const popScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);

  useEffect(() => {
    if (selectedStars !== index) return;

    popScale.value = 1;
    pulseOpacity.value = 0;
    popScale.value = withSequence(
      withSpring(1.18, { damping: 10, stiffness: 320, mass: 0.42 }),
      withSpring(1, { damping: 13, stiffness: 260, mass: 0.52 })
    );
    pulseOpacity.value = withSequence(
      withTiming(0.22, { duration: 120 }),
      withTiming(0, { duration: 180 })
    );
  }, [index, popScale, pulseOpacity, selectedStars]);

  const iconScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: popScale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
    transform: [{ scale: 0.92 + pulseOpacity.value * 0.5 }],
  }));

  return (
    <PressableScale
      onPress={() => onPress(index)}
      activeScale={0.96}
      disabled={disabled}
      className="mx-1 h-[56px] w-[56px] items-center justify-center rounded-full border border-white/12 bg-[#1A1C2E]"
    >
      <Animated.View
        pointerEvents="none"
        style={pulseStyle}
        className="absolute inset-1 rounded-full border border-[#FFD76A]/45 bg-[#FFD76A]/12"
      />
      <Animated.View style={iconScaleStyle}>
        <Ionicons
          name={active ? "star" : "star-outline"}
          size={28}
          color={active ? "#FFD76A" : "#8F98AD"}
        />
      </Animated.View>
    </PressableScale>
  );
}

export default function ReviewPromptPopup({
  visible,
  onClose,
  onSubmit,
  submitting = false,
}) {
  const [mounted, setMounted] = useState(visible);
  const [selectedStars, setSelectedStars] = useState(0);
  const isClosingRef = useRef(false);

  const scrimOpacity = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.94);
  const cardTranslateY = useSharedValue(16);
  const actionsOpacity = useSharedValue(0);
  const actionsTranslateY = useSharedValue(8);

  useEffect(() => {
    if (!visible) return;
    setMounted(true);
    isClosingRef.current = false;
    setSelectedStars(0);

    scrimOpacity.value = withTiming(1, { duration: 180 });
    cardOpacity.value = withTiming(1, { duration: 180 });
    cardTranslateY.value = withTiming(0, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
    cardScale.value = withSpring(1, {
      damping: 14,
      stiffness: 190,
      mass: 0.82,
    });
    actionsOpacity.value = 0;
    actionsTranslateY.value = 8;
  }, [cardOpacity, cardScale, cardTranslateY, scrimOpacity, visible]);

  useEffect(() => {
    if (!visible) {
      setMounted(false);
      isClosingRef.current = false;
      setSelectedStars(0);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    if (selectedStars > 0) {
      actionsOpacity.value = withTiming(1, { duration: 180 });
      actionsTranslateY.value = withTiming(0, {
        duration: 180,
        easing: Easing.out(Easing.cubic),
      });
      return;
    }

    actionsOpacity.value = withTiming(0, { duration: 120 });
    actionsTranslateY.value = withTiming(8, { duration: 120 });
  }, [actionsOpacity, actionsTranslateY, selectedStars, visible]);

  useEffect(
    () => () => {
      cancelAnimation(scrimOpacity);
      cancelAnimation(cardOpacity);
      cancelAnimation(cardScale);
      cancelAnimation(cardTranslateY);
      cancelAnimation(actionsOpacity);
      cancelAnimation(actionsTranslateY);
    },
    [
      actionsOpacity,
      actionsTranslateY,
      cardOpacity,
      cardScale,
      cardTranslateY,
      scrimOpacity,
    ]
  );

  const finishClose = () => {
    setMounted(false);
    onClose?.();
  };

  const dismiss = () => {
    if (isClosingRef.current || submitting) return;
    isClosingRef.current = true;
    scrimOpacity.value = withTiming(0, { duration: 160 });
    cardOpacity.value = withTiming(0, { duration: 160 });
    cardScale.value = withTiming(0.96, { duration: 180 });
    cardTranslateY.value = withTiming(12, { duration: 180 }, (finished) => {
      if (finished) {
        runOnJS(finishClose)();
      }
    });
  };

  const handleSubmit = async () => {
    if (submitting || selectedStars < 1) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
      () => {}
    );
    onSubmit?.(selectedStars);
  };

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimOpacity.value,
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));
  const actionsStyle = useAnimatedStyle(() => ({
    opacity: actionsOpacity.value,
    transform: [{ translateY: actionsTranslateY.value }],
  }));

  const isPositiveRating = selectedStars >= 4;
  const primaryCtaLabel = isPositiveRating ? "Rate on Play Store" : "Send Feedback";
  const helperCopy = isPositiveRating
    ? "It helps other students discover us."
    : "Tell us what we can improve.";

  const onSelectStar = useCallback(
    async (star) => {
      setSelectedStars(star);
      await Haptics.selectionAsync().catch(() => {});
    },
    []
  );

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
      <View className="flex-1 items-center justify-center px-5">
        <Animated.View style={scrimStyle} className="absolute inset-0">
          <Pressable
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(10,10,10,0.78)" }}
            onPress={dismiss}
          />
        </Animated.View>

        <Animated.View
          style={cardStyle}
          className="w-full max-w-[380px] rounded-[26px] border border-white/14 bg-[#151B28] px-5 pb-5 pt-5"
        >
          <Text className="text-center text-[24px] font-black text-white">
            Enjoying StudyGarage?
          </Text>
          <Text className="mt-2 text-center text-[13px] font-medium text-[#B8C0D4]">
            Tap a star to rate your experience
          </Text>

          <View className="mt-5 flex-row items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= selectedStars;
              return (
                <RatingStar
                  key={star}
                  index={star}
                  active={active}
                  selectedStars={selectedStars}
                  disabled={submitting}
                  onPress={onSelectStar}
                />
              );
            })}
          </View>

          {selectedStars > 0 ? (
            <Animated.View style={actionsStyle} className="mt-5">
              <Text className="mb-3 text-center text-[12px] font-semibold text-[#C8D0E4]">
                {helperCopy}
              </Text>

              <View className="flex-row items-center">
                <PressableScale
                  onPress={handleSubmit}
                  activeScale={0.96}
                  disabled={submitting}
                  containerClassName="mr-2 flex-1"
                  className={`min-h-[48px] items-center justify-center rounded-[14px] border px-3 py-3 ${
                    submitting
                      ? "border-white/12 bg-[#1A1C2E]/70"
                      : "border-white/10 bg-[#1A1C2E]"
                  }`}
                >
                  <Text className="text-center text-[14px] font-bold text-[#F5F7FF]">
                    {submitting
                      ? isPositiveRating
                        ? "Opening..."
                        : "Sending..."
                      : primaryCtaLabel}
                  </Text>
                </PressableScale>

                <PressableScale
                  onPress={dismiss}
                  activeScale={0.96}
                  containerClassName="ml-2 flex-1"
                  className="min-h-[48px] items-center justify-center rounded-[14px] border border-white/14 bg-transparent px-3 py-3"
                >
                  <Text className="text-center text-[14px] font-bold text-[#F5F7FF]">
                    Not now
                  </Text>
                </PressableScale>
              </View>
            </Animated.View>
          ) : null}
        </Animated.View>
      </View>
    </Modal>
  );
}
