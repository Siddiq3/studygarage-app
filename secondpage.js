import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BackHandler,
  Image,
  InteractionManager,
  Linking,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  cancelAnimation,
  Easing,
    interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import Snackbar from "react-native-snackbar";
import { useQuizContext } from "./QuizContext";
import CoinIcon from "./assets/coin.png";
import Menu from "./Menu";
import Ts from "./Ts";
import Sscka from "./10thka";
import Apinter from "./apinter";
import Class6 from "./Cls6to9/Class6";
import Class7 from "./Cls6to9/Class7";
import Class8 from "./Cls6to9/Class8";
import Class9 from "./Cls6to9/Class9";
import Class9ka from "./KA CLASS 6TO9/Class9";
import Class8ka from "./KA CLASS 6TO9/Class8";
import Class7ka from "./KA CLASS 6TO9/Class7";
import Class6ka from "./KA CLASS 6TO9/Class6";
import MainPage from "./sidemenu";
import ScreenLayoutContainer, {
  ScreenChromeContext,
} from "./src/design-system/components/ScreenLayoutContainer";
import SGSectionHeader from "./src/design-system/components/SGSectionHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SGEmptyState from "./src/design-system/components/SGEmptyState";
import PressableScale from "./src/components/ui/PressableScale";
import { useStreak } from "./src/services/streak/useStreak";
import useActiveStudyTimer from "./src/hooks/useActiveStudyTimer";
import useRewardModalManager, {
  REWARD_MODALS,
} from "./src/hooks/useRewardModalManager";
import useAppBoot from "./src/hooks/useAppBoot";
import Coin from "./src/components/rewards/Coin";
import CoinFlyOverlay from "./src/components/ui/CoinFlyOverlay";
import DailyClaimOverlay from "./src/components/rewards/DailyClaimOverlay";
import StreakCelebrationOverlay from "./src/components/streak/StreakCelebrationOverlay";
import StreakIntroPopup from "./src/components/streak/StreakIntroPopup";
import ReviewPromptPopup from "./src/components/review/ReviewPromptPopup";
import MiniToast from "./src/components/ui/MiniToast";
import PromoCard from "./src/components/promo/PromoCard";
import { useDailyCheckIn } from "./src/hooks/useDailyCheckIn";
import useDailyClaimGate from "./src/hooks/useDailyClaimGate";
import { localStore } from "./src/services/storage/localStore";
import { toLocalDateKey } from "./src/utils/dateKey";
import useAppSound from "./src/hooks/useAppSound";
import useReviewPrompt from "./src/hooks/useReviewPrompt";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const defaultAvatarImage = require("./assets/boy.png");
const girlAvatarImage = require("./assets/girl-matching-no-glasses.png");
const dockItems = [
  { key: "home", label: "Home", icon: "home-outline" },
  { key: "learn", label: "Learn", icon: "book-outline" },
  { key: "quiz", label: "Quiz", icon: "help-circle-outline" },
  { key: "library", label: "Library", icon: "library-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
];
const PROFILE_DRAWER_WIDTH = 280;
const PROFILE_DRAWER_TAP_GUARD_MS = 180;
const DAILY_CHECKIN_COINS = 10;
const DAILY_CLAIM_POPUP_FIRST_INSTALL_DELAY_MS = 3600;
const DAILY_CLAIM_POPUP_RETURN_DELAY_MS = 2800;
const DAILY_POPUP_SCROLL_IDLE_MS = 1200;
const WHATSAPP_CHANNEL_ID = "0029VaAYOji89inaJs4Jhq3U";
const WHATSAPP_CHANNEL_WEB_URL = `https://www.whatsapp.com/channel/${WHATSAPP_CHANNEL_ID}`;
const WHATSAPP_CHANNEL_ALT_WEB_URL = `https://whatsapp.com/channel/${WHATSAPP_CHANNEL_ID}`;
const WHATSAPP_CHANNEL_DEEP_LINK = `whatsapp://channel/${WHATSAPP_CHANNEL_ID}`;
const WHATSAPP_CHANNEL_INTENT_URL = `intent://channel/${WHATSAPP_CHANNEL_ID}#Intent;scheme=whatsapp;package=com.whatsapp;S.browser_fallback_url=${encodeURIComponent(
  WHATSAPP_CHANNEL_WEB_URL
)};end`;

const ACTION_TONES = {
  quiz: { bg: "#F2B632", ink: "#14342A", hint: "#3A3A22" },
  default: { bg: "#2B6A8F", ink: "#F4EFE2", hint: "#D7E6EF" },
  rewards: { bg: "#8C2F4B", ink: "#F4EFE2", hint: "#F0D9DF" },
};

function ActionTile({ icon, label, hint, tone = "default", tilt = "0deg", onPress }) {
  const colors = ACTION_TONES[tone] || ACTION_TONES.default;

  return (
    <PressableScale
      onPress={onPress}
      activeScale={0.97}
      containerClassName="flex-1"
      className="min-h-[112px] justify-between rounded-[18px] p-3"
      style={{ backgroundColor: colors.bg, transform: [{ rotate: tilt }] }}
    >
      <Ionicons name={icon} size={26} color={colors.ink} />
      <View>
        <Text className="text-[16px] font-sg-display" style={{ color: colors.ink }}>
          {label}
        </Text>
        <Text className="text-[12px] font-sg-medium" style={{ color: colors.hint }}>
          {hint}
        </Text>
      </View>
    </PressableScale>
  );
}

function BoardBand() {
  const { setBandColor } = useContext(ScreenChromeContext);
  useEffect(() => {
    setBandColor("#14342A");
    return () => setBandColor(null);
  }, [setBandColor]);
  return <StatusBar style="light" />;
}

function CommunityIconButton({ icon, label, onPress }) {
  return (
    <PressableScale
      onPress={onPress}
      activeScale={0.95}
      accessibilityLabel={label}
      className="min-h-[64px] items-center justify-center px-2"
    >
      <Ionicons name={icon} size={22} color="#47544D" />
      <Text className="mt-1 text-[12px] font-sg-medium text-sg-muted">
        {label}
      </Text>
    </PressableScale>
  );
}

function MissionStep({ done, label }) {
  return (
    <View className="mr-4 flex-row items-center">
      <Ionicons
        name={done ? "checkmark-circle" : "ellipse-outline"}
        size={16}
        color={done ? "#8FD9B4" : "#B5C6BB"}
      />
      <Text className="ml-1.5 text-[13px] font-sg-medium text-[#F4EFE2]">
        {label}
      </Text>
    </View>
  );
}

const SecondPage = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const isScreenFocused = useIsFocused();
  const { totalScore, awardCoinsWithMirror, coinStateReady } = useQuizContext();
  const {
    isReady: streakReady,
    streakCount,
    igniteToday,
    milestoneReached,
    tomorrowTeaser,
    dailyQuizCompleted,
    dailyUsageMinutes,
    minUsageMinutes,
    streakMilestones,
    streakTarget,
    streakBonusCoins,
    streakProgressPct,
    streakProgressLabel,
    motivationalLine,
    recordActiveStudySeconds,
    shouldShowStreakIncrementPopup,
    consumeStreakIncrementPopup,
    markStreakIncrementPopupShown,
  } = useStreak();
  const {
    isReady: dailyCheckInReady,
    claimedToday,
    disabledReason: dailyCheckInDisabledReason,
    claim: claimDailyCheckIn,
  } = useDailyCheckIn();

  const routeParams = route?.params || {};
  const userName = routeParams?.userName || "Student";
  const stateBoard = routeParams?.stateBoard || "Andhra Pradesh";
  const classValue = routeParams?.classValue || "10thClass";
  const avatar = routeParams?.avatar || "boy";
  const walletPulseOnce = routeParams?.walletPulseOnce === true;
  const { playSound } = useAppSound();

  const drawerTapGuardRef = useRef(0);
  const drawerCloseTokenRef = useRef(0);
  const walletPillRef = useRef(null);
  const streakIconRef = useRef(null);
  const dailyClaimButtonRef = useRef(null);
  const hasPlayedWalletPulse = useRef(false);
  const scoreRafRef = useRef(null);
  const claimBaseBalanceRef = useRef(totalScore);
  const streakIntroQueuedRef = useRef(false);
  const reviewPromptCheckDoneRef = useRef(false);
  const dailyClaimStartedAtRef = useRef(0);
  const dailyPopupShowDelayTimerRef = useRef(null);
  const dailyPopupIdleRetryTimerRef = useRef(null);
  const dailyPopupInteractionTaskRef = useRef(null);
  const scrollIdleTimerRef = useRef(null);
  const scrollViewRef = useRef(null);
  const moduleSectionOffsetRef = useRef(0);
  const pendingDailyPopupRef = useRef(false);
  const isUserScrollingRef = useRef(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerPanelWidth, setDrawerPanelWidth] =
    useState(PROFILE_DRAWER_WIDTH);
  const [isSecondPage] = useState(true);
  const [activeDock, setActiveDock] = useState("home");
  const [displayWalletScore, setDisplayWalletScore] = useState(
    coinStateReady ? totalScore : null
  );
  const [isClaimingDailyCheckIn, setIsClaimingDailyCheckIn] = useState(false);
  const [coinFlyStartLayout, setCoinFlyStartLayout] = useState(null);
  const [coinFlyEndLayout, setCoinFlyEndLayout] = useState(null);
  const [coinFlyVisible, setCoinFlyVisible] = useState(false);
  const [showDailyClaimPopup, setShowDailyClaimPopup] = useState(false);
  const [dailyClaimFlowActive, setDailyClaimFlowActive] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [miniToast, setMiniToast] = useState({ visible: false, message: "" });

  const { isBootReady, isFirstInstallOpen, markDailyRewardClaimed } =
    useAppBoot();
  const {
    isReady: dailyClaimGateReady,
    shouldShow: shouldShowDailyClaimGate,
    markClaimedToday: markDailyClaimGateClaimed,
    dismissSession: dismissDailyClaimSession,
  } = useDailyClaimGate({ cooldownMinutes: 10 });

  const {
    activeModal,
    closeActiveModal,
    dismissQueuedModal,
    queueDailyRewardOnOpen,
    queueStreakIntro,
    triggerStreakIncreased,
    queueReviewPrompt,
    isDailyVisible,
    isStreakIntroVisible,
    isStreakIncreasedVisible,
    isReviewVisible,
  } = useRewardModalManager();
  const { shouldQueueReviewPrompt, submitRating, dismissForLater } =
    useReviewPrompt();

  const { activeStudySecondsToday: trackedActiveSeconds, registerInteraction } =
    useActiveStudyTimer({
      isEligibleScreen:
        activeDock === "learn" ||
        activeDock === "quiz" ||
        activeDock === "library",
      onThirtyMinutesReached: () => {
        if (!dailyQuizCompleted) {
          setMiniToast({
            visible: true,
            message: "30 mins completed 🔥 1/2 for streak",
          });
        }
      },
    });

  const dailyPopupRequested =
    showDailyClaimPopup ||
    dailyClaimFlowActive ||
    isClaimingDailyCheckIn ||
    coinFlyVisible;
  const dailyClaimOverlayVisible = isDailyVisible && dailyPopupRequested;
  const streakCelebrationVisible = isStreakIncreasedVisible;
  const streakIntroVisible = isStreakIntroVisible;
  const reviewPromptVisible = isReviewVisible;

  const walletScale = useSharedValue(1);
  const day7RewardFly = useSharedValue(0);
  const streakIconScale = useSharedValue(1);
  const streakRippleScale = useSharedValue(0);
  const streakRippleOpacity = useSharedValue(0);
  const streakOverlayDepth = useSharedValue(0);
  const drawerOpenProgress = useSharedValue(0);

  const walletAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: walletScale.value }],
  }));

  const day7RewardFlyStyle = useAnimatedStyle(() => ({
    opacity: day7RewardFly.value < 0.12 ? 0 : 1 - day7RewardFly.value,
    transform: [
      { translateX: -126 + 126 * day7RewardFly.value },
      { translateY: 72 - 120 * day7RewardFly.value },
      { scale: 1 - day7RewardFly.value * 0.2 },
    ],
  }));

  const streakIconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakIconScale.value }],
  }));

  const streakRippleStyle = useAnimatedStyle(() => ({
    opacity: streakRippleOpacity.value,
    transform: [{ scale: 1 + streakRippleScale.value * 0.85 }],
  }));

  const profileDrawerScrimStyle = useAnimatedStyle(() => ({
    opacity: drawerOpenProgress.value * 0.55,
  }));

  const profileDrawerPanelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          drawerOpenProgress.value,
          [0, 1],
          [-(drawerPanelWidth || PROFILE_DRAWER_WIDTH), 0]
        ),
      },
    ],
  }));

  const homeDepthStyle = useAnimatedStyle(() => {
    const scaleDrop = Math.min(0.04, streakOverlayDepth.value * 0.02);
    const rotateAmount = Math.min(1.2, streakOverlayDepth.value * 0.9);
    const translateAmount = Math.min(12, streakOverlayDepth.value * 11);

    return {
      transform: [
        { scale: 1 - scaleDrop },
        { rotateZ: `${-rotateAmount}deg` },
        { translateY: translateAmount },
      ],
    };
  });

  const componentLookup = {
    "Andhra Pradesh-10thClass": <Menu navigation={navigation} />,
    "Andhra Pradesh-6thClass": <Class6 navigation={navigation} />,
    "Andhra Pradesh-7thClass": <Class7 navigation={navigation} />,
    "Andhra Pradesh-8thClass": <Class8 navigation={navigation} />,
    "Andhra Pradesh-9thClass": <Class9 navigation={navigation} />,
    "Andhra Pradesh-Inter": <Apinter navigation={navigation} />,
    "Telangana-10thClass": <Ts navigation={navigation} />,
    "Karnataka-10thClass": <Sscka navigation={navigation} />,
    "Karnataka-9thClass": <Class9ka navigation={navigation} />,
    "Karnataka-8thClass": <Class8ka navigation={navigation} />,
    "Karnataka-7thClass": <Class7ka navigation={navigation} />,
    "Karnataka-6thClass": <Class6ka navigation={navigation} />,
  };

  const lookupKey = `${stateBoard}-${classValue}`;
  const ComponentToRender = componentLookup[lookupKey];
  const libraryRouteMap = {
    "Andhra Pradesh-10thClass": "Textbook",
    "Andhra Pradesh-6thClass": "6thclass tb",
    "Andhra Pradesh-7thClass": "7thclass tb",
    "Andhra Pradesh-8thClass": "8thclass tb",
    "Andhra Pradesh-9thClass": "9thclass tb",
    "Karnataka-10thClass": "textbookska",
  };

  const clearScrollIdleTimer = useCallback(() => {
    if (scrollIdleTimerRef.current) {
      clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = null;
    }
  }, []);

  const clearDailyPopupSchedule = useCallback(() => {
    if (dailyPopupShowDelayTimerRef.current) {
      clearTimeout(dailyPopupShowDelayTimerRef.current);
      dailyPopupShowDelayTimerRef.current = null;
    }
    if (dailyPopupIdleRetryTimerRef.current) {
      clearTimeout(dailyPopupIdleRetryTimerRef.current);
      dailyPopupIdleRetryTimerRef.current = null;
    }
    if (dailyPopupInteractionTaskRef.current?.cancel) {
      dailyPopupInteractionTaskRef.current.cancel();
    }
    dailyPopupInteractionTaskRef.current = null;
  }, []);

  const tryShowPendingDailyPopup = useCallback(() => {
    if (!pendingDailyPopupRef.current) return false;
    if (!isScreenFocused) return false;
    if (isUserScrollingRef.current) return false;
    if (drawerOpen) return false;
    if (activeModal && !isDailyVisible) return false;

    pendingDailyPopupRef.current = false;
    setShowDailyClaimPopup(true);
    setDailyClaimFlowActive(false);
    return true;
  }, [activeModal, drawerOpen, isDailyVisible, isScreenFocused]);

  const queueDailyPopupWhenIdle = useCallback(
    (baseDelayMs) => {
      clearDailyPopupSchedule();
      pendingDailyPopupRef.current = true;

      // Scroll lock root-cause fix:
      // Delay popup until native interactions settle + user is idle.
      // This avoids mounting a full-screen modal while ScrollView is actively dragging.
      dailyPopupInteractionTaskRef.current =
        InteractionManager.runAfterInteractions(() => {
          if (!pendingDailyPopupRef.current) return;
          dailyPopupShowDelayTimerRef.current = setTimeout(() => {
            const attemptOpen = () => {
              if (tryShowPendingDailyPopup()) {
                return;
              }
              if (!pendingDailyPopupRef.current || !isScreenFocused) {
                return;
              }
              dailyPopupIdleRetryTimerRef.current = setTimeout(
                attemptOpen,
                280
              );
            };

            attemptOpen();
            dailyPopupShowDelayTimerRef.current = null;
          }, baseDelayMs);
        });
    },
    [clearDailyPopupSchedule, isScreenFocused, tryShowPendingDailyPopup]
  );

  const markUserIdleSoon = useCallback(() => {
    clearScrollIdleTimer();
    scrollIdleTimerRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
      tryShowPendingDailyPopup();
    }, DAILY_POPUP_SCROLL_IDLE_MS);
  }, [clearScrollIdleTimer, tryShowPendingDailyPopup]);

  const handleMainScrollBeginDrag = useCallback(() => {
    isUserScrollingRef.current = true;
    clearScrollIdleTimer();
    registerInteraction();
  }, [clearScrollIdleTimer, registerInteraction]);

  const handleMainScrollEndDrag = useCallback(() => {
    markUserIdleSoon();
  }, [markUserIdleSoon]);

  const handleMainMomentumEnd = useCallback(() => {
    markUserIdleSoon();
  }, [markUserIdleSoon]);

  useEffect(() => {
    if (!walletPulseOnce || hasPlayedWalletPulse.current) {
      return;
    }

    hasPlayedWalletPulse.current = true;
    walletScale.value = withDelay(
      120,
      withSequence(
        withSpring(1.08, { damping: 10, stiffness: 240 }),
        withSpring(1, { damping: 14, stiffness: 220 })
      )
    );

    navigation.setParams({ walletPulseOnce: false });
  }, [navigation, walletPulseOnce, walletScale]);

  useEffect(() => {
    recordActiveStudySeconds(trackedActiveSeconds);
  }, [recordActiveStudySeconds, trackedActiveSeconds]);

  useEffect(() => {
    if (milestoneReached !== streakTarget) {
      return;
    }

    day7RewardFly.value = 0;
    day7RewardFly.value = withTiming(1, { duration: 860 });

    walletScale.value = withSequence(
      withSpring(1.14, { damping: 10, stiffness: 250 }),
      withSpring(1, { damping: 13, stiffness: 220 })
    );
  }, [day7RewardFly, milestoneReached, streakTarget, walletScale]);

  useEffect(() => {
    if (!coinStateReady) {
      return;
    }
    if (isClaimingDailyCheckIn || coinFlyVisible) {
      return;
    }
    setDisplayWalletScore(totalScore);
    claimBaseBalanceRef.current = totalScore;
  }, [coinFlyVisible, coinStateReady, isClaimingDailyCheckIn, totalScore]);

  useEffect(() => {
    if (!dailyPopupRequested) return;
    queueDailyRewardOnOpen();
  }, [dailyPopupRequested, queueDailyRewardOnOpen]);

  useEffect(() => {
    if (!routeParams?.forceDailyClaimPopup) return;

    if (!dailyCheckInReady || claimedToday || dailyCheckInDisabledReason) {
      navigation.setParams({ forceDailyClaimPopup: false });
      return;
    }

    setShowDailyClaimPopup(true);
    setDailyClaimFlowActive(false);
    navigation.setParams({ forceDailyClaimPopup: false });
  }, [
    claimedToday,
    dailyCheckInDisabledReason,
    dailyCheckInReady,
    navigation,
    routeParams?.forceDailyClaimPopup,
  ]);

  useEffect(() => {
    if (!shouldShowStreakIncrementPopup) {
      dismissQueuedModal(REWARD_MODALS.STREAK_INCREASED);
      return;
    }

    // Sound disabled for now.
    // playSound("streak_reward").catch(() => {});
    markStreakIncrementPopupShown().catch(() => {});
    triggerStreakIncreased();
  }, [
    dismissQueuedModal,
    markStreakIncrementPopupShown,
    playSound,
    shouldShowStreakIncrementPopup,
    triggerStreakIncreased,
  ]);

  useEffect(() => {
    let mounted = true;

    const hydrateDailyPopupFlow = async () => {
      if (!isScreenFocused) {
        return;
      }
      if (
        !dailyCheckInReady ||
        !dailyClaimGateReady ||
        !streakReady ||
        !isBootReady
      ) {
        return;
      }

      const [streakIntroShownOnce] = await Promise.all([
        localStore.getBool(localStore.keys.streakIntroShownOnce, false),
      ]);

      if (!mounted) return;

      const shouldShowDailyToday =
        shouldShowDailyClaimGate && !dailyCheckInDisabledReason;
      clearDailyPopupSchedule();

      if (shouldShowDailyToday) {
        setShowDailyClaimPopup(false);
        const popupDelayMs = isFirstInstallOpen
          ? DAILY_CLAIM_POPUP_FIRST_INSTALL_DELAY_MS
          : DAILY_CLAIM_POPUP_RETURN_DELAY_MS;
        queueDailyPopupWhenIdle(popupDelayMs);
      } else {
        pendingDailyPopupRef.current = false;
        setShowDailyClaimPopup(false);
      }

      if (streakIntroShownOnce) {
        streakIntroQueuedRef.current = true;
      }
    };

    hydrateDailyPopupFlow().catch(() => {});

    return () => {
      mounted = false;
      clearDailyPopupSchedule();
    };
  }, [
    clearDailyPopupSchedule,
    dailyCheckInDisabledReason,
    dailyClaimGateReady,
    dailyCheckInReady,
    isFirstInstallOpen,
    isBootReady,
    isScreenFocused,
    queueDailyPopupWhenIdle,
    shouldShowDailyClaimGate,
    streakReady,
  ]);

  useEffect(() => {
    if (isScreenFocused) {
      // Dock items that open another screen must not stay highlighted on return.
      setActiveDock((current) =>
        current === "quiz" || current === "library" ? "home" : current
      );
      return;
    }
    pendingDailyPopupRef.current = false;
    isUserScrollingRef.current = false;
    clearDailyPopupSchedule();
    clearScrollIdleTimer();
  }, [clearDailyPopupSchedule, clearScrollIdleTimer, isScreenFocused]);

  useEffect(() => {
    let mounted = true;

    const queueReviewIfEligible = async () => {
      if (reviewPromptCheckDoneRef.current) return;
      if (!isBootReady || !streakReady || !dailyCheckInReady) return;

      reviewPromptCheckDoneRef.current = true;

      const hasEngagement =
        dailyQuizCompleted || streakCount >= 2 || totalScore >= 60;
      const shouldShow = await shouldQueueReviewPrompt({ hasEngagement });

      if (!mounted || !shouldShow) return;
      queueReviewPrompt(2200);
    };

    queueReviewIfEligible().catch(() => {});

    return () => {
      mounted = false;
    };
  }, [
    dailyCheckInReady,
    dailyQuizCompleted,
    isBootReady,
    queueReviewPrompt,
    shouldQueueReviewPrompt,
    streakCount,
    streakReady,
    totalScore,
  ]);

  useEffect(() => {
    const showStreakDepth =
      streakCelebrationVisible || streakIntroVisible || reviewPromptVisible;
    streakOverlayDepth.value = withTiming(showStreakDepth ? 1 : 0, {
      duration: showStreakDepth ? 250 : 220,
      easing: Easing.out(Easing.cubic),
    });
  }, [
    reviewPromptVisible,
    streakCelebrationVisible,
    streakIntroVisible,
    streakOverlayDepth,
  ]);

  useEffect(() => {
    tryShowPendingDailyPopup();
  }, [tryShowPendingDailyPopup]);

  useEffect(
    () => () => {
      if (scoreRafRef.current) {
        cancelAnimationFrame(scoreRafRef.current);
        scoreRafRef.current = null;
      }
    },
    []
  );

  useEffect(
    () => () => {
      pendingDailyPopupRef.current = false;
      isUserScrollingRef.current = false;
      clearDailyPopupSchedule();
      clearScrollIdleTimer();
    },
    [clearDailyPopupSchedule, clearScrollIdleTimer]
  );

  const avatarSource = useMemo(() => {
    if (
      typeof avatar === "string" &&
      (avatar.startsWith("http") ||
        avatar.startsWith("file:") ||
        avatar.startsWith("content://") ||
        avatar.startsWith("data:image"))
    ) {
      return { uri: avatar };
    }
    return avatar === "girl" ? girlAvatarImage : defaultAvatarImage;
  }, [avatar]);

  const usageProgress = Math.min(
    100,
    Math.round((dailyUsageMinutes / Math.max(1, minUsageMinutes)) * 100)
  );
  const missionProgress = Math.min(
    100,
    Math.round(
      (dailyQuizCompleted ? 50 : 0) + Math.min(50, usageProgress * 0.5)
    )
  );
  const missionCompleted =
    dailyQuizCompleted && dailyUsageMinutes >= minUsageMinutes;
  const missionLabel = missionCompleted ? "Completed" : "Start mission";

  const openExternalWithFallback = useCallback(async (urls, failureMessage) => {
    for (const url of urls) {
      try {
        // Try deep link/intent first, then fallback to web URL.
        await Linking.openURL(url);
        return true;
      } catch (error) {
        // Continue trying other URLs.
      }
    }

    Snackbar.show({
      text: failureMessage,
      duration: Snackbar.LENGTH_SHORT,
    });
    return false;
  }, []);

  const openWhatsApp = useCallback(async () => {
    const urls =
      Platform.OS === "android"
        ? [
            WHATSAPP_CHANNEL_INTENT_URL,
            WHATSAPP_CHANNEL_DEEP_LINK,
            WHATSAPP_CHANNEL_WEB_URL,
            WHATSAPP_CHANNEL_ALT_WEB_URL,
          ]
        : [
            WHATSAPP_CHANNEL_DEEP_LINK,
            WHATSAPP_CHANNEL_WEB_URL,
            WHATSAPP_CHANNEL_ALT_WEB_URL,
          ];

    await openExternalWithFallback(
      urls,
      "Unable to open WhatsApp channel right now."
    );
  }, [openExternalWithFallback]);
  const openInstagram = () =>
    Linking.openURL("https://www.instagram.com/siddiqkolimi");
  const openYouTube = () =>
    Linking.openURL("https://www.youtube.com/@StudyGarage03");
  const openLinkedIn = () =>
    Linking.openURL("https://www.linkedin.com/in/siddiq-kolimi-a371a9192/");
  const openTelegram = () => Linking.openURL("https://t.me/studygarageapp");

  const openTodayMission = useCallback(() => {
    navigation.navigate("QuizZoneScreen", {
      stateBoard,
      classValue,
    });
  }, [classValue, navigation, stateBoard]);

  const animateWalletCount = useCallback((fromValue, toValue) => {
    if (scoreRafRef.current) {
      cancelAnimationFrame(scoreRafRef.current);
      scoreRafRef.current = null;
    }

    const startTs = Date.now();
    const durationMs = 250;

    const tick = () => {
      const elapsed = Date.now() - startTs;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - (1 - progress) * (1 - progress);
      const nextValue = Math.round(fromValue + (toValue - fromValue) * eased);
      setDisplayWalletScore(nextValue);

      if (progress < 1) {
        scoreRafRef.current = requestAnimationFrame(tick);
      } else {
        scoreRafRef.current = null;
      }
    };

    scoreRafRef.current = requestAnimationFrame(tick);
  }, []);

  const measureInWindowAsync = useCallback((ref) => {
    return new Promise((resolve) => {
      const node = ref?.current;
      if (!node || typeof node.measureInWindow !== "function") {
        resolve(null);
        return;
      }

      requestAnimationFrame(() => {
        node.measureInWindow((x, y, width, height) => {
          if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            width <= 0 ||
            height <= 0
          ) {
            resolve(null);
            return;
          }
          resolve({ x, y, width, height });
        });
      });
    });
  }, []);

  const projectBalanceAfterReward = useCallback((baseBalance, coins) => {
    const next = baseBalance + coins;
    if (next >= 1000) {
      return next - 1000;
    }
    return next;
  }, []);

  const playDailyRewardRevealSound = useCallback(() => {
    // Sound disabled for now.
    // playSound("reward_reveal").catch(() => {});
  }, [playSound]);

  const playDailyClaimSound = useCallback(() => {
    // Sound disabled for now.
    // playSound("daily_claim").catch(() => {});
  }, [playSound]);

  const closeDailyClaimOverlay = useCallback(() => {
    if (isClaimingDailyCheckIn || coinFlyVisible) {
      return;
    }
    dismissDailyClaimSession();
    setShowDailyClaimPopup(false);
    setDailyClaimFlowActive(false);
    closeActiveModal();
  }, [
    closeActiveModal,
    coinFlyVisible,
    dismissDailyClaimSession,
    isClaimingDailyCheckIn,
  ]);

  const handleStreakMergedToIcon = useCallback(() => {
    streakIconScale.value = withSequence(
      withSpring(1.1, { damping: 11, stiffness: 240 }),
      withSpring(1, { damping: 13, stiffness: 220 })
    );

    streakRippleScale.value = 0;
    streakRippleOpacity.value = 0.38;
    streakRippleScale.value = withTiming(1, {
      duration: 360,
      easing: Easing.out(Easing.cubic),
    });
    streakRippleOpacity.value = withTiming(0, { duration: 360 });
  }, [streakIconScale, streakRippleOpacity, streakRippleScale]);

  const handleStreakCelebrationClose = useCallback(() => {
    consumeStreakIncrementPopup();
    closeActiveModal();
  }, [closeActiveModal, consumeStreakIncrementPopup]);

  const handleReviewDismiss = useCallback(async () => {
    if (isSubmittingReview) return;
    await dismissForLater();
    closeActiveModal();
  }, [closeActiveModal, dismissForLater, isSubmittingReview]);

  const handleReviewSubmit = useCallback(
    async (stars) => {
      if (isSubmittingReview) return;
      setIsSubmittingReview(true);
      try {
        const result = await submitRating(stars);
        setMiniToast({
          visible: true,
          message:
            stars >= 4
              ? result.openedStore
                ? "Thanks for rating StudyGarage!"
                : "Thanks for your rating!"
              : "Thanks for feedback. We will improve this experience.",
        });
      } finally {
        setIsSubmittingReview(false);
        closeActiveModal();
      }
    },
    [closeActiveModal, isSubmittingReview, submitRating]
  );

  const completeDailyCheckInReward = useCallback(async () => {
    const startedAt = dailyClaimStartedAtRef.current || Date.now();
    const baseBalance = claimBaseBalanceRef.current;
    const projectedBalance = projectBalanceAfterReward(
      baseBalance,
      DAILY_CHECKIN_COINS
    );

    animateWalletCount(baseBalance, projectedBalance);
    walletScale.value = withSequence(
      withSpring(1.06, { damping: 12, stiffness: 250 }),
      withSpring(1, { damping: 14, stiffness: 220 })
    );

    try {
      const todayKey = toLocalDateKey();
      await awardCoinsWithMirror(
        DAILY_CHECKIN_COINS,
        "daily_claim",
        `dailyClaim:${todayKey}`,
        { dateKey: todayKey }
      );
      await claimDailyCheckIn();
      await markDailyClaimGateClaimed();
      await markDailyRewardClaimed();

      // Sound disabled for now.
      // playSound("coin_land").catch(() => {});
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
        () => {}
      );

      Snackbar.show({
        text: `+${DAILY_CHECKIN_COINS} coins added`,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: "#FFFCF5",
        textColor: "#9A6400",
      });
    } finally {
      const elapsedMs = Date.now() - startedAt;
      const minVisibleMs = 1900; // lets the claim blast land; Home stays tappable meanwhile
      if (elapsedMs < minVisibleMs) {
        await new Promise((resolve) =>
          setTimeout(resolve, minVisibleMs - elapsedMs)
        );
      }

      setCoinFlyVisible(false);
      setCoinFlyStartLayout(null);
      setCoinFlyEndLayout(null);
      setIsClaimingDailyCheckIn(false);
      setDailyClaimFlowActive(false);
      setShowDailyClaimPopup(false);
      closeActiveModal();
      dailyClaimStartedAtRef.current = 0;

      if (isFirstInstallOpen && !streakIntroQueuedRef.current) {
        streakIntroQueuedRef.current = true;
        queueStreakIntro(30000);
        await Promise.all([
          localStore.setBool(localStore.keys.streakIntroShownOnce, true),
          localStore.setString(
            localStore.keys.streakIntroShownDate,
            toLocalDateKey()
          ),
        ]);
      }
    }
  }, [
    animateWalletCount,
    awardCoinsWithMirror,
    claimDailyCheckIn,
    closeActiveModal,
    isFirstInstallOpen,
    markDailyClaimGateClaimed,
    markDailyRewardClaimed,
    projectBalanceAfterReward,
    playSound,
    queueStreakIntro,
    walletScale,
  ]);

  const handleDailyCheckInClaim = useCallback(async () => {
    if (
      !coinStateReady ||
      !dailyCheckInReady ||
      claimedToday ||
      isClaimingDailyCheckIn
    ) {
      return;
    }

    setIsClaimingDailyCheckIn(true);
    setDailyClaimFlowActive(true);
    dailyClaimStartedAtRef.current = Date.now();
    claimBaseBalanceRef.current = totalScore;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    const [startLayout, endLayout] = await Promise.all([
      measureInWindowAsync(dailyClaimButtonRef),
      measureInWindowAsync(walletPillRef),
    ]);

    if (!startLayout || !endLayout) {
      completeDailyCheckInReward().catch((error) => {
        console.error("Daily check-in claim failed:", error);
        setIsClaimingDailyCheckIn(false);
        setDailyClaimFlowActive(false);
      });
      return;
    }

    setCoinFlyStartLayout(startLayout);
    setCoinFlyEndLayout(endLayout);
    setCoinFlyVisible(true);
  }, [
    claimedToday,
    coinStateReady,
    completeDailyCheckInReward,
    dailyCheckInReady,
    isClaimingDailyCheckIn,
    measureInWindowAsync,
    totalScore,
  ]);

  const openQuizZoneScreen = openTodayMission;

  const handleLibraryOpen = () => {
    const routeName = libraryRouteMap[lookupKey];
    if (!routeName) return;
    navigation.navigate(routeName);
  };

  const finalizeDrawerClose = useCallback((closeToken, resetDock) => {
    if (drawerCloseTokenRef.current !== closeToken) {
      return;
    }
    setDrawerMounted(false);
    if (resetDock) {
      setActiveDock("home");
    }
  }, []);

  const closeProfileDrawer = useCallback(
    (resetDock = true) => {
      const closeToken = drawerCloseTokenRef.current + 1;
      drawerCloseTokenRef.current = closeToken;
      setDrawerOpen(false);
      cancelAnimation(drawerOpenProgress);
      drawerOpenProgress.value = withTiming(
        0,
        { duration: 220, easing: Easing.out(Easing.cubic) },
        (finished) => {
          if (!finished) return;
          runOnJS(finalizeDrawerClose)(closeToken, resetDock);
        }
      );
    },
    [drawerOpenProgress, finalizeDrawerClose]
  );

  const openProfileDrawer = useCallback(() => {
    const now = Date.now();
    if (now - drawerTapGuardRef.current < PROFILE_DRAWER_TAP_GUARD_MS) {
      return;
    }
    drawerTapGuardRef.current = now;
    drawerCloseTokenRef.current += 1;
    setDrawerMounted(true);
    setDrawerOpen(true);
    setActiveDock("profile");
    cancelAnimation(drawerOpenProgress);
    drawerOpenProgress.value = withTiming(1, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    });
  }, [drawerOpenProgress]);

  useEffect(
    () => () => {
      cancelAnimation(drawerOpenProgress);
    },
    [drawerOpenProgress]
  );

  const openStreakDetails = () => {
    navigation.navigate("StreakDetailsScreen", {
      stateBoard,
      classValue,
      streakCount,
      igniteToday,
      milestoneReached,
      dailyQuizCompleted,
      dailyUsageMinutes,
      minUsageMinutes,
      streakMilestones,
      streakTarget,
      streakBonusCoins,
      streakProgressPct,
      streakProgressLabel,
      motivationalLine,
    });
  };

  const scrollToMainModule = useCallback(() => {
    const scrollNode = scrollViewRef.current;
    if (!scrollNode || typeof scrollNode.scrollTo !== "function") {
      return;
    }

    scrollNode.scrollTo({
      y: Math.max(moduleSectionOffsetRef.current - 12, 0),
      animated: true,
    });
  }, []);

  const scrollToHomeTop = useCallback(() => {
    const scrollNode = scrollViewRef.current;
    if (!scrollNode || typeof scrollNode.scrollTo !== "function") {
      return;
    }

    scrollNode.scrollTo({
      y: 0,
      animated: true,
    });
  }, []);

  const handleDockPress = async (key) => {
    if (key === "profile") {
      openProfileDrawer();
      return;
    }

    if (drawerOpen) {
      closeProfileDrawer(false);
    }

    setActiveDock(key);
    if (key === "home") {
      scrollToHomeTop();
      return;
    }
    if (key === "learn") {
      scrollToMainModule();
      return;
    }
    if (key === "quiz") {
      openQuizZoneScreen();
      return;
    }
    if (key === "library") {
      handleLibraryOpen();
      return;
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (
        typeof navigation?.isFocused === "function" &&
        !navigation.isFocused()
      ) {
        return false;
      }

      if (drawerOpen) {
        closeProfileDrawer();
        return true;
      }

      if (activeModal) {
        closeActiveModal();
        return true;
      }

      if (isSecondPage) {
        return true;
      }
      if (navigation.canGoBack()) {
        navigation.goBack();
        return true;
      }

      navigation.navigate("SecondPage");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [
    activeModal,
    closeActiveModal,
    closeProfileDrawer,
    drawerOpen,
    isSecondPage,
    navigation,
  ]);

  return (
    <View className="flex-1 bg-sg-bg">
      <View className="flex-1 bg-sg-bg">
        <Animated.View style={homeDepthStyle} className="flex-1">
          <ScreenLayoutContainer
            variant="home"
            contentClassName="px-4 pb-28"
            scroll
            className="bg-transparent"
            scrollViewProps={{
              ref: scrollViewRef,
              keyboardShouldPersistTaps: "handled",
              onScrollBeginDrag: handleMainScrollBeginDrag,
              onScrollEndDrag: handleMainScrollEndDrag,
              onMomentumScrollEnd: handleMainMomentumEnd,
              scrollEventThrottle: 16,
            }}
          >
            <View
              className="mb-4 overflow-hidden rounded-b-[28px] bg-sg-board px-4 pb-5"
              style={{
                marginTop: -(Math.max(insets.top, 14) + 12),
                marginHorizontal: -16,
                paddingTop: Math.max(insets.top, 14) + 12,
              }}
            >
              <BoardBand />
            <Animated.View
              className="mb-4 flex-row items-center"
            >
              <TouchableOpacity
                onPress={openProfileDrawer}
                accessibilityRole="button"
                accessibilityLabel="Open profile"
                className="mr-3"
              >
                <Image
                  source={avatarSource}
                  className="h-[52px] w-[52px] rounded-[16px] bg-[#1C4336]"
                  resizeMode="cover"
                />
              </TouchableOpacity>

              <View className="flex-1 pr-2">
                <Text
                  numberOfLines={1}
                  className="text-[26px] leading-[30px] font-sg-display tracking-[-0.5px] text-[#F4EFE2]"
                >
                  {`Hi ${userName}`}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-[13px] font-sg-medium text-[#B5C6BB]"
                >
                  {stateBoard} · {classValue.replace("Class", " class")}
                </Text>
              </View>

              <PressableScale
                onPress={openStreakDetails}
                activeScale={0.96}
                accessibilityLabel={`Streak ${streakCount} days`}
                className="mr-1.5"
              >
                <Animated.View
                  ref={streakIconRef}
                  collapsable={false}
                  style={streakIconAnimatedStyle}
                  className="h-10 flex-row items-center rounded-[12px] bg-sg-emberSoft px-2.5"
                >
                  <Animated.View
                    pointerEvents="none"
                    style={streakRippleStyle}
                    className="absolute -inset-1 rounded-[14px] border border-sg-ember/35 bg-sg-ember/18"
                  />
                  <Ionicons name="flame" size={15} color="#C4551A" />
                  <Text className="ml-1 text-[14px] font-sg-bold text-sg-ember">
                    {streakCount}
                  </Text>
                </Animated.View>
              </PressableScale>

              <View ref={walletPillRef} collapsable={false}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("TotalScorePage")}
                  accessibilityRole="button"
                  accessibilityLabel="Open coin wallet"
                >
                  <Animated.View
                    style={walletAnimatedStyle}
                    className="h-10 flex-row items-center rounded-[12px] bg-sg-marigoldSoft px-2.5"
                  >
                    <Image source={CoinIcon} className="mr-1 h-[18px] w-[18px]" />
                    <Text
                      className="text-[14px] font-sg-bold text-sg-accent"
                      style={{ fontVariant: ["tabular-nums"] }}
                    >
                      {coinStateReady && Number.isFinite(displayWalletScore)
                        ? displayWalletScore
                        : "…"}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              </View>

              <Animated.View
                pointerEvents="none"
                style={day7RewardFlyStyle}
                className="absolute right-6 top-16 flex-row items-center rounded-[10px] bg-sg-board px-2 py-1"
              >
                <Coin size={14} compact />
                <Text className="ml-1 text-[12px] font-sg-bold text-[#F4EFE2]">
                  +{streakBonusCoins}
                </Text>
              </Animated.View>
            </Animated.View>

            <Animated.View
              className="mt-1"
            >
              <View className="flex-row items-start justify-between">
                <Text className="text-[13px] font-sg-semibold text-[#F2B632]">
                  Today&apos;s mission
                </Text>
                <Text
                  className="text-[13px] font-sg-bold text-[#F4EFE2]"
                  style={{ fontVariant: ["tabular-nums"] }}
                >
                  {missionProgress}%
                </Text>
              </View>
              <Text className="mt-2 text-[34px] leading-[38px] font-sg-display tracking-[-0.7px] text-[#F4EFE2]">
                One quiz, thirty minutes of study
              </Text>

              <View className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F4EFE2]/16">
                <View
                  className="h-full rounded-full bg-[#F2B632]"
                  style={{ width: `${missionProgress}%` }}
                />
              </View>

              <View className="mt-3.5 flex-row flex-wrap">
                <MissionStep done={dailyQuizCompleted} label="1 quiz" />
                <MissionStep
                  done={dailyUsageMinutes >= minUsageMinutes}
                  label={`${dailyUsageMinutes}/${minUsageMinutes} min`}
                />
              </View>

              <TouchableOpacity
                onPress={openTodayMission}
                accessibilityRole="button"
                className={`mt-4 min-h-[50px] flex-row items-center justify-center rounded-[14px] ${
                  missionCompleted ? "bg-[#1C4336]" : "bg-[#F2B632]"
                }`}
              >
                <Text
                  className={`text-[15px] font-sg-bold ${
                    missionCompleted ? "text-[#8FD9B4]" : "text-[#14342A]"
                  }`}
                >
                  {missionLabel}
                </Text>
              </TouchableOpacity>

              <Text className="mt-3 text-[13px] leading-[18px] font-sg-medium text-[#B5C6BB]">
                {tomorrowTeaser.rewardHint}
              </Text>
            </Animated.View>

            </View>

            <Animated.View
              className="mb-5 flex-row gap-2.5"
            >
              <ActionTile
                icon="flash"
                tilt="-1.5deg"
                label="Quick quiz"
                hint="Start now"
                tone="quiz"
                onPress={openQuizZoneScreen}
              />
              <ActionTile
                icon="library"
                label="Materials"
                hint="Textbooks"
                onPress={() => handleDockPress("library")}
              />
              <ActionTile
                icon="wallet"
                tilt="1.5deg"
                label="Rewards"
                hint="Your coins"
                tone="rewards"
                onPress={() => navigation.navigate("TotalScorePage")}
              />
            </Animated.View>

            {classValue === "10thClass" || classValue === "Inter" ? (
              <PressableScale
                onPress={() =>
                  navigation.navigate("CareerPlanScreen", {
                    stateBoard,
                    classValue,
                  })
                }
                activeScale={0.98}
                containerClassName="mb-5"
                className="min-h-[92px] flex-row items-center overflow-hidden rounded-[18px] p-4"
                style={{ backgroundColor: "#0F6E78" }}
              >
                <Ionicons name="compass" size={36} color="#F2B632" />
                <View className="ml-3 flex-1">
                  <Text className="text-[20px] leading-[25px] font-sg-display text-[#F4EFE2]">
                    Your career plan
                  </Text>
                  <Text className="mt-0.5 text-[13px] leading-[18px] font-sg-medium text-[#D3E8EA]">
                    {classValue === "Inter"
                      ? "See what you can become with your Inter group"
                      : "Confused after 10th? Find what suits you"}
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={20} color="#F4EFE2" />
              </PressableScale>
            ) : null}

            <Animated.View>
              <PromoCard
                sectionTitle="Featured Tools"
                sectionSubtitle="Partner picks from outside StudyGarage"
                stateBoard={stateBoard}
                classValue={classValue}
              />
            </Animated.View>

            <Animated.View
              className="mb-4"
              onLayout={(event) => {
                const nextY = event?.nativeEvent?.layout?.y;
                if (!Number.isFinite(nextY)) return;
                moduleSectionOffsetRef.current = nextY;
              }}
            >
              {ComponentToRender || (
                <SGEmptyState
                  title="Modules not available yet"
                  subtitle="Select a different class or board to continue learning."
                  actionLabel="Change Class"
                  onActionPress={() => navigation.goBack()}
                  badgeLabel="MODULE EMPTY"
                />
              )}
            </Animated.View>

            <Animated.View>
              <View className="mb-4 mt-2">
                <SGSectionHeader
                  title="StudyGarage club"
                  subtitle="Daily updates, exam tips and student discussions"
                  className="mb-3"
                />
                <PressableScale
                  onPress={openWhatsApp}
                  activeScale={0.98}
                  className="min-h-[56px] flex-row items-center justify-between rounded-[16px] border border-sg-border bg-sg-surface px-4"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="logo-whatsapp" size={20} color="#17694F" />
                    <Text className="ml-2.5 text-[15px] font-sg-bold text-sg-text">
                      Join the community
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={18} color="#5F6A63" />
                </PressableScale>
                <View className="mt-2 flex-row items-start justify-around">
                  <CommunityIconButton
                    icon="logo-instagram"
                    label="Instagram"
                    onPress={openInstagram}
                  />
                  <CommunityIconButton
                    icon="logo-youtube"
                    label="YouTube"
                    onPress={openYouTube}
                  />
                  <CommunityIconButton
                    icon="logo-linkedin"
                    label="LinkedIn"
                    onPress={openLinkedIn}
                  />
                  <CommunityIconButton
                    icon="paper-plane-outline"
                    label="Telegram"
                    onPress={openTelegram}
                  />
                </View>
              </View>
            </Animated.View>
          </ScreenLayoutContainer>

          <View className="pointer-events-box-none absolute bottom-0 left-0 right-0 border-t border-sg-border bg-sg-surface px-2 pb-3 pt-2" style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
            <View className="flex-row items-center justify-between">
              {dockItems.map((item) => {
                const active = activeDock === item.key;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => handleDockPress(item.key)}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: active }}
                    className="flex-1 items-center py-0.5"
                  >
                    <View
                      className={`h-8 w-14 items-center justify-center rounded-[10px] ${
                        active ? "bg-sg-primarySoft" : ""
                      }`}
                    >
                      <Ionicons
                        name={active ? item.icon.replace("-outline", "") : item.icon}
                        size={20}
                        color={active ? "#17694F" : "#5F6A63"}
                      />
                    </View>
                    <Text
                      className={`mt-0.5 text-[12px] ${
                        active ? "font-sg-bold text-sg-primary" : "font-sg-medium text-sg-muted"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Animated.View>

        {coinFlyVisible ? (
          <CoinFlyOverlay
            startLayout={coinFlyStartLayout}
            endLayout={coinFlyEndLayout}
            count={6}
            minSize={20}
            maxSize={26}
            delayStepMs={55}
            baseDurationMs={620}
            durationJitterMs={90}
            arcMin={72}
            arcJitter={64}
            driftBase={14}
            driftJitter={24}
            onComplete={() => {
              completeDailyCheckInReward().catch((error) => {
                console.error(
                  "Daily check-in reward completion failed:",
                  error
                );
                setCoinFlyVisible(false);
                setCoinFlyStartLayout(null);
                setCoinFlyEndLayout(null);
                setIsClaimingDailyCheckIn(false);
                setDailyClaimFlowActive(false);
              });
            }}
          />
        ) : null}

        <StreakCelebrationOverlay
          visible={streakCelebrationVisible}
          streakCount={streakCount}
          streakIconRef={streakIconRef}
          onMergedToIcon={handleStreakMergedToIcon}
          onClose={handleStreakCelebrationClose}
        />

        <StreakIntroPopup
          visible={streakIntroVisible}
          onClose={() => closeActiveModal()}
        />

        <ReviewPromptPopup
          visible={reviewPromptVisible}
          onClose={handleReviewDismiss}
          onSubmit={handleReviewSubmit}
          submitting={isSubmittingReview}
        />

        {/* Render overlay only when actively needed, so hidden modal tree cannot intercept scroll/touches. */}
        {dailyPopupRequested ? (
          <DailyClaimOverlay
            visible={dailyClaimOverlayVisible}
            coinsToGive={DAILY_CHECKIN_COINS}
            claimedToday={claimedToday}
            disabledReason={dailyCheckInDisabledReason}
            isClaiming={isClaimingDailyCheckIn}
            showStreakFlame={streakCount > 0}
            streakCount={streakCount}
            onClaim={handleDailyCheckInClaim}
            onDismiss={closeDailyClaimOverlay}
            claimButtonRef={dailyClaimButtonRef}
            onRevealSound={playDailyRewardRevealSound}
            onClaimSound={playDailyClaimSound}
          />
        ) : null}

        <MiniToast
          visible={miniToast.visible}
          message={miniToast.message}
          onHide={() => setMiniToast((prev) => ({ ...prev, visible: false }))}
        />
      </View>

      {drawerMounted ? (
        <>
          <Animated.View
            pointerEvents={drawerOpen ? "auto" : "none"}
            style={[
              profileDrawerScrimStyle,
              {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "#FFFCF5",
                zIndex: 1900,
                elevation: 10,
              },
            ]}
          >
            <Pressable
              className="flex-1"
              onPress={() => closeProfileDrawer()}
              accessibilityRole="button"
              accessibilityLabel="Close profile drawer"
            />
          </Animated.View>

          <Animated.View
            pointerEvents={drawerMounted ? "auto" : "none"}
            onLayout={(event) => {
              const measuredWidth =
                Math.round(event.nativeEvent.layout.width) ||
                PROFILE_DRAWER_WIDTH;
              if (measuredWidth > 0 && measuredWidth !== drawerPanelWidth) {
                setDrawerPanelWidth(measuredWidth);
              }
            }}
            style={[
              profileDrawerPanelStyle,
              {
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                width: drawerPanelWidth || PROFILE_DRAWER_WIDTH,
                backgroundColor: "#FFFCF5",
                borderRightWidth: 1,
                borderRightColor: "rgba(29,42,36,0.12)",
                zIndex: 2000,
                elevation: 22,
              },
            ]}
          >
            <MainPage
              closeDrawer={closeProfileDrawer}
              onAvatarUpdated={(nextAvatarUri) =>
                navigation.setParams({ avatar: nextAvatarUri })
              }
            />
          </Animated.View>
        </>
      ) : null}
    </View>
  );
};

export default SecondPage;
