import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  FlatList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
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
import { useQuizContext } from "./QuizContext";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
import SGCard from "./src/design-system/components/SGCard";
import SGButton from "./src/design-system/components/SGButton";
import Coin from "./src/components/rewards/Coin";
import VoucherDetailModal from "./src/components/wallet/VoucherDetailModal";
import CoinFlyOverlay from "./src/components/ui/CoinFlyOverlay";
import PressableScale from "./src/components/ui/PressableScale";
import FullScreenPaperBlast from "./src/components/ui/FullScreenPaperBlast";
import useRedeem from "./src/hooks/useRedeem";
import useReducedMotionPreference from "./src/hooks/useReducedMotionPreference";
import useRemoteConfig from "./src/hooks/useRemoteConfig";
import { defaultConfig } from "./src/config/remoteConfig";
import useRewardedAdsService from "./src/services/ads/rewardedAdsService";
import {
  acquireDailyAdLock,
  getDailyAdStatus,
  incrementDailyAdClaim,
  releaseDailyAdLock,
  setRewardedAdNextAvailableAfter,
} from "./src/services/rewards/dailyAdLimitStorage";
import useAppSound from "./src/hooks/useAppSound";

const AnimatedView = Animated.createAnimatedComponent(View);
const MIN_LOADING_MS = 900;
const AD_FAILURE_COOLDOWN_MS = 2500;
const AD_SUCCESS_HOLD_MS = 900;
const AD_REWARD_BURST_DELAY_MS = 860;
const AD_REWARD_POST_LAND_HOLD_MS = 820;
const AD_REWARD_OVERLAY_EXIT_MS = 220;
const AD_REWARD_LAND_FALLBACK_MS = 3200;

const TotalScorePage = ({ navigation }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const reducedMotionEnabled = useReducedMotionPreference();
  const { config: remoteConfig } = useRemoteConfig();
  const { totalScore, addCoins, spendCoins } = useQuizContext();

  const walletPillRef = useRef(null);
  const upiTileRef = useRef(null);
  const googleTileRef = useRef(null);
  const flipkartTileRef = useRef(null);
  const amazonTileRef = useRef(null);
  const selectedVoucherSourceRef = useRef(null);
  const pendingVoucherRef = useRef(null);
  const pendingVoucherCoinsRef = useRef(0);

  const [displayScore, setDisplayScore] = useState(0);
  const displayScoreRef = useRef(0);
  const scoreDurationRef = useRef(860);
  const scoreAnimFrameRef = useRef(null);

  const [voucherModalVisible, setVoucherModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  const [coinFlyVisible, setCoinFlyVisible] = useState(false);
  const [coinFlyStartLayout, setCoinFlyStartLayout] = useState(null);
  const [coinFlyEndLayout, setCoinFlyEndLayout] = useState(null);
  const [adCoinFlyVisible, setAdCoinFlyVisible] = useState(false);
  const [adCoinFlyStartLayout, setAdCoinFlyStartLayout] = useState(null);
  const [adCoinFlyEndLayout, setAdCoinFlyEndLayout] = useState(null);
  const [adRewardOverlayVisible, setAdRewardOverlayVisible] = useState(false);
  const [adRewardPaperSeed, setAdRewardPaperSeed] = useState(1);
  const [adRewardPaperToken, setAdRewardPaperToken] = useState(0);
  const [adClaimsRemaining, setAdClaimsRemaining] = useState(
    defaultConfig.rewards.watchAd.maxPerDay
  );
  const [adUiState, setAdUiState] = useState("loading");
  const [lastErrorMessage, setLastErrorMessage] = useState(null);
  const [adNextWaitMs, setAdNextWaitMs] = useState(0);

  const walletPillScale = useSharedValue(1);
  const coinShineX = useSharedValue(-56);
  const adRewardChipScale = useSharedValue(0.9);
  const adRewardChipOpacity = useSharedValue(0);
  const adRewardOverlayOpacity = useSharedValue(0);
  const adRewardOverlayScale = useSharedValue(0.98);
  const adUiTimerRef = useRef(null);
  const adActionRequestIdRef = useRef(0);
  const adClaimsRemainingRef = useRef(adClaimsRemaining);
  const adRewardTimersRef = useRef([]);
  const adCoinLandResolverRef = useRef(null);
  const adCoinLandFallbackTimerRef = useRef(null);

  const {
    isAvailable: rewardedAdAvailable,
    lastError: rewardedAdError,
    preload: preloadRewardedAd,
    showAndWaitForReward,
  } = useRewardedAdsService();
  const { playSound } = useAppSound();

  const handleDeductCoins = useCallback(
    async (coinCost) => {
      scoreDurationRef.current = 250;
      await spendCoins({
        eventId: `wallet_redeem:${Date.now()}:${Math.random()
          .toString(36)
          .slice(2, 8)}`,
        amount: Math.abs(coinCost),
        reason: "redeem_voucher",
      });
    },
    [spendCoins]
  );

  const {
    redeemingVoucherId,
    walletHistory,
    enqueueToast,
    getCoinsShortfall,
    redeemVoucher,
  } = useRedeem({ onDeductCoins: handleDeductCoins });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const animateScore = useCallback((fromValue, toValue, durationMs) => {
    if (scoreAnimFrameRef.current) {
      cancelAnimationFrame(scoreAnimFrameRef.current);
      scoreAnimFrameRef.current = null;
    }

    let startAt = null;
    const run = (ts) => {
      if (startAt == null) startAt = ts;
      const progressRatio = Math.min(
        1,
        (ts - startAt) / Math.max(1, durationMs)
      );
      const eased = 1 - (1 - progressRatio) * (1 - progressRatio);
      const nextValue = Math.round(fromValue + (toValue - fromValue) * eased);
      if (nextValue !== displayScoreRef.current) {
        displayScoreRef.current = nextValue;
        setDisplayScore(nextValue);
      }

      if (progressRatio < 1) {
        scoreAnimFrameRef.current = requestAnimationFrame(run);
      } else {
        scoreAnimFrameRef.current = null;
      }
    };

    scoreAnimFrameRef.current = requestAnimationFrame(run);
  }, []);

  useEffect(() => {
    animateScore(displayScoreRef.current, totalScore, scoreDurationRef.current);
    scoreDurationRef.current = 860;
  }, [animateScore, totalScore]);

  useEffect(
    () => () => {
      if (scoreAnimFrameRef.current) {
        cancelAnimationFrame(scoreAnimFrameRef.current);
        scoreAnimFrameRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    coinShineX.value = withSequence(
      withTiming(58, { duration: 3200 }),
      withTiming(-56, { duration: 1 })
    );
  }, [coinShineX, totalScore]);

  const coinShineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: coinShineX.value }],
    opacity: 0.2,
  }));

  const walletPillStyle = useAnimatedStyle(() => ({
    transform: [{ scale: walletPillScale.value }],
  }));

  const adRewardChipStyle = useAnimatedStyle(() => ({
    opacity: adRewardChipOpacity.value,
    transform: [
      { scale: adRewardChipScale.value },
      { translateY: (1 - adRewardChipOpacity.value) * -6 },
    ],
  }));

  const adRewardOverlayStyle = useAnimatedStyle(() => ({
    opacity: adRewardOverlayOpacity.value,
  }));

  const adRewardCenterCardStyle = useAnimatedStyle(() => ({
    opacity: adRewardOverlayOpacity.value,
    transform: [{ scale: adRewardOverlayScale.value }],
  }));

  const dailyAdRewardCoins = useMemo(
    () =>
      Math.max(
        0,
        Number(
          remoteConfig?.watchAdRewardCoins ??
            remoteConfig?.rewards?.watchAd?.coinsPerView ??
            defaultConfig.watchAdRewardCoins
        )
      ),
    [remoteConfig]
  );
  const dailyAdEarnLimit = useMemo(
    () =>
      Math.max(
        1,
        Number(
          remoteConfig?.rewards?.watchAd?.maxPerDay ??
            defaultConfig.rewards.watchAd.maxPerDay
        ) || 1
      ),
    [remoteConfig]
  );
  const nextAdCooldownMs = useMemo(
    () =>
      Math.max(
        0,
        Number(
          remoteConfig?.watchAdCooldownSeconds ??
            remoteConfig?.rewards?.watchAd?.cooldownSeconds ??
            defaultConfig.watchAdCooldownSeconds
        ) || 0
      ) * 1000,
    [remoteConfig]
  );

  const measureInWindowAsync = useCallback((refObj) => {
    return new Promise((resolve) => {
      const node = refObj?.current;
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

  const triggerWalletPillRewardPulse = useCallback(() => {
    walletPillScale.value = withSequence(
      withSpring(1.08, { damping: 11, stiffness: 260 }),
      withSpring(1, { damping: 13, stiffness: 240 })
    );
  }, [walletPillScale]);

  const clearAdRewardTimers = useCallback(() => {
    adRewardTimersRef.current.forEach((timerId) => clearTimeout(timerId));
    adRewardTimersRef.current = [];

    if (adCoinLandFallbackTimerRef.current) {
      clearTimeout(adCoinLandFallbackTimerRef.current);
      adCoinLandFallbackTimerRef.current = null;
    }
  }, []);

  const completeAdCoinLandWait = useCallback((didLand) => {
    if (adCoinLandFallbackTimerRef.current) {
      clearTimeout(adCoinLandFallbackTimerRef.current);
      adCoinLandFallbackTimerRef.current = null;
    }
    const resolver = adCoinLandResolverRef.current;
    adCoinLandResolverRef.current = null;
    resolver?.(didLand);
  }, []);

  const waitForStep = useCallback(
    (durationMs, requestId) =>
      new Promise((resolve) => {
        const timerId = setTimeout(() => {
          adRewardTimersRef.current = adRewardTimersRef.current.filter(
            (id) => id !== timerId
          );
          resolve(adActionRequestIdRef.current === requestId);
        }, durationMs);
        adRewardTimersRef.current.push(timerId);
      }),
    []
  );

  const openAdRewardOverlay = useCallback(() => {
    setAdRewardOverlayVisible(true);
    setAdRewardPaperSeed((current) => current + 1);
    setAdRewardPaperToken((current) => current + 1);
    adRewardOverlayOpacity.value = 0;
    adRewardOverlayScale.value = 0.96;
    adRewardOverlayOpacity.value = withTiming(1, { duration: 180 });
    adRewardOverlayScale.value = withSpring(1, {
      damping: 14,
      stiffness: 220,
      mass: 0.6,
    });
  }, [adRewardOverlayOpacity, adRewardOverlayScale]);

  const closeAdRewardOverlay = useCallback(
    (requestId) => {
      adRewardOverlayOpacity.value = withTiming(0, { duration: 180 });
      adRewardOverlayScale.value = withTiming(0.985, { duration: 180 });
      const timerId = setTimeout(() => {
        adRewardTimersRef.current = adRewardTimersRef.current.filter(
          (id) => id !== timerId
        );
        if (adActionRequestIdRef.current !== requestId) return;
        setAdRewardOverlayVisible(false);
        setAdCoinFlyVisible(false);
        setAdCoinFlyStartLayout(null);
        setAdCoinFlyEndLayout(null);
      }, AD_REWARD_OVERLAY_EXIT_MS);
      adRewardTimersRef.current.push(timerId);
    },
    [adRewardOverlayOpacity, adRewardOverlayScale]
  );

  const getRewardBurstCenterLayout = useCallback(() => {
    const centerSize = 62;
    return {
      x: screenWidth * 0.5 - centerSize * 0.5,
      y: screenHeight * 0.44 - centerSize * 0.5,
      width: centerSize,
      height: centerSize,
    };
  }, [screenHeight, screenWidth]);

  const runAdCoinBurstToWallet = useCallback(
    async (requestId) => {
      if (adActionRequestIdRef.current !== requestId || reducedMotionEnabled) {
        return false;
      }

      const endLayout = await measureInWindowAsync(walletPillRef);
      if (!endLayout || adActionRequestIdRef.current !== requestId)
        return false;

      const startLayout = getRewardBurstCenterLayout();
      return new Promise((resolve) => {
        adCoinLandResolverRef.current = resolve;
        setAdCoinFlyStartLayout(startLayout);
        setAdCoinFlyEndLayout(endLayout);
        setAdCoinFlyVisible(true);

        adCoinLandFallbackTimerRef.current = setTimeout(() => {
          if (adActionRequestIdRef.current !== requestId) {
            completeAdCoinLandWait(false);
            return;
          }
          setAdCoinFlyVisible(false);
          setAdCoinFlyStartLayout(null);
          setAdCoinFlyEndLayout(null);
          completeAdCoinLandWait(false);
        }, AD_REWARD_LAND_FALLBACK_MS);
      });
    },
    [
      completeAdCoinLandWait,
      getRewardBurstCenterLayout,
      measureInWindowAsync,
      reducedMotionEnabled,
      screenHeight,
      screenWidth,
    ]
  );

  const clearAdUiTimer = useCallback(() => {
    if (adUiTimerRef.current) {
      clearTimeout(adUiTimerRef.current);
      adUiTimerRef.current = null;
    }
  }, []);

  const formatAdCooldown = useCallback((milliseconds) => {
    const safeMs = Math.max(0, Number(milliseconds) || 0);
    const totalSeconds = Math.ceil(safeMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60);
    const minutesPart = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${String(minutesPart).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    }
    if (minutes > 0) {
      return `${minutesPart}:${String(seconds).padStart(2, "0")}`;
    }
    return `${seconds}s`;
  }, []);

  const startLoadingWithMinDuration = useCallback(
    (requestId) => {
      clearAdUiTimer();
      setAdUiState("loading");
      setLastErrorMessage(null);

      const startedAt = Date.now();
      return new Promise((resolve) => {
        const settle = () =>
          resolve(adActionRequestIdRef.current === requestId);
        const elapsed = Date.now() - startedAt;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
        if (remaining <= 0) {
          settle();
          return;
        }
        adUiTimerRef.current = setTimeout(() => {
          adUiTimerRef.current = null;
          settle();
        }, remaining);
      });
    },
    [clearAdUiTimer]
  );

  const finalizeToIdleSafely = useCallback(
    (requestId) => {
      if (adActionRequestIdRef.current !== requestId) return;
      clearAdUiTimer();
      setAdNextWaitMs(0);
      if (adClaimsRemainingRef.current <= 0) {
        setAdUiState("error");
        setLastErrorMessage("Come back tomorrow.");
        return;
      }
      setAdUiState("idle");
      setLastErrorMessage(null);
    },
    [clearAdUiTimer]
  );

  const enterCooldown = useCallback(
    (message, requestId) => {
      if (adActionRequestIdRef.current !== requestId) return;
      clearAdUiTimer();
      setAdUiState("cooldown");
      setAdNextWaitMs(0);
      setLastErrorMessage(
        message || "Ad not available. Try again in a moment."
      );
      adUiTimerRef.current = setTimeout(() => {
        adUiTimerRef.current = null;
        finalizeToIdleSafely(requestId);
      }, AD_FAILURE_COOLDOWN_MS);
    },
    [clearAdUiTimer, finalizeToIdleSafely]
  );

  const startPostRewardCooldown = useCallback(
    async (requestId, durationMs = nextAdCooldownMs, persist = false) => {
      if (adActionRequestIdRef.current !== requestId) return;
      const safeDuration = Math.max(0, Number(durationMs) || 0);
      if (safeDuration <= 0) {
        finalizeToIdleSafely(requestId);
        return;
      }

      if (persist) {
        await setRewardedAdNextAvailableAfter(safeDuration).catch(() => {});
      }

      clearAdUiTimer();
      const endAt = Date.now() + safeDuration;
      setAdUiState("cooldown");
      setLastErrorMessage(null);
      setAdNextWaitMs(safeDuration);

      const tick = () => {
        if (adActionRequestIdRef.current !== requestId) return;
        const remaining = Math.max(0, endAt - Date.now());
        setAdNextWaitMs(remaining);
        if (remaining <= 0) {
          finalizeToIdleSafely(requestId);
          return;
        }
        adUiTimerRef.current = setTimeout(tick, 1000);
      };

      adUiTimerRef.current = setTimeout(tick, 1000);
    },
    [clearAdUiTimer, finalizeToIdleSafely, nextAdCooldownMs]
  );

  const refreshDailyAdState = useCallback(async () => {
    const status = await getDailyAdStatus(dailyAdEarnLimit);
    setAdClaimsRemaining(status.remaining);
    setAdNextWaitMs(status.cooldownRemainingMs || 0);
    if (status.cooldownRemainingMs > 0 && status.remaining > 0) {
      await startPostRewardCooldown(
        adActionRequestIdRef.current,
        status.cooldownRemainingMs,
        false
      );
      return status;
    }
    if (status.remaining <= 0) {
      setAdUiState("error");
      setLastErrorMessage("Come back tomorrow.");
    } else if (status.lockActive) {
      setAdUiState("cooldown");
      setLastErrorMessage("Ad session syncing. Try again soon.");
    } else {
      setAdUiState("idle");
      setLastErrorMessage(null);
    }
    return status;
  }, [dailyAdEarnLimit, startPostRewardCooldown]);

  useEffect(() => {
    let mounted = true;

    const hydrateAdState = async () => {
      try {
        const status = await getDailyAdStatus(dailyAdEarnLimit);
        if (!mounted) return;
        setAdClaimsRemaining(status.remaining);
        setAdNextWaitMs(status.cooldownRemainingMs || 0);
        if (status.cooldownRemainingMs > 0 && status.remaining > 0) {
          await startPostRewardCooldown(
            adActionRequestIdRef.current,
            status.cooldownRemainingMs,
            false
          );
          return;
        }
        if (status.remaining <= 0) {
          setAdUiState("error");
          setLastErrorMessage("Come back tomorrow.");
          return;
        }
        if (status.lockActive) {
          setAdUiState("cooldown");
          setLastErrorMessage("Ad session syncing. Try again soon.");
          clearAdUiTimer();
          adUiTimerRef.current = setTimeout(() => {
            adUiTimerRef.current = null;
            if (!mounted) return;
            setAdUiState("idle");
            setLastErrorMessage(null);
          }, 1400);
          return;
        }
        setAdUiState("idle");
        setLastErrorMessage(null);
      } catch (_error) {
        if (!mounted) return;
        setAdUiState("idle");
      }
    };

    hydrateAdState().catch(() => {
      if (mounted) setAdUiState("idle");
    });

    return () => {
      mounted = false;
      adActionRequestIdRef.current += 1;
      clearAdUiTimer();
      clearAdRewardTimers();
      completeAdCoinLandWait(false);
      setAdRewardOverlayVisible(false);
    };
  }, [
    clearAdRewardTimers,
    clearAdUiTimer,
    completeAdCoinLandWait,
    dailyAdEarnLimit,
    startPostRewardCooldown,
  ]);

  useEffect(() => {
    adClaimsRemainingRef.current = adClaimsRemaining;
  }, [adClaimsRemaining]);

  useEffect(() => {
    preloadRewardedAd().catch(() => {});
  }, [preloadRewardedAd]);

  const handleContinue = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem("userName");
      const storedAvatar = await AsyncStorage.getItem("avatar");
      const storedStateBoard = await AsyncStorage.getItem("stateBoard");
      const storedClassValue = await AsyncStorage.getItem("classValue");

      if (
        storedUserName &&
        storedAvatar &&
        storedStateBoard &&
        storedClassValue
      ) {
        navigation.navigate("SecondPage", {
          userName: storedUserName,
          stateBoard: storedStateBoard,
          classValue: storedClassValue,
          avatar: storedAvatar,
        });
      } else {
        Alert.alert(
          "Data not found",
          "Please fill in all required fields in the FirstPage."
        );
      }
    } catch (error) {
      console.error("Error checking stored data:", error);
    }
  };

  const handleWalletHistory = () => {
    navigation.navigate("WalletActivityScreen", {
      withdrawalHistory: walletHistory,
    });
  };

  const handleCoinHistory = () => {
    navigation.navigate("CoinHistoryScreen");
  };

  const handleRedeemTilePress = useCallback(
    (provider) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

      switch (provider) {
        case "upi":
          navigation.navigate("UPIVoucherScreen");
          return;
        case "google":
          navigation.navigate("GoogleVoucherScreen");
          return;
        case "flipkart":
          navigation.navigate("FlipkartVoucherScreen");
          return;
        case "amazon":
          navigation.navigate("AmazonVoucherScreen");
          return;
        default:
          break;
      }

      enqueueToast({
        text: "Redeem option will be available soon.",
        backgroundColor: "#1A2130",
        textColor: "#D7DEEF",
      });
    },
    [enqueueToast, navigation]
  );

  const adButtonDisabled = adUiState !== "idle";

  const adButtonLabel = (() => {
    if (adClaimsRemaining <= 0) return "Come back tomorrow";
    if (adUiState === "loading") return "Loading...";
    if (adUiState === "showing") return "Watching ad...";
    if (adUiState === "cooldown") {
      return adNextWaitMs > 0
        ? `Next in ${formatAdCooldown(adNextWaitMs)}`
        : "Try again soon";
    }
    if (adUiState === "success") return "Coins added";
    if (adUiState === "error") return "Try again soon";
    return `Watch Ad +${dailyAdRewardCoins}`;
  })();

  const handleWatchAdAndEarn = useCallback(async () => {
    if (adButtonDisabled) return;

    const requestId = adActionRequestIdRef.current + 1;
    adActionRequestIdRef.current = requestId;

    let hasLock = false;
    const loadingGate = startLoadingWithMinDuration(requestId);

    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

      if (adClaimsRemainingRef.current <= 0) {
        await loadingGate;
        if (adActionRequestIdRef.current !== requestId) return;
        setAdUiState("error");
        setLastErrorMessage("Come back tomorrow.");
        return;
      }

      const lockResult = await acquireDailyAdLock(dailyAdEarnLimit);
      setAdClaimsRemaining(lockResult.remaining);
      adClaimsRemainingRef.current = lockResult.remaining;

      if (!lockResult.ok) {
        await loadingGate;
        if (adActionRequestIdRef.current !== requestId) return;
        if (lockResult.reason === "cooldown") {
          await startPostRewardCooldown(
            requestId,
            lockResult.cooldownRemainingMs || nextAdCooldownMs,
            false
          );
          return;
        }
        if (lockResult.reason === "limit_reached") {
          setAdUiState("error");
          setLastErrorMessage("Daily limit reached. Come back tomorrow.");
          enqueueToast({
            text: "Daily ad limit reached. Come back tomorrow.",
            backgroundColor: "#1A2130",
            textColor: "#D7DEEF",
          });
          return;
        }
        enterCooldown("Ad not available. Try again in a moment.", requestId);
        return;
      }

      hasLock = true;
      await loadingGate;
      if (adActionRequestIdRef.current !== requestId) return;
      setAdUiState("showing");
      const result = await showAndWaitForReward();
      if (adActionRequestIdRef.current !== requestId) return;

      if (!result.shown) {
        await releaseDailyAdLock();
        hasLock = false;
        await refreshDailyAdState();
        await preloadRewardedAd().catch(() => {});
        const failMessage =
          rewardedAdError || "Ad not available. Try again in a moment.";
        enqueueToast({
          text: failMessage,
          backgroundColor: "#1A2130",
          textColor: "#D7DEEF",
        });
        enterCooldown(failMessage, requestId);
        return;
      }

      if (!result.rewarded) {
        await releaseDailyAdLock();
        hasLock = false;
        await refreshDailyAdState();
        enqueueToast({
          text: "Reward not received. Please watch the full ad and try again.",
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        finalizeToIdleSafely(requestId);
        return;
      }

      setAdUiState("success");
      setLastErrorMessage(null);
      openAdRewardOverlay();
      // Sound disabled for now.
      // playSound("reward_reveal").catch(() => {});
      const shouldContinueAfterDelay = await waitForStep(
        AD_REWARD_BURST_DELAY_MS,
        requestId
      );
      if (
        !shouldContinueAfterDelay ||
        adActionRequestIdRef.current !== requestId
      ) {
        return;
      }

      const didCoinLand = await runAdCoinBurstToWallet(requestId).catch(
        () => false
      );
      if (!didCoinLand) {
        const shouldContinueFallback = await waitForStep(260, requestId);
        if (
          !shouldContinueFallback ||
          adActionRequestIdRef.current !== requestId
        ) {
          return;
        }
      }

      triggerWalletPillRewardPulse();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
      // Sound disabled for now.
      // playSound("coin_land").catch(() => {});

      scoreDurationRef.current = 700;
      const watchAdEventId = `watchAd:${lockResult.dateKey}:${
        lockResult.claimedCount + 1
      }`;
      const rewardCredit = await addCoins({
        eventId: watchAdEventId,
        amount: dailyAdRewardCoins,
        source: "watch_ad",
        meta: {
          index: lockResult.claimedCount + 1,
          dateKey: lockResult.dateKey,
        },
      });
      if (!rewardCredit.applied) {
        enqueueToast({
          text: "Reward already credited for this ad.",
          backgroundColor: "#1A2130",
          textColor: "#D7DEEF",
        });
      }
      const nextStatus = await incrementDailyAdClaim(dailyAdEarnLimit);
      setAdClaimsRemaining(nextStatus.remaining);
      adClaimsRemainingRef.current = nextStatus.remaining;
      hasLock = false;

      adRewardChipOpacity.value = 0;
      adRewardChipScale.value = 0.84;
      adRewardChipOpacity.value = withSequence(
        withTiming(1, { duration: 180 }),
        withTiming(0, { duration: 640 })
      );
      adRewardChipScale.value = withSequence(
        withTiming(1.14, { duration: 240 }),
        withTiming(1, { duration: 260 })
      );

      enqueueToast({
        text: `+${dailyAdRewardCoins} coins added`,
        backgroundColor: "#14221A",
        textColor: "#A7F5C8",
      });

      const shouldKeepOverlay = await waitForStep(
        AD_REWARD_POST_LAND_HOLD_MS,
        requestId
      );
      if (!shouldKeepOverlay || adActionRequestIdRef.current !== requestId) {
        return;
      }
      closeAdRewardOverlay(requestId);
      clearAdUiTimer();
      adUiTimerRef.current = setTimeout(() => {
        adUiTimerRef.current = null;
        if (nextStatus.remaining > 0) {
          startPostRewardCooldown(requestId, nextAdCooldownMs, true);
          return;
        }
        finalizeToIdleSafely(requestId);
      }, AD_SUCCESS_HOLD_MS);
    } catch (error) {
      console.error("Watch ad reward flow failed:", error);
      completeAdCoinLandWait(false);
      closeAdRewardOverlay(requestId);
      await loadingGate.catch(() => {});
      enqueueToast({
        text: "Ad failed. Please try again.",
        backgroundColor: "#2A1720",
        textColor: "#FFD4DF",
      });
      enterCooldown("Ad not available. Try again in a moment.", requestId);
    } finally {
      if (hasLock) {
        await releaseDailyAdLock().catch(() => {});
        await refreshDailyAdState().catch(() => {});
      }
    }
  }, [
    adButtonDisabled,
    adUiState,
    adRewardChipOpacity,
    adRewardChipScale,
    closeAdRewardOverlay,
    completeAdCoinLandWait,
    clearAdUiTimer,
    enqueueToast,
    enterCooldown,
    finalizeToIdleSafely,
    preloadRewardedAd,
    refreshDailyAdState,
    rewardedAdError,
    showAndWaitForReward,
    startPostRewardCooldown,
    startLoadingWithMinDuration,
    waitForStep,
    dailyAdRewardCoins,
    dailyAdEarnLimit,
    nextAdCooldownMs,
    openAdRewardOverlay,
    playSound,
    runAdCoinBurstToWallet,
    triggerWalletPillRewardPulse,
    addCoins,
  ]);

  const redeemTiles = useMemo(
    () => [
      {
        key: "upi",
        provider: "upi",
        label: "Get on UPI",
        icon: "qr-code-outline",
        color: "#6FE0C2",
        sourceRef: upiTileRef,
      },
      {
        key: "google",
        provider: "google",
        label: "Redeem Code (Google Play)",
        icon: "logo-google-playstore",
        color: "#7FB6FF",
        sourceRef: googleTileRef,
      },
      {
        key: "flipkart",
        provider: "flipkart",
        label: "Flipkart Voucher",
        icon: "cart-outline",
        color: "#8F74FF",
        sourceRef: flipkartTileRef,
      },
      {
        key: "amazon",
        provider: "amazon",
        label: "Amazon Pay",
        icon: "bag-handle-outline",
        color: "#FFB86A",
        sourceRef: amazonTileRef,
      },
    ],
    []
  );

  const renderRedeemOptionTile = useCallback(
    ({ item, index }) => (
      <Animated.View
        entering={FadeInDown.delay(60 + index * 45).duration(220)}
        className="min-w-0 flex-1"
      >
        <View ref={item.sourceRef} collapsable={false}>
          <PressableScale
            onPress={() => handleRedeemTilePress(item.provider)}
            activeScale={0.97}
            className="min-h-[134px] rounded-[20px] border border-white/10 bg-[#151B27] px-3.5 py-4"
            style={{
              shadowColor: item.color,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <View className="h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-white/12 bg-[#111623]">
              <Ionicons name={item.icon} size={19} color={item.color} />
            </View>
            <Text
              className="mt-3 text-[14px] font-extrabold leading-[18px] text-white"
              numberOfLines={2}
            >
              {item.label}
            </Text>
          </PressableScale>
        </View>
      </Animated.View>
    ),
    [handleRedeemTilePress]
  );

  const handleVoucherPress = useCallback(
    (voucher, sourceRef) => {
      const shortfall = getCoinsShortfall(voucher.coinCost, totalScore);
      if (shortfall > 0) {
        enqueueToast({
          text: `Insufficient Balance! You need ${shortfall} more coins.`,
          backgroundColor: "#2A1720",
          textColor: "#FFD4DF",
        });
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Warning
        ).catch(() => {});
        return;
      }

      selectedVoucherSourceRef.current = sourceRef || null;
      setSelectedVoucher(voucher);
      setVoucherModalVisible(true);
    },
    [enqueueToast, getCoinsShortfall, totalScore]
  );

  const completeRedeemFlow = useCallback(async () => {
    const voucher = pendingVoucherRef.current;
    if (!voucher) return;

    try {
      const result = await redeemVoucher(
        voucher,
        pendingVoucherCoinsRef.current
      );
      if (result.ok) {
        walletPillScale.value = withSequence(
          withSpring(1.06, { damping: 11, stiffness: 260 }),
          withSpring(1, { damping: 13, stiffness: 240 })
        );
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success
        ).catch(() => {});
      }
    } catch (error) {
      console.error("Redeem flow failed:", error);
      enqueueToast({
        text: "Redeem failed. Please try again.",
        backgroundColor: "#2A1720",
        textColor: "#FFD4DF",
      });
    } finally {
      pendingVoucherRef.current = null;
      setCoinFlyVisible(false);
      setCoinFlyStartLayout(null);
      setCoinFlyEndLayout(null);
      setSelectedVoucher(null);
    }
  }, [enqueueToast, redeemVoucher, walletPillScale]);

  const handleConfirmRedeem = useCallback(async () => {
    if (!selectedVoucher || redeemingVoucherId) return;

    pendingVoucherRef.current = selectedVoucher;
    pendingVoucherCoinsRef.current = totalScore;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});

    if (reducedMotionEnabled) {
      setVoucherModalVisible(false);
      completeRedeemFlow().catch((error) => {
        console.error("Redeem failed:", error);
      });
      return;
    }

    const [startLayout, endLayout] = await Promise.all([
      measureInWindowAsync(selectedVoucherSourceRef.current),
      measureInWindowAsync(walletPillRef),
    ]);

    setVoucherModalVisible(false);

    if (!startLayout || !endLayout) {
      completeRedeemFlow().catch((error) => {
        console.error("Redeem fallback failed:", error);
      });
      return;
    }

    setCoinFlyStartLayout(startLayout);
    setCoinFlyEndLayout(endLayout);
    setCoinFlyVisible(true);
  }, [
    completeRedeemFlow,
    measureInWindowAsync,
    redeemingVoucherId,
    reducedMotionEnabled,
    selectedVoucher,
    totalScore,
  ]);

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(240)}>
        <SGCard className="mb-4 overflow-hidden">
          <Text className="text-[11px] font-bold uppercase tracking-[1.2px] text-sg-muted dark:text-sgd-muted">
            Rewards Wallet
          </Text>
          <Text className="mt-1 text-[26px] font-extrabold leading-[31px] text-sg-text dark:text-sgd-text">
            Coin Balance
          </Text>

          <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-[11px] font-bold uppercase tracking-[1px] text-white/70">
              Available
            </Text>
            <AnimatedView
              ref={walletPillRef}
              collapsable={false}
              style={walletPillStyle}
              className="rounded-full border border-[#FFD700]/30 bg-[#2A2312] px-2.5 py-1"
            >
              <View className="flex-row items-center">
                <Coin size={12} compact />
                <Text className="ml-1 text-[10px] font-extrabold text-[#FFD700]">
                  {displayScore}
                </Text>
              </View>
            </AnimatedView>
          </View>

          <View className="mt-2 flex-row items-end">
            <View className="mb-1 mr-2">
              <Coin size={22} compact />
            </View>
            <View className="relative overflow-hidden rounded-[12px] px-1">
              <View className="absolute -inset-x-2 -top-1 bottom-1 rounded-full bg-[#FFD700]/16" />
              <Text className="text-[44px] font-black leading-[46px] text-white">
                {displayScore}
              </Text>
              <AnimatedView
                pointerEvents="none"
                style={coinShineStyle}
                className="absolute inset-y-0 left-[-30px] w-7 rounded-full bg-white/35"
              />
            </View>
          </View>
          <Text className="mt-1 text-[12px] font-semibold text-[#BFC7DA]">
            Current wallet coins
          </Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(45).duration(220)}>
        <View className="mb-4">
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
                Redeem Options
              </Text>
              <Text className="mt-1 text-[22px] font-extrabold text-sg-text dark:text-sgd-text">
                Redeem Options
              </Text>
              <Text className="mt-1 text-[12px] font-semibold text-[#AEB8CF]">
                Choose how you want to redeem your coins
              </Text>
            </View>
          </View>

          <FlatList
            data={redeemTiles}
            keyExtractor={(item) => item.key}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ columnGap: 14, marginBottom: 14 }}
            contentContainerStyle={{ paddingTop: 4 }}
            renderItem={renderRedeemOptionTile}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
            Earn More Coins
          </Text>
          <Text className="mt-1 text-[22px] font-extrabold text-sg-text dark:text-sgd-text">
            Earn More Coins
          </Text>
          <Text className="mt-1 text-[12px] font-semibold text-[#AEB8CF]">
            {dailyAdEarnLimit}x per day
          </Text>

          <View className="mt-3">
            <PressableScale
              onPress={handleWatchAdAndEarn}
              activeScale={0.98}
              disabled={adButtonDisabled}
              className={`min-h-[52px] flex-row items-center justify-center rounded-[16px] border px-4 ${
                adButtonDisabled
                  ? "border-white/10 bg-[#171C27]"
                  : "border-[#FFD700]/25 bg-[#1A1F2B]"
              }`}
            >
              {adUiState === "loading" ? (
                <ActivityIndicator size="small" color="#F5F7FF" />
              ) : (
                <Coin size={15} compact />
              )}
              <Text
                className={`ml-2 text-[15px] font-extrabold ${
                  adButtonDisabled ? "text-white/70" : "text-[#F5F7FF]"
                }`}
              >
                {adButtonLabel}
              </Text>
            </PressableScale>

            <Animated.View
              pointerEvents="none"
              style={adRewardChipStyle}
              className="absolute right-2 top-[-12px] flex-row items-center rounded-full border border-[#FFD700]/34 bg-[#2A2414] px-3 py-[4px]"
            >
              <Coin size={11} compact />
              <Text className="ml-1 text-[11px] font-extrabold text-[#FFD700]">
                +{dailyAdRewardCoins}
              </Text>
            </Animated.View>
          </View>

          <Text className="mt-2 text-[11px] font-semibold text-[#B8C0D4]">
            Remaining today: {adClaimsRemaining}/{dailyAdEarnLimit}
          </Text>
          {adUiState === "cooldown" && adNextWaitMs > 0 ? (
            <Text className="mt-1 text-[11px] font-semibold text-[#B8C0D4]">
              Next chance in {formatAdCooldown(adNextWaitMs)}
            </Text>
          ) : null}
          {lastErrorMessage && adClaimsRemaining > 0 ? (
            <Text className="mt-1 text-[11px] font-medium text-[#AEB8CF]">
              {lastErrorMessage}
            </Text>
          ) : null}
          {!rewardedAdAvailable ? (
            <Text className="mt-1 text-[11px] font-medium text-[#AEB8CF]">
              Rewarded ad unit is not configured yet.
            </Text>
          ) : null}
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">
            History
          </Text>
          <Text className="mt-1 text-[20px] font-extrabold text-sg-text dark:text-sgd-text">
            Wallet Activity
          </Text>
          <Text className="mt-1 text-[12px] font-semibold text-[#AEB8CF]">
            Track redemption requests and coin activity
          </Text>
          <SGButton
            label="Wallet Activity"
            onPress={handleWalletHistory}
            variant="ghost"
            className="mt-3"
          />
          <SGButton
            label="Coin History"
            onPress={handleCoinHistory}
            variant="ghost"
            className="mt-2"
          />
        </SGCard>
      </Animated.View>

      <VoucherDetailModal
        visible={voucherModalVisible}
        voucher={selectedVoucher}
        userCoins={totalScore}
        isRedeeming={Boolean(redeemingVoucherId)}
        onCancel={() => {
          if (redeemingVoucherId) return;
          setVoucherModalVisible(false);
        }}
        onConfirm={handleConfirmRedeem}
      />

      {coinFlyVisible ? (
        <CoinFlyOverlay
          startLayout={coinFlyStartLayout}
          endLayout={coinFlyEndLayout}
          count={8}
          onComplete={() => {
            completeRedeemFlow().catch((error) => {
              console.error("Coin fly completion failed:", error);
              setCoinFlyVisible(false);
              setCoinFlyStartLayout(null);
              setCoinFlyEndLayout(null);
              setSelectedVoucher(null);
              pendingVoucherRef.current = null;
            });
          }}
        />
      ) : null}

      {adRewardOverlayVisible ? (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            styles.adRewardOverlay,
            adRewardOverlayStyle,
          ]}
        >
          <FullScreenPaperBlast
            visible={adRewardOverlayVisible}
            triggerToken={adRewardPaperToken}
            seed={adRewardPaperSeed}
            waveDelays={[120, 900, 1720]}
            piecesPerWave={46}
            zIndex={76}
          />
          <Animated.View
            style={[styles.adRewardCenterCard, adRewardCenterCardStyle]}
          >
            <Coin size={30} compact />
            <Text style={styles.adRewardTitle}>Reward Unlocked</Text>
            <Text style={styles.adRewardSubtitle}>
              Adding coins to wallet...
            </Text>
          </Animated.View>
        </Animated.View>
      ) : null}

      {adCoinFlyVisible ? (
        <CoinFlyOverlay
          startLayout={adCoinFlyStartLayout}
          endLayout={adCoinFlyEndLayout}
          count={18}
          minSize={20}
          maxSize={30}
          zIndex={80}
          delayStepMs={40}
          baseDurationMs={800}
          durationJitterMs={180}
          arcMin={68}
          arcJitter={56}
          driftBase={12}
          driftJitter={24}
          onComplete={() => {
            setAdCoinFlyVisible(false);
            setAdCoinFlyStartLayout(null);
            setAdCoinFlyEndLayout(null);
            completeAdCoinLandWait(true);
          }}
        />
      ) : null}
    </ScreenLayoutContainer>
  );
};

const styles = StyleSheet.create({
  adRewardOverlay: {
    zIndex: 75,
    elevation: 75,
    backgroundColor: "rgba(5, 8, 15, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  adRewardCenterCard: {
    minWidth: 200,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(24,30,43,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  adRewardTitle: {
    marginTop: 8,
    color: "#F5F7FF",
    fontSize: 17,
    fontWeight: "800",
  },
  adRewardSubtitle: {
    marginTop: 4,
    color: "#AEB8CF",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default TotalScorePage;
