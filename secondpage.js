import React, {
  useCallback,
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
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  cancelAnimation,
  Easing,
  FadeInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
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
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import SGCard from "./src/design-system/components/SGCard";
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
import { useDailyCheckIn } from "./src/hooks/useDailyCheckIn";
import useDailyClaimGate from "./src/hooks/useDailyClaimGate";
import { localStore } from "./src/services/storage/localStore";
import { toLocalDateKey } from "./src/utils/dateKey";
import useAppSound from "./src/hooks/useAppSound";
import useReviewPrompt from "./src/hooks/useReviewPrompt";
import { useIsFocused } from "@react-navigation/native";

const defaultAvatarImage = require("./assets/boy.png");
const girlAvatarImage = require("./assets/girl.png");
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

function ActionOrb({ icon, label, hint, tone = "default", onPress }) {
  const pressScale = useSharedValue(1);
  const iconLift = useSharedValue(0);

  const glowColor =
    tone === "quiz" ? "#00FFA3" : tone === "rewards" ? "#FFD700" : "#6E7FA6";
  const iconColor =
    tone === "quiz" ? "#00FFA3" : tone === "rewards" ? "#FFD700" : "#A2AECB";

  const orbStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -iconLift.value }],
  }));

  const onPressIn = () => {
    pressScale.value = withTiming(0.95, { duration: 90 });
    iconLift.value = withTiming(2, { duration: 90 });
  };

  const onPressOut = () => {
    pressScale.value = withSpring(1, {
      damping: 10,
      stiffness: 255,
      mass: 0.35,
    });
    iconLift.value = withTiming(0, { duration: 130 });
  };

  return (
    <View className="flex-1 items-center">
      <Pressable
        hitSlop={8}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className="items-center"
      >
        <Animated.View
          style={orbStyle}
          className="h-[86px] w-[86px] items-center justify-center rounded-full border border-white/15 bg-white/6"
        >
          <View
            className="h-[64px] w-[64px] items-center justify-center rounded-full border border-white/10 bg-[#0F1218]"
            style={{
              shadowColor: glowColor,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: tone === "default" ? 0.16 : 0.24,
              shadowRadius: tone === "default" ? 8 : 10,
              elevation: tone === "default" ? 6 : 8,
            }}
          >
            <Animated.View style={iconStyle}>
              <Ionicons name={icon} size={22} color={iconColor} />
            </Animated.View>
          </View>
        </Animated.View>
        <Text className="mt-2 text-[13px] font-extrabold text-white">
          {label}
        </Text>
        <Text className="mt-0.5 text-[11px] font-semibold text-white/66">
          {hint}
        </Text>
      </Pressable>
    </View>
  );
}

function CommunityIconButton({ icon, label, onPress, accent = "#8FA1C9" }) {
  return (
    <PressableScale
      onPress={onPress}
      activeScale={0.95}
      className="items-center"
    >
      <View className="h-[54px] w-[54px] items-center justify-center rounded-full border border-white/14 bg-[#141925]">
        <View
          className="h-[42px] w-[42px] items-center justify-center rounded-full border border-white/10 bg-[#0F131D]"
          style={{
            shadowColor: accent,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.28,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <Ionicons name={icon} size={18} color={accent} />
        </View>
      </View>
      <Text className="mt-1.5 text-[10px] font-semibold text-white/72">
        {label}
      </Text>
    </PressableScale>
  );
}

const SecondPage = ({ route, navigation }) => {
  const isDark = true;
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
  const pendingDailyPopupRef = useRef(false);
  const isUserScrollingRef = useRef(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMounted, setDrawerMounted] = useState(false);
  const [drawerPanelWidth, setDrawerPanelWidth] =
    useState(PROFILE_DRAWER_WIDTH);
  const [isSecondPage] = useState(true);
  const [activeDock, setActiveDock] = useState("home");
  const [dockWidth, setDockWidth] = useState(0);
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

  const {
    isBootReady,
    isFirstInstallOpen,
    markDailyRewardClaimed,
  } = useAppBoot();
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
  const dockIndicatorX = useSharedValue(0);
  const coinShineX = useSharedValue(-52);
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

  const dockIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: dockIndicatorX.value }],
  }));

  const coinShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: coinShineX.value }],
    opacity: 0.2,
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
    coinShineX.value = withRepeat(
      withTiming(58, { duration: 4200 }),
      -1,
      false
    );
  }, [coinShineX]);

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
  const missionLabel = missionCompleted ? "Completed" : "Start Mission";

  const openExternalWithFallback = useCallback(
    async (urls, failureMessage) => {
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
    },
    []
  );

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
        backgroundColor: "#151A24",
        textColor: "#FFD700",
      });
    } finally {
      const elapsedMs = Date.now() - startedAt;
      const minVisibleMs = 6200;
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

  const handleDockPress = async (key) => {
    if (key === "profile") {
      openProfileDrawer();
      return;
    }

    if (drawerOpen) {
      closeProfileDrawer(false);
    }

    setActiveDock(key);
    if (key === "home") return;
    if (key === "learn") {
      navigation.navigate("SubjectDataPage", { stateBoard, classValue });
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

  useEffect(() => {
    if (!dockWidth) return;
    const activeIndex = Math.max(
      0,
      dockItems.findIndex((item) => item.key === activeDock)
    );
    const eachWidth = dockWidth / dockItems.length;
    const nextX = eachWidth * activeIndex + eachWidth / 2 - 7;
    dockIndicatorX.value = withSpring(nextX, { damping: 13, stiffness: 220 });
  }, [activeDock, dockIndicatorX, dockWidth]);

  return (
    <View className="flex-1 bg-[#0B0C10]">
      <View className="flex-1 bg-[#0B0C10]">
        <Animated.View style={homeDepthStyle} className="flex-1">
          <ScreenLayoutContainer
            variant="reward"
            contentClassName="px-4 pb-28"
            scroll
            className="bg-transparent"
            scrollViewProps={{
              keyboardShouldPersistTaps: "handled",
              onScrollBeginDrag: handleMainScrollBeginDrag,
              onScrollEndDrag: handleMainScrollEndDrag,
              onMomentumScrollEnd: handleMainMomentumEnd,
              scrollEventThrottle: 16,
            }}
          >
            <Animated.View entering={FadeInDown.duration(240)}>
              <SGCard className="mb-4 border-white/10">
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={openProfileDrawer}
                    className="mr-3"
                  >
                    <LinearGradient
                      colors={
                        isDark
                          ? ["#1F2252", "#00FFA3", "#B026FF"]
                          : ["#3868FF", "#00D996", "#8B2CFF"]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="rounded-[20px] p-[1.8px]"
                    >
                      <Image
                        source={avatarSource}
                        className="h-[56px] w-[56px] rounded-[18px]"
                        resizeMode="cover"
                      />
                    </LinearGradient>
                  </TouchableOpacity>

                  <View className="flex-1">
                    <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
                      Exclusive Learning Club
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="mt-1 text-[36px] font-black leading-[38px] text-sg-text dark:text-sgd-text"
                    >{`Hi ${userName}!`}</Text>
                    <Text className="text-[13px] font-semibold text-sg-muted dark:text-sgd-muted">
                      {stateBoard} • {classValue}
                    </Text>
                  </View>

                  <View className="ml-3 items-end">
                    <PressableScale
                      onPress={openStreakDetails}
                      activeScale={0.96}
                      className="mb-2"
                    >
                      <Animated.View
                        ref={streakIconRef}
                        collapsable={false}
                        style={[
                          streakIconAnimatedStyle,
                          {
                            shadowColor: "#FF7A3D",
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            elevation: 6,
                          },
                        ]}
                        className="flex-row items-center rounded-full border border-[#FF7A3D]/35 bg-[#2A1712]/75 px-2.5 py-1.5"
                      >
                        <Animated.View
                          pointerEvents="none"
                          style={streakRippleStyle}
                          className="absolute -inset-1 rounded-full border border-[#FFB36A]/35 bg-[#FF7A3D]/18"
                        />
                        <Ionicons
                          name="flame-outline"
                          size={12}
                          color="#FF9A3D"
                        />
                        <Text className="ml-1 text-[11px] font-extrabold text-[#FFD7BF]">
                          {streakCount}
                        </Text>
                      </Animated.View>
                    </PressableScale>

                    <View ref={walletPillRef} collapsable={false}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("TotalScorePage")}
                      >
                        <Animated.View style={walletAnimatedStyle}>
                          <View
                            className="relative overflow-hidden rounded-full border border-white/15 bg-white/6 px-3.5 py-2.5"
                            style={{
                              shadowColor: "#FFD700",
                              shadowOffset: { width: 0, height: 6 },
                              shadowOpacity: 0.22,
                              shadowRadius: 12,
                              elevation: 8,
                            }}
                          >
                            <Animated.View
                              pointerEvents="none"
                              style={coinShineStyle}
                              className="absolute inset-y-0 left-0 w-8"
                            >
                              <LinearGradient
                                colors={[
                                  "rgba(255,255,255,0)",
                                  "rgba(255,255,255,0.28)",
                                  "rgba(255,255,255,0)",
                                ]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                className="h-full w-full"
                              />
                            </Animated.View>
                            <View className="flex-row items-center">
                              <Image
                                source={CoinIcon}
                                className="mr-1.5 h-[18px] w-[18px]"
                              />
                              <Text className="text-[16px] font-black text-[#FFD700]">
                                {coinStateReady &&
                                Number.isFinite(displayWalletScore)
                                  ? displayWalletScore
                                  : "…"}
                              </Text>
                            </View>
                          </View>
                        </Animated.View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Animated.View
                  pointerEvents="none"
                  style={day7RewardFlyStyle}
                  className="absolute right-6 top-16 flex-row items-center rounded-full bg-white/15 px-2 py-1"
                >
                  <Coin size={14} compact />
                  <Text className="ml-1 text-[11px] font-black text-white">
                    +{streakBonusCoins}
                  </Text>
                </Animated.View>

                <View className="mt-4 rounded-[18px] border border-white/12 bg-[#111521]/92 p-3.5">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-[#8D97B0]">
                        Today&apos;s Mission
                      </Text>
                      <Text className="mt-1 text-[15px] font-extrabold text-white">
                        Complete 1 quiz + 30 mins study
                      </Text>
                      <Text className="mt-1 text-[12px] font-semibold text-[#A8B2CA]">
                        Reward: +{streakBonusCoins} coins on streak milestone
                      </Text>
                    </View>
                    <View className="rounded-full border border-[#00FFA3]/35 bg-[#103428]/70 px-2.5 py-1">
                      <Text className="text-[12px] font-black text-[#00FFA3]">
                        {missionProgress}%
                      </Text>
                    </View>
                  </View>

                  <View className="mt-3 h-2 overflow-hidden rounded-full border border-white/10 bg-white/8">
                    <LinearGradient
                      colors={["#B026FF", "#00FFA3"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="h-full rounded-full"
                      style={{ width: `${Math.max(8, missionProgress)}%` }}
                    />
                  </View>

                  <View className="mt-3 flex-row items-center justify-between">
                    <Text className="text-[12px] font-semibold text-[#B8C2D8]">
                      Quiz: {dailyQuizCompleted ? "Done" : "Pending"}
                      {"  "}|{"  "}Usage: {dailyUsageMinutes}/{minUsageMinutes}m
                    </Text>
                    <TouchableOpacity
                      onPress={openTodayMission}
                      className={`rounded-full border px-3.5 py-1.5 ${
                        missionCompleted
                          ? "border-[#00FFA3]/40 bg-[#113A2D]"
                          : "border-white/14 bg-white/8"
                      }`}
                    >
                      <Text
                        className={`text-[12px] font-extrabold ${
                          missionCompleted ? "text-[#00FFA3]" : "text-white"
                        }`}
                      >
                        {missionLabel}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View className="mt-3 rounded-xl border border-dashed border-white/16 bg-black/24 px-3 py-2">
                    <Text className="text-[10px] font-bold uppercase tracking-[1.1px] text-[#8D97B0]">
                      {tomorrowTeaser.label}
                    </Text>
                    <Text className="mt-1 text-[12px] font-semibold text-[#C7D1E6]">
                      {tomorrowTeaser.rewardHint}
                    </Text>
                  </View>
                </View>
              </SGCard>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(35).duration(240)}>
              <View className="mb-4 flex-row items-start justify-between px-1">
                <ActionOrb
                  icon="sparkles-outline"
                  label="Quick Quiz"
                  hint="Start now"
                  tone="quiz"
                  onPress={openQuizZoneScreen}
                />
                <ActionOrb
                  icon="library-outline"
                  label="Materials"
                  hint="Smart study"
                  onPress={() => handleDockPress("library")}
                />
                <ActionOrb
                  icon="wallet-outline"
                  label="Rewards"
                  hint="Coins wallet"
                  tone="rewards"
                  onPress={() => navigation.navigate("TotalScorePage")}
                />
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.delay(120).duration(240)}
              className="mb-4"
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

            <Animated.View entering={FadeInDown.delay(170).duration(240)}>
              <SGCard className="mb-4">
                <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-sg-muted dark:text-sgd-muted">
                  Community
                </Text>
                <Text className="mt-1 text-[23px] font-extrabold leading-[28px] text-sg-text dark:text-sgd-text">
                  StudyGarage Club
                </Text>
                <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">
                  Daily updates, exam tips, and student discussions
                </Text>

                <PressableScale
                  onPress={openWhatsApp}
                  activeScale={0.95}
                  className="mt-4 overflow-hidden rounded-full"
                >
                  <LinearGradient
                    colors={["#2B1D49", "#27416B", "#1A4F44"]}
                    start={{ x: 0, y: 0.4 }}
                    end={{ x: 1, y: 1 }}
                    className="rounded-full p-[1px]"
                  >
                    <View className="min-h-[52px] flex-row items-center justify-between rounded-full border border-white/12 bg-[#111726] px-4">
                      <View className="flex-row items-center">
                        <Ionicons
                          name="logo-whatsapp"
                          size={18}
                          color="#00FFA3"
                        />
                        <Text className="ml-2 text-[15px] font-extrabold text-white">
                          Join Community
                        </Text>
                      </View>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color="#C7D3EE"
                      />
                    </View>
                  </LinearGradient>
                </PressableScale>

                <View className="mt-4 flex-row items-start justify-between">
                  <CommunityIconButton
                    icon="logo-instagram"
                    label="Instagram"
                    onPress={openInstagram}
                    accent="#D472FF"
                  />
                  <CommunityIconButton
                    icon="logo-youtube"
                    label="YouTube"
                    onPress={openYouTube}
                    accent="#FF6B6B"
                  />
                  <CommunityIconButton
                    icon="logo-linkedin"
                    label="LinkedIn"
                    onPress={openLinkedIn}
                    accent="#4DA1FF"
                  />
                  <CommunityIconButton
                    icon="paper-plane-outline"
                    label="Telegram"
                    onPress={openTelegram}
                    accent="#67D4FF"
                  />
                </View>
              </SGCard>
            </Animated.View>
          </ScreenLayoutContainer>

          <View pointerEvents="none" className="absolute inset-0">
            <LinearGradient
              colors={[
                "rgba(176,38,255,0.22)",
                "rgba(11,12,16,0.04)",
                "rgba(11,12,16,0)",
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute -top-20 left-[-16%] h-[340px] w-[132%] rounded-full"
            />
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.58)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0 left-0 right-0 h-[270px]"
            />
          </View>

          <View className="pointer-events-box-none absolute bottom-4 left-3 right-3">
            <View
              className="rounded-[28px] border border-white/12 bg-[#141416]/92 px-2 py-2"
              style={{
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.42,
                shadowRadius: 18,
                elevation: 14,
              }}
            >
              <View
                className="flex-row items-center justify-between"
                onLayout={(event) =>
                  setDockWidth(event.nativeEvent.layout.width)
                }
              >
                <Animated.View
                  pointerEvents="none"
                  className="absolute bottom-0 h-1.5 w-3.5 rounded-full bg-[#B026FF]"
                  style={dockIndicatorStyle}
                />
                {dockItems.map((item) => {
                  const active = activeDock === item.key;
                  return (
                    <Pressable
                      key={item.key}
                      onPress={() => handleDockPress(item.key)}
                      className={`min-w-[58px] items-center rounded-[18px] px-1 py-1.5 ${
                        active ? "bg-[#251433]" : ""
                      }`}
                      style={
                        active
                          ? {
                              shadowColor: "#B026FF",
                              shadowOffset: { width: 0, height: 6 },
                              shadowOpacity: 0.36,
                              shadowRadius: 10,
                              elevation: 8,
                            }
                          : undefined
                      }
                    >
                      <View
                        className="items-center"
                        style={{
                          transform: [{ scale: active ? 1.1 : 1 }],
                        }}
                      >
                        <Ionicons
                          name={item.icon}
                          size={20}
                          color={active ? "#B026FF" : "#9AA3B6"}
                        />
                        <Text
                          className={`mt-0.5 text-[11px] font-semibold ${
                            active
                              ? "text-[#B026FF]"
                              : "text-sg-muted dark:text-sgd-muted"
                          }`}
                        >
                          {item.label}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        </Animated.View>

        {coinFlyVisible ? (
          <CoinFlyOverlay
            startLayout={coinFlyStartLayout}
            endLayout={coinFlyEndLayout}
            count={16}
            minSize={19}
            maxSize={28}
            delayStepMs={34}
            baseDurationMs={820}
            durationJitterMs={150}
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
                backgroundColor: "#000000",
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
                backgroundColor: "#0F1117",
                borderRightWidth: 1,
                borderRightColor: "rgba(255,255,255,0.12)",
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
