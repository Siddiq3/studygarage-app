import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clipboard, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ScreenLayoutContainer from "../../design-system/components/ScreenLayoutContainer";
import SGCard from "../../design-system/components/SGCard";
import SGButton from "../../design-system/components/SGButton";
import PressableScale from "../../components/ui/PressableScale";
import { useQuizContext } from "../../../QuizContext";
import useReferral from "../../hooks/useReferral";
import useReferralAnimations from "./useReferralAnimations";
import ReferralStreakRibbon from "./ReferralStreakRibbon";
import ReferralProgressBar from "./ReferralProgressBar";
import ReferralStatsCounter from "./ReferralStatsCounter";
import CoinAnimatedValue from "./CoinAnimatedValue";
import ReferralBottomSheet from "./ReferralBottomSheet";

const AnimatedView = Animated.createAnimatedComponent(View);

const COIN_PARTICLES = [
  { id: "p1", x: -54, y: -56, size: 12 },
  { id: "p2", x: -28, y: -76, size: 10 },
  { id: "p3", x: -8, y: -64, size: 9 },
  { id: "p4", x: 14, y: -86, size: 10 },
  { id: "p5", x: 34, y: -60, size: 12 },
  { id: "p6", x: 52, y: -72, size: 10 },
  { id: "p7", x: 20, y: -44, size: 8 },
  { id: "p8", x: -18, y: -46, size: 8 },
];

function CoinBurstParticle({ progress, config }) {
  const style = useAnimatedStyle(() => {
    const p = progress.value;
    const active = p > 0 && p < 1.01;
    const eased = 1 - Math.pow(1 - Math.min(Math.max(p, 0), 1), 3);
    return {
      opacity: active ? 1 - eased : 0,
      transform: [
        { translateX: (config.x * eased) / 1.1 },
        { translateY: (config.y * eased) / 1.1 },
        { scale: 0.72 + (1 - eased) * 0.42 },
      ],
    };
  });

  return (
    <AnimatedView
      pointerEvents="none"
      style={style}
      className="absolute left-1/2 top-1/2"
    >
      <View
        className="-ml-1.5 -mt-1.5 items-center justify-center rounded-full border border-[#FFD700]/55 bg-[#FFD700]/20"
        style={{ width: config.size, height: config.size }}
      >
        <View className="h-[3px] w-[3px] rounded-full bg-[#FFD700]" />
      </View>
    </AnimatedView>
  );
}

export default function ReferralScreen({ navigation }) {
  const { totalScore } = useQuizContext();
  const {
    isReady,
    myCode,
    invitesSharedCount,
    referralsAppliedCount,
    claimToken,
    referralRewardCoins,
    shareInvite,
  } = useReferral();

  const [toastText, setToastText] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [sheetMode, setSheetMode] = useState<"invite" | "milestones" | null>(
    null
  );
  const toastTimerRef = useRef(null);
  const prevClaimCountRef = useRef(referralsAppliedCount);

  const {
    cardScale,
    chipScale,
    chipGlowOpacity,
    copySparkle,
    shareBurst,
    claimedCountScale,
    toastOpacity,
    toastTranslateY,
    playCopyFeedback,
    playShareFeedback,
    playClaimFeedback,
    showToastAnimation,
    hideToastAnimation,
  } = useReferralAnimations();

  useEffect(
    () => () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    const previous = prevClaimCountRef.current;
    if (referralsAppliedCount > previous) {
      playClaimFeedback();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
    }
    prevClaimCountRef.current = referralsAppliedCount;
  }, [playClaimFeedback, referralsAppliedCount]);

  const streakDays = useMemo(() => {
    const base = Math.max(
      referralsAppliedCount,
      Math.floor(invitesSharedCount / 2)
    );
    return Math.max(0, Math.min(30, base));
  }, [invitesSharedCount, referralsAppliedCount]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const chipStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chipScale.value }],
  }));

  const chipGlowStyle = useAnimatedStyle(() => ({
    opacity: chipGlowOpacity.value,
    transform: [{ scale: 0.96 + chipGlowOpacity.value }],
  }));

  const claimedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: claimedCountScale.value }],
  }));

  const sparklePrimaryStyle = useAnimatedStyle(() => {
    const p = Math.min(Math.max(copySparkle.value, 0), 1);
    const active = p > 0 && p < 1.01;
    return {
      opacity: active ? 1 - p : 0,
      transform: [
        { translateX: -10 * p },
        { translateY: -16 * p },
        { scale: 0.84 + (1 - p) * 0.35 },
      ],
    };
  });

  const sparkleSecondaryStyle = useAnimatedStyle(() => {
    const p = Math.min(Math.max(copySparkle.value, 0), 1);
    const active = p > 0 && p < 1.01;
    return {
      opacity: active ? (1 - p) * 0.9 : 0,
      transform: [
        { translateX: 12 * p },
        { translateY: -10 * p },
        { scale: 0.8 + (1 - p) * 0.32 },
      ],
    };
  });

  const toastStyle = useAnimatedStyle(() => ({
    opacity: toastOpacity.value,
    transform: [{ translateY: toastTranslateY.value }],
  }));

  const showToast = useCallback(
    (message: string) => {
      setToastText(message);
      setToastVisible(true);
      showToastAnimation();

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      toastTimerRef.current = setTimeout(() => {
        hideToastAnimation();
        setTimeout(() => {
          setToastVisible(false);
        }, 210);
      }, 1450);
    },
    [hideToastAnimation, showToastAnimation]
  );

  const handleCopyCode = useCallback(() => {
    if (!myCode) return;

    let copied = false;
    if (Clipboard && typeof Clipboard.setString === "function") {
      Clipboard.setString(myCode);
      copied = true;
    }

    playCopyFeedback();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    showToast(copied ? "Copied" : "Copy not available");
  }, [myCode, playCopyFeedback, showToast]);

  const handleShareInviteNow = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    const result = await shareInvite();

    if (result.shared) {
      playShareFeedback();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );
      showToast("Invite shared");
      setSheetMode(null);
      return;
    }

    showToast("Share canceled");
  }, [playShareFeedback, shareInvite, showToast]);

  const codeText = isReady ? myCode : "SG......";

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <View className="mt-1 flex-row items-start justify-between gap-3">
        <ReferralStreakRibbon streakDays={streakDays} />
        <CoinAnimatedValue value={totalScore} />
      </View>

      <Animated.View entering={FadeInDown.duration(220)} className="mt-2">
        <Text
          className="text-[31px] font-extrabold leading-[34px] text-[#F5F7FF]"
          style={{ fontFamily: "Inter_700Bold", letterSpacing: -0.45 }}
        >
          Invite. Earn. Grow.
        </Text>
        <Text
          className="mt-2 text-[13px] leading-[20px] text-[#B8C0D4]"
          style={{ fontFamily: "Inter_500Medium", opacity: 0.9 }}
        >
          Earn {referralRewardCoins} coins for every friend who joins
          StudyGarage.
        </Text>
      </Animated.View>

      <AnimatedView
        entering={FadeInUp.delay(60).duration(260)}
        style={cardStyle}
        className="mt-5"
      >
        <SGCard className="overflow-visible rounded-[24px] border-white/10 bg-white/[0.06] px-5 py-5">
          <View className="relative self-start">
            <AnimatedView
              pointerEvents="none"
              style={chipGlowStyle}
              className="absolute -inset-2 rounded-full bg-[#FFD700]/10"
            />
            <AnimatedView
              style={chipStyle}
              className="flex-row items-center rounded-full border border-[#FFD700]/45 bg-[#FFD700]/12 px-3.5 py-1.5"
            >
              <Ionicons name="logo-bitcoin" size={14} color="#FFD700" />
              <Text
                className="ml-1.5 text-[12px] font-extrabold text-[#FFD700]"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                +{referralRewardCoins} Coins
              </Text>
            </AnimatedView>
          </View>

          <View className="mt-4 rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
            <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-[#B8C0D4]">
              My Referral Code
            </Text>

            <PressableScale
              className="relative mt-2 items-center justify-center rounded-[14px] border border-white/10 bg-[#0F141D] px-3 py-3"
              activeScale={0.985}
              onPress={handleCopyCode}
            >
              <Text
                className="text-[30px] font-black tracking-[2.4px] text-[#F5F7FF]"
                style={{ fontFamily: "monospace" }}
                selectable
              >
                {codeText}
              </Text>

              <AnimatedView
                pointerEvents="none"
                style={sparklePrimaryStyle}
                className="absolute right-6 top-3"
              >
                <Ionicons name="sparkles" size={12} color="#FFD700" />
              </AnimatedView>
              <AnimatedView
                pointerEvents="none"
                style={sparkleSecondaryStyle}
                className="absolute right-10 top-5"
              >
                <Ionicons name="ellipse" size={8} color="#FFD700" />
              </AnimatedView>
            </PressableScale>

            <Text className="mt-2 text-[11px] font-medium text-[#B8C0D4]/90">
              Tap code to copy instantly and share with your friend.
            </Text>
          </View>

          <View className="mt-4 flex-row gap-3">
            <PressableScale
              className="min-h-[50px] flex-1 items-center justify-center rounded-[14px] border border-white/12 bg-[#171C26]"
              activeScale={0.96}
              onPress={handleCopyCode}
            >
              <View className="flex-row items-center">
                <Ionicons name="copy-outline" size={16} color="#F5F7FF" />
                <Text className="ml-2 text-[14px] font-bold text-[#F5F7FF]">
                  Copy Code
                </Text>
              </View>
            </PressableScale>

            <PressableScale
              className="min-h-[50px] flex-1 items-center justify-center rounded-[14px] border border-[#36D8A3]/55 bg-[#0F1D19]"
              activeScale={0.96}
              onPress={() => setSheetMode("invite")}
            >
              <View className="relative flex-row items-center justify-center">
                <Ionicons
                  name="share-social-outline"
                  size={16}
                  color="#36D8A3"
                />
                <Text className="ml-2 text-[14px] font-bold text-[#F5F7FF]">
                  Invite Friends
                </Text>

                <View
                  pointerEvents="none"
                  className="absolute left-1/2 top-1/2"
                >
                  {COIN_PARTICLES.map((particle) => (
                    <CoinBurstParticle
                      key={particle.id}
                      progress={shareBurst}
                      config={particle}
                    />
                  ))}
                </View>
              </View>
            </PressableScale>
          </View>

          <Text className="mt-4 text-[11px] font-medium text-[#B8C0D4]">
            Referral rewards are verified by confirmation code (offline).
          </Text>
        </SGCard>
      </AnimatedView>

      <Animated.View
        entering={FadeInDown.delay(90).duration(220)}
        className="mt-4"
      >
        <ReferralProgressBar
          referralsCount={referralsAppliedCount}
          onViewMilestones={() => setSheetMode("milestones")}
        />
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(120).duration(220)}
        className="mt-4"
      >
        <SGCard className="rounded-[22px] border-white/10 bg-white/[0.05]">
          <View className="mb-3 flex-row items-center justify-between">
            <ReferralStatsCounter
              value={referralsAppliedCount}
              label="Referral Activity"
            />

            <View className="rounded-[14px] border border-white/10 bg-[#121722] px-3 py-3">
              <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#AAB3C9]">
                Shared
              </Text>
              <Text className="mt-1 text-[20px] font-black text-[#F5F7FF]">
                {invitesSharedCount}
              </Text>
            </View>
          </View>

          <View className="rounded-[14px] border border-white/10 bg-[#121722] px-3 py-3">
            <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#AAB3C9]">
              Claimed Rewards
            </Text>
            <Animated.Text
              style={claimedCountStyle}
              className="mt-1 text-[22px] font-black text-[#F5F7FF]"
            >
              {referralsAppliedCount}
            </Animated.Text>
          </View>

          {claimToken ? (
            <View className="mt-3 rounded-[14px] border border-[#FFD700]/30 bg-[#2A2312] px-3 py-3">
              <Text className="text-[10px] font-bold uppercase tracking-[1px] text-[#FFD700]">
                Latest Claim Token
              </Text>
              <Text className="mt-1 text-[12px] font-semibold text-[#FFE9AE]">
                {claimToken}
              </Text>
            </View>
          ) : null}
        </SGCard>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(140).duration(210)}
        className="mt-4 mb-2"
      >
        <SGButton
          label="Apply Referral Code"
          variant="ghost"
          className="mb-3"
          onPress={() => navigation.navigate("ApplyReferralScreen")}
        />
        <SGButton
          label="Claim Referral Reward"
          variant="ghost"
          onPress={() => navigation.navigate("ClaimRewardScreen")}
        />
      </Animated.View>

      {toastVisible ? (
        <AnimatedView
          pointerEvents="none"
          style={toastStyle}
          className="absolute bottom-10 left-4 right-4 items-center"
        >
          <View className="rounded-full border border-white/12 bg-[#151B27] px-4 py-2">
            <Text className="text-[12px] font-semibold text-[#F5F7FF]">
              {toastText}
            </Text>
          </View>
        </AnimatedView>
      ) : null}

      <ReferralBottomSheet
        visible={Boolean(sheetMode)}
        mode={sheetMode}
        referralsCount={referralsAppliedCount}
        rewardCoins={referralRewardCoins}
        onShareNow={handleShareInviteNow}
        onClose={() => {
          if (sheetMode) {
            setSheetMode(null);
          }
        }}
      />
    </ScreenLayoutContainer>
  );
}
