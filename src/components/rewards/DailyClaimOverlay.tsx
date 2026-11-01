import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import PressableScale from "../ui/PressableScale";
import FullScreenPaperBlast from "../ui/FullScreenPaperBlast";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

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

const OPEN_MS = 260;
const CLOSE_MS = 180;
const EASE_OUT = Easing.out(Easing.cubic);

// A plain view, not a Modal, with no loops: it must open instantly on budget phones.
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
  const reducedMotion = useReducedMotionPreference();
  const [isMounted, setIsMounted] = useState(visible);
  const [pressedClaim, setPressedClaim] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useSharedValue(0);
  const leaving = useSharedValue(0);

  const isLocked = Boolean(disabledReason) && !claimedToday;
  const claimDisabled = claimedToday || isLocked || isClaiming || pressedClaim;
  const hideForClaim = pressedClaim || isClaiming;

  useEffect(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    if (visible) {
      setIsMounted(true);
      setPressedClaim(false);
      leaving.value = 0;
      onRevealSound?.();
      open.value = reducedMotion
        ? 1
        : withTiming(1, { duration: OPEN_MS, easing: EASE_OUT });
      return undefined;
    }

    open.value = withTiming(0, { duration: CLOSE_MS });
    closeTimerRef.current = setTimeout(() => setIsMounted(false), CLOSE_MS + 40);
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [visible, reducedMotion]);

  useEffect(() => {
    leaving.value = withTiming(hideForClaim ? 1 : 0, { duration: CLOSE_MS });
  }, [hideForClaim]);

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: open.value * (1 - leaving.value),
  }));
  const cardStyle = useAnimatedStyle(() => ({
    opacity: open.value * (1 - leaving.value),
    transform: [{ translateY: (1 - open.value) * 28 }],
  }));

  const handleClaim = () => {
    if (claimDisabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onClaimSound?.();
    setPressedClaim(true);
    onClaim();
  };

  if (!isMounted) return null;

  return (
    <View
      pointerEvents={visible && !hideForClaim ? "auto" : "none"}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, zIndex: 60 }}
    >
      <Animated.View
        style={[
          scrimStyle,
          {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(15,40,31,0.6)",
          },
        ]}
      />

      <View className="flex-1 items-center justify-center px-5">
        <Animated.View
          style={cardStyle}
          className="w-full max-w-[392px] rounded-[22px] bg-[#14342A] px-5 pb-4 pt-5"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-3">
              <View className="flex-row items-center">
                <Text className="text-[24px] font-sg-display leading-[28px] text-[#F4EFE2]">
                  Daily reward
                </Text>
                {showStreakFlame ? (
                  <View className="ml-2 flex-row items-center rounded-[10px] bg-[#1C4336] px-2 py-1">
                    <Ionicons name="flame" size={12} color="#F2A05E" />
                    <Text className="ml-1 text-[12px] font-sg-bold text-[#F2A05E]">
                      {streakCount}d
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text className="mt-1 text-[14px] font-sg-medium text-[#B5C6BB]">
                Your coins for showing up today
              </Text>
            </View>
            <Pressable
              onPress={onDismiss}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityLabel="Close"
              className="h-11 w-11 items-center justify-center rounded-[14px] bg-[#1C4336] active:opacity-60"
            >
              <Ionicons name="close" size={18} color="#F4EFE2" />
            </Pressable>
          </View>

          <View className="mt-5 flex-row items-end justify-center">
            <Text
              className="text-[76px] leading-[84px] font-sg-display tracking-[-2px] text-[#F2B632]"
              style={{ fontVariant: ["tabular-nums"] }}
            >
              +{coinsToGive}
            </Text>
            <Text className="mb-3.5 ml-2 text-[18px] font-sg-semibold text-[#F4EFE2]">
              coins
            </Text>
          </View>

          <View ref={claimButtonRef} collapsable={false} className="mt-5">
            <PressableScale
              onPress={handleClaim}
              activeScale={0.98}
              disabled={claimDisabled}
              className={`min-h-[52px] flex-row items-center justify-center rounded-[14px] px-4 ${
                claimDisabled ? "bg-[#1C4336]" : "bg-[#F2B632]"
              }`}
            >
              {claimedToday || isLocked ? (
                <Ionicons
                  name={claimedToday ? "checkmark-circle" : "lock-closed"}
                  size={16}
                  color="#B5C6BB"
                  style={{ marginRight: 8 }}
                />
              ) : null}
              <Text
                className={`text-[15px] font-sg-bold ${
                  claimDisabled ? "text-[#B5C6BB]" : "text-[#14342A]"
                }`}
              >
                {claimedToday ? "Claimed" : isLocked ? "Locked" : "Claim coins"}
              </Text>
            </PressableScale>
          </View>

          {isLocked ? (
            <Text className="mt-3 text-center text-[13px] font-sg-medium text-[#B5C6BB]">
              Check-in resets tomorrow
            </Text>
          ) : !claimDisabled ? (
            <Pressable
              onPress={onDismiss}
              accessibilityRole="button"
              className="mt-1 min-h-[44px] items-center justify-center self-center px-4"
            >
              <Text className="text-[14px] font-sg-semibold text-[#B5C6BB]">Not now</Text>
            </Pressable>
          ) : null}
        </Animated.View>
      </View>

      {/* Mounted only on claim, so opening the popup never pays for it. */}
      {pressedClaim ? (
        <FullScreenPaperBlast
          visible
          triggerToken={1}
          seed={coinsToGive + streakCount + 7}
          waveDelays={[0]}
          piecesPerWave={reducedMotion ? 1 : 40}
          zIndex={65}
          quick
        />
      ) : null}
    </View>
  );
}
