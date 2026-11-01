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
    useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useQuizContext } from "./QuizContext";
import ScreenHeader from "./src/design-system/components/ScreenHeader";
import ScreenLayoutContainer from "./src/design-system/components/ScreenLayoutContainer";
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
        backgroundColor: "#FFFCF5",
        textColor: "#1D2A24",
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
            backgroundColor: "#FFFCF5",
            textColor: "#1D2A24",
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
          backgroundColor: "#FFFCF5",
          textColor: "#1D2A24",
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
          backgroundColor: "#FFFCF5",
          textColor: "#BF3F2B",
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
          backgroundColor: "#FFFCF5",
          textColor: "#1D2A24",
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
        backgroundColor: "#FFFCF5",
        textColor: "#1C7C55",
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
        backgroundColor: "#FFFCF5",
        textColor: "#BF3F2B",
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
        color: "#17694F",
        sourceRef: upiTileRef,
      },
      {
        key: "google",
        provider: "google",
        label: "Redeem Code (Google Play)",
        icon: "logo-google-playstore",
        color: "#14342A",
        sourceRef: googleTileRef,
      },
      {
        key: "flipkart",
        provider: "flipkart",
        label: "Flipkart Voucher",
        icon: "cart-outline",
        color: "#2B6A8F",
        sourceRef: flipkartTileRef,
      },
      {
        key: "amazon",
        provider: "amazon",
        label: "Amazon Pay",
        icon: "bag-handle-outline",
        color: "#8C2F4B",
        sourceRef: amazonTileRef,
      },
    ],
    []
  );

  const renderRedeemOptionTile = useCallback(
    ({ item, index }) => (
      <Animated.View
        className="min-w-0 flex-1"
      >
        <View ref={item.sourceRef} collapsable={false}>
          <PressableScale
            onPress={() => handleRedeemTilePress(item.provider)}
            activeScale={0.97}
            className="min-h-[112px] justify-between rounded-[18px] p-3.5"
            style={{ backgroundColor: item.color }}
          >
            <Ionicons name={item.icon} size={28} color="#F4EFE2" />
            <Text
              className="mt-3 text-[17px] font-sg-display leading-[22px] text-[#F4EFE2]"
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
          backgroundColor: "#FFFCF5",
          textColor: "#BF3F2B",
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
        backgroundColor: "#FFFCF5",
        textColor: "#BF3F2B",
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
      <ScreenHeader tone="marigold" eyebrow="Rewards wallet" title="Your coins">
        <AnimatedView
          ref={walletPillRef}
          collapsable={false}
          style={[walletPillStyle, { alignSelf: "flex-start" }]}
          className="mt-3 flex-row items-end"
        >
          <Text
            className="font-sg-display text-[#14342A]"
            style={{
              fontSize: 88,
              lineHeight: 96,
              letterSpacing: -3,
              fontVariant: ["tabular-nums"],
            }}
          >
            {displayScore}
          </Text>
          <Text className="mb-4 ml-2 text-[18px] font-sg-bold text-[#14342A]">
            coins
          </Text>
        </AnimatedView>
      </ScreenHeader>

      {/* Earning comes first: it is the one thing every student can do right now. */}
      <View className="mb-6 rounded-[22px] bg-sg-board p-5">
        <View className="flex-row items-center justify-between">
          <Text className="flex-1 pr-3 text-[24px] leading-[30px] font-sg-display text-[#F4EFE2]">
            Earn more coins
          </Text>
          <View
            className="flex-row"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            {Array.from({ length: dailyAdEarnLimit }).map((_, index) => (
              <View
                key={index}
                className={`ml-1.5 h-3 w-3 rounded-full ${
                  index < adClaimsRemaining ? "bg-[#F2B632]" : "bg-[#F4EFE2]/20"
                }`}
              />
            ))}
          </View>
        </View>
        <Text className="mt-1 text-[14px] leading-[20px] font-sg-medium text-[#B5C6BB]">
          Remaining today: {adClaimsRemaining}/{dailyAdEarnLimit}
        </Text>

        <View className="mt-4">
          <PressableScale
            onPress={handleWatchAdAndEarn}
            activeScale={0.98}
            disabled={adButtonDisabled}
            className={`min-h-[56px] flex-row items-center justify-center rounded-[16px] px-4 ${
              adButtonDisabled ? "bg-[#1C4336]" : "bg-[#F2B632]"
            }`}
          >
            {adUiState === "loading" ? (
              <ActivityIndicator size="small" color="#F4EFE2" />
            ) : (
              <View className="h-7 w-7 items-center justify-center rounded-full bg-[#14342A]">
                <Coin size={15} compact />
              </View>
            )}
            <Text
              className={`ml-2 text-[17px] font-sg-extrabold ${
                adButtonDisabled ? "text-[#F4EFE2]" : "text-[#14342A]"
              }`}
            >
              {adButtonLabel}
            </Text>
          </PressableScale>

          <Animated.View
            pointerEvents="none"
            style={adRewardChipStyle}
            className="absolute right-2 top-[-12px] flex-row items-center rounded-full bg-[#FFFCF5] px-3 py-[4px]"
          >
            <Coin size={11} compact />
            <Text className="ml-1 text-[12px] font-sg-extrabold text-[#9A6400]">
              +{dailyAdRewardCoins}
            </Text>
          </Animated.View>
        </View>

        {adUiState === "cooldown" && adNextWaitMs > 0 ? (
          <Text className="mt-2.5 text-[14px] leading-[20px] font-sg-medium text-[#B5C6BB]">
            Next chance in {formatAdCooldown(adNextWaitMs)}
          </Text>
        ) : null}
        {lastErrorMessage && adClaimsRemaining > 0 ? (
          <Text className="mt-2.5 text-[14px] leading-[20px] font-sg-medium text-[#B5C6BB]">
            {lastErrorMessage}
          </Text>
        ) : null}
        {!rewardedAdAvailable ? (
          <Text className="mt-2.5 text-[14px] leading-[20px] font-sg-medium text-[#B5C6BB]">
            Rewarded ad unit is not configured yet.
          </Text>
        ) : null}
      </View>

      <View className="mb-6">
        <Text className="text-[24px] leading-[30px] font-sg-display text-sg-text">Redeem</Text>
        <Text className="mb-3 mt-0.5 text-[14px] leading-[20px] font-sg-medium text-sg-muted">
          Choose how you want to redeem your coins
        </Text>
        <FlatList
          data={redeemTiles}
          keyExtractor={(item) => item.key}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ columnGap: 10, marginBottom: 10 }}
          renderItem={renderRedeemOptionTile}
        />
      </View>

      {/* Rows, not buttons: these are places to look things up, not actions to take. */}
      <View className="mb-6">
        <Text className="mb-3 text-[24px] leading-[30px] font-sg-display text-sg-text">Activity</Text>
        <View className="overflow-hidden rounded-[18px] bg-sg-surface">
          {[
            { label: "Wallet activity", icon: "receipt-outline", onPress: handleWalletHistory },
            { label: "Coin history", icon: "time-outline", onPress: handleCoinHistory },
          ].map((row, index) => (
            <PressableScale
              key={row.label}
              onPress={row.onPress}
              activeScale={0.99}
              className={`min-h-[60px] flex-row items-center px-4 ${
                index ? "border-t border-sg-border" : ""
              }`}
            >
              <Ionicons name={row.icon} size={22} color="#17694F" />
              <Text className="ml-3 flex-1 text-[16px] font-sg-semibold text-sg-text">{row.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#5F6A63" />
            </PressableScale>
          ))}
        </View>
      </View>

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
            waveDelays={[120]}
            piecesPerWave={18}
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
    backgroundColor: "rgba(15,40,31,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  adRewardCenterCard: {
    minWidth: 200,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(29,42,36,0.14)",
    backgroundColor: "rgba(255,252,245,0.92)",
    alignItems: "center",
    justifyContent: "center",
  },
  adRewardTitle: {
    marginTop: 8,
    color: "#1D2A24",
    fontSize: 17,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
  },
  adRewardSubtitle: {
    marginTop: 4,
    color: "#1D2A24",
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
});

export default TotalScorePage;
