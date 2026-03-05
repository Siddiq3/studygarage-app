import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AccessibilityInfo,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type NotificationPermissionSheetProps = {
  visible: boolean;
  onAllow: () => void;
  onNotNow: () => void;
};

const SHEET_BG = "#101116";
const SCRIM_COLOR = "rgba(10,10,10,0.78)";

export default function NotificationPermissionSheet({
  visible,
  onAllow,
  onNotNow,
}: NotificationPermissionSheetProps) {
  const { height } = useWindowDimensions();
  const [rendered, setRendered] = useState(visible);
  const [reducedMotionEnabled, setReducedMotionEnabled] = useState(false);

  const actionLockRef = useRef(false);

  const scrimProgress = useSharedValue(0);
  const sheetProgress = useSharedValue(0);
  const sectionOne = useSharedValue(0);
  const sectionTwo = useSharedValue(0);
  const sectionThree = useSharedValue(0);

  const primaryScale = useSharedValue(1);
  const secondaryScale = useSharedValue(1);

  const sheetHiddenOffset = useMemo(
    () => Math.min(520, height * 0.62),
    [height]
  );

  useEffect(() => {
    let mounted = true;

    AccessibilityInfo.isReduceMotionEnabled()
      .then((enabled) => {
        if (mounted) {
          setReducedMotionEnabled(Boolean(enabled));
        }
      })
      .catch(() => {});

    const onMotionChanged = (enabled: boolean) => {
      setReducedMotionEnabled(Boolean(enabled));
    };

    const subscription = AccessibilityInfo.addEventListener?.(
      "reduceMotionChanged",
      onMotionChanged
    );

    return () => {
      mounted = false;
      if (subscription && typeof subscription.remove === "function") {
        subscription.remove();
      }
    };
  }, []);

  const animateOut = useCallback(
    (onDone?: () => void) => {
      sectionOne.value = withTiming(0, { duration: 120 });
      sectionTwo.value = withTiming(0, { duration: 120 });
      sectionThree.value = withTiming(0, { duration: 120 });
      scrimProgress.value = withTiming(0, { duration: 200 });
      sheetProgress.value = withTiming(
        0,
        {
          duration: reducedMotionEnabled ? 170 : 230,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(setRendered)(false);
            if (onDone) {
              runOnJS(onDone)();
            }
          }
        }
      );
    },
    [
      reducedMotionEnabled,
      scrimProgress,
      sectionOne,
      sectionThree,
      sectionTwo,
      sheetProgress,
    ]
  );

  const animateIn = useCallback(() => {
    scrimProgress.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });

    if (reducedMotionEnabled) {
      sheetProgress.value = withTiming(1, { duration: 200 });
      sectionOne.value = withTiming(1, { duration: 180 });
      sectionTwo.value = withDelay(30, withTiming(1, { duration: 180 }));
      sectionThree.value = withDelay(55, withTiming(1, { duration: 180 }));
      return;
    }

    sheetProgress.value = withSpring(1, {
      damping: 18,
      stiffness: 210,
      mass: 0.9,
    });

    sectionOne.value = withDelay(70, withTiming(1, { duration: 210 }));
    sectionTwo.value = withDelay(120, withTiming(1, { duration: 210 }));
    sectionThree.value = withDelay(170, withTiming(1, { duration: 210 }));
  }, [
    reducedMotionEnabled,
    scrimProgress,
    sectionOne,
    sectionThree,
    sectionTwo,
    sheetProgress,
  ]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      sectionOne.value = 0;
      sectionTwo.value = 0;
      sectionThree.value = 0;

      requestAnimationFrame(() => {
        animateIn();
      });
      return;
    }

    if (rendered) {
      animateOut();
    }
  }, [
    animateIn,
    animateOut,
    rendered,
    sectionOne,
    sectionThree,
    sectionTwo,
    visible,
  ]);

  useEffect(() => {
    return () => {
      cancelAnimation(scrimProgress);
      cancelAnimation(sheetProgress);
      cancelAnimation(sectionOne);
      cancelAnimation(sectionTwo);
      cancelAnimation(sectionThree);
      cancelAnimation(primaryScale);
      cancelAnimation(secondaryScale);
    };
  }, [
    primaryScale,
    scrimProgress,
    secondaryScale,
    sectionOne,
    sectionThree,
    sectionTwo,
    sheetProgress,
  ]);

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimProgress.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - sheetProgress.value) * sheetHiddenOffset }],
  }));

  const sectionOneStyle = useAnimatedStyle(() => ({
    opacity: sectionOne.value,
    transform: [{ translateY: (1 - sectionOne.value) * 8 }],
  }));

  const sectionTwoStyle = useAnimatedStyle(() => ({
    opacity: sectionTwo.value,
    transform: [{ translateY: (1 - sectionTwo.value) * 8 }],
  }));

  const sectionThreeStyle = useAnimatedStyle(() => ({
    opacity: sectionThree.value,
    transform: [{ translateY: (1 - sectionThree.value) * 8 }],
  }));

  const primaryButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: primaryScale.value }],
  }));

  const secondaryButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: secondaryScale.value }],
  }));

  const closeThen = useCallback(
    (next: () => void) => {
      if (actionLockRef.current) return;
      actionLockRef.current = true;
      animateOut(() => {
        actionLockRef.current = false;
        next();
      });
    },
    [animateOut]
  );

  const handleAllow = useCallback(() => {
    closeThen(onAllow);
  }, [closeThen, onAllow]);

  const handleNotNow = useCallback(() => {
    closeThen(onNotNow);
  }, [closeThen, onNotNow]);

  if (!rendered) {
    return null;
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <Animated.View style={[styles.scrim, scrimStyle]} pointerEvents="auto">
        <Pressable style={StyleSheet.absoluteFill} onPress={handleNotNow} />
      </Animated.View>

      <View style={styles.bottomWrap} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.sheet,
            { maxHeight: Math.round(height * 0.55) },
            sheetStyle,
          ]}
          pointerEvents="auto"
        >
          <Animated.View style={[styles.section, sectionOneStyle]}>
            <View style={styles.handle} />

            <View style={styles.iconChip}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#F5F7FF"
              />
            </View>

            <Text style={styles.title}>Stay Updated</Text>
            <Text style={styles.subtitle}>
              Get reminders for streaks, rewards, and new quizzes.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.section, sectionTwoStyle]}>
            <FeatureRow icon="flame-outline" text="Daily streak reminders" />
            <FeatureRow icon="wallet-outline" text="Reward confirmations" />
            <FeatureRow icon="sparkles-outline" text="New quiz drops" />
            <Text style={styles.note}>
              You can change this anytime in Settings.
            </Text>
          </Animated.View>

          <Animated.View style={[styles.section, sectionThreeStyle]}>
            <Pressable
              onPress={handleAllow}
              onPressIn={() => {
                primaryScale.value = withTiming(0.98, { duration: 90 });
              }}
              onPressOut={() => {
                primaryScale.value = withSpring(1, {
                  damping: 12,
                  stiffness: 260,
                  mass: 0.35,
                });
              }}
            >
              <Animated.View style={primaryButtonStyle}>
                <LinearGradient
                  colors={["#2A1D49", "#21304D", "#1F463F"]}
                  start={{ x: 0, y: 0.2 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.primaryButton}
                >
                  <Text style={styles.primaryButtonText}>
                    Allow Notifications
                  </Text>
                </LinearGradient>
              </Animated.View>
            </Pressable>

            <Pressable
              onPress={handleNotNow}
              onPressIn={() => {
                secondaryScale.value = withTiming(0.98, { duration: 90 });
              }}
              onPressOut={() => {
                secondaryScale.value = withSpring(1, {
                  damping: 12,
                  stiffness: 260,
                  mass: 0.35,
                });
              }}
              style={{ marginTop: 10 }}
            >
              <Animated.View
                style={[styles.secondaryButton, secondaryButtonStyle]}
              >
                <Text style={styles.secondaryButtonText}>Not now</Text>
              </Animated.View>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

function FeatureRow({ icon, text }: { icon: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIconWrap}>
        <Ionicons name={icon as any} size={14} color="#36D8A3" />
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SCRIM_COLOR,
  },
  bottomWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  sheet: {
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 28,
    backgroundColor: SHEET_BG,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  section: {
    width: "100%",
  },
  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    alignSelf: "center",
    backgroundColor: "rgba(245,247,255,0.40)",
    marginBottom: 12,
  },
  iconChip: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  title: {
    marginTop: 12,
    color: "#F5F7FF",
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
  },
  subtitle: {
    marginTop: 6,
    color: "#B8C0D4",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Inter_500Medium",
    maxWidth: "94%",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  featureIconWrap: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  featureText: {
    marginLeft: 10,
    color: "#F5F7FF",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  note: {
    marginTop: 12,
    color: "#B8C0D4",
    fontSize: 12,
    lineHeight: 16,
    fontFamily: "Inter_500Medium",
    opacity: 0.9,
  },
  primaryButton: {
    minHeight: 50,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#F5F7FF",
    fontSize: 15,
    fontFamily: "Inter_700Bold",
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#F5F7FF",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
  },
});
