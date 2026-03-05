import React, { useEffect, useMemo } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import PressableScale from "../../components/ui/PressableScale";
import { defaultConfig } from "../../config/remoteConfig";

const AnimatedView = Animated.createAnimatedComponent(View);

const { height: WINDOW_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = Math.round(WINDOW_HEIGHT * 0.6);
const BACKDROP_OPACITY = 0.4;

export default function ReferralBottomSheet({
  visible,
  mode,
  referralsCount = 0,
  rewardCoins = defaultConfig.referralRewardCoins,
  onClose,
  onShareNow,
}) {
  const translateY = useSharedValue(SHEET_HEIGHT);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 210,
        mass: 0.86,
      });
      backdropOpacity.value = withTiming(BACKDROP_OPACITY, { duration: 220 });
      return;
    }

    translateY.value = withTiming(SHEET_HEIGHT, {
      duration: 220,
      easing: Easing.out(Easing.cubic),
    });
    backdropOpacity.value = withTiming(0, { duration: 200 });
  }, [backdropOpacity, translateY, visible]);

  const closeWithAnimation = () => {
    translateY.value = withTiming(
      SHEET_HEIGHT,
      {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(onClose)();
        }
      }
    );
    backdropOpacity.value = withTiming(0, { duration: 180 });
  };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          if (!visible) return;
          const next = Math.max(0, event.translationY);
          translateY.value = next;
          backdropOpacity.value =
            BACKDROP_OPACITY * (1 - Math.min(next / SHEET_HEIGHT, 1));
        })
        .onEnd((event) => {
          if (!visible) return;
          const shouldClose = event.translationY > 120 || event.velocityY > 900;
          if (shouldClose) {
            translateY.value = withTiming(
              SHEET_HEIGHT,
              { duration: 220, easing: Easing.out(Easing.cubic) },
              (finished) => {
                if (finished) {
                  runOnJS(onClose)();
                }
              }
            );
            backdropOpacity.value = withTiming(0, { duration: 180 });
            return;
          }

          translateY.value = withSpring(0, {
            damping: 15,
            stiffness: 210,
            mass: 0.86,
          });
          backdropOpacity.value = withTiming(BACKDROP_OPACITY, {
            duration: 160,
          });
        }),
    [backdropOpacity, onClose, translateY, visible]
  );

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View
      pointerEvents={visible ? "auto" : "none"}
      className="absolute inset-0 z-40"
    >
      <Pressable className="absolute inset-0" onPress={closeWithAnimation}>
        <AnimatedView
          style={backdropStyle}
          className="absolute inset-0 bg-black"
        />
      </Pressable>

      <GestureDetector gesture={panGesture}>
        <AnimatedView
          style={sheetStyle}
          className="absolute bottom-0 left-0 right-0 rounded-t-[28px] border border-white/10 bg-[#121722] px-4 pb-6 pt-3"
        >
          <View className="mb-3 items-center">
            <View className="h-1.5 w-12 rounded-full bg-white/20" />
          </View>

          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-[18px] font-extrabold text-[#F5F7FF]">
              {mode === "invite" ? "Invite Friends" : "Referral Milestones"}
            </Text>

            <PressableScale
              activeScale={0.96}
              className="rounded-full border border-white/12 bg-[#191F2D] p-2"
              onPress={closeWithAnimation}
            >
              <Ionicons name="close" size={16} color="#F5F7FF" />
            </PressableScale>
          </View>

          {mode === "invite" ? (
            <View>
              <View className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
                <Text className="text-[12px] font-semibold text-[#B8C0D4]">
                  1. Share your referral code
                </Text>
                <Text className="mt-2 text-[12px] font-semibold text-[#B8C0D4]">
                  2. Friend applies your code and gets {rewardCoins} coins
                </Text>
                <Text className="mt-2 text-[12px] font-semibold text-[#B8C0D4]">
                  3. Friend shares confirmation token for your reward
                </Text>
              </View>

              <PressableScale
                activeScale={0.96}
                className="mt-4 min-h-[52px] items-center justify-center rounded-[14px] border border-[#FFD700]/45 bg-[#17130B]"
                onPress={onShareNow}
              >
                <Text className="text-[15px] font-extrabold text-[#F5F7FF]">
                  Share Invite Now
                </Text>
              </PressableScale>
            </View>
          ) : (
            <View>
              <View className="rounded-[16px] border border-white/10 bg-white/[0.04] p-4">
                <Text className="text-[12px] font-semibold text-[#B8C0D4]">
                  1 referral = {rewardCoins} coins
                </Text>
                <Text className="mt-2 text-[12px] font-semibold text-[#B8C0D4]">
                  5 referrals = +300 bonus coins
                </Text>
                <Text className="mt-2 text-[12px] font-semibold text-[#B8C0D4]">
                  10 referrals = +1000 bonus coins
                </Text>
              </View>

              <View className="mt-4 rounded-[16px] border border-white/10 bg-[#121826] px-4 py-3">
                <Text className="text-[11px] font-bold uppercase tracking-[1px] text-[#AAB3C9]">
                  Current referrals
                </Text>
                <Text className="mt-1 text-[26px] font-black text-[#F5F7FF]">
                  {referralsCount}
                </Text>
              </View>
            </View>
          )}
        </AnimatedView>
      </GestureDetector>
    </View>
  );
}
