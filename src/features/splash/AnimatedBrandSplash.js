import React, { useEffect, useRef } from "react";
import { AccessibilityInfo, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const LOGO = require("../../../assets/branding/final-logo-pack/sg-mint-purple-512-transparent.png");

const BG_BASE = "#0B0C10";
const BRAND_MINT = "#34D7AD";
const BRAND_PURPLE = "#A92EFF";
const SUB_COLOR = "rgba(184,192,212,0.75)";
const TAGLINE_TEXT = "LEARN & EARN";
const MIN_SPLASH_MS = 2600;
const SPLASH_TIMING = {
  overlayIn: 230,
  glowIn: 260,
  iconOpacityIn: 260,
  iconScaleSpringDelay: 24,
  glossDelay: 410,
  glossSweep: 520,
  studyDelay: 360,
  studyIn: 270,
  garageStagger: 90,
  garageIn: 270,
  tagDelay: 720,
  tagIn: 250,
  exitFade: 320,
};

export default function AnimatedBrandSplash({ onFinish }) {
  const overlayOpacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0.65);
  const logoOpacity = useSharedValue(1);
  const logoScale = useSharedValue(1);
  const logoY = useSharedValue(0);
  const studyOpacity = useSharedValue(1);
  const studyY = useSharedValue(10);
  const garageOpacity = useSharedValue(1);
  const garageY = useSharedValue(10);
  const tagOpacity = useSharedValue(0.75);
  const tagY = useSharedValue(6);
  const iconGlossX = useSharedValue(-1.2);
  const iconGlossOpacity = useSharedValue(0);
  const logoSettledRef = useRef(false);
  const finishedRef = useRef(false);
  const entryDoneRef = useRef(false);
  const exitStartedRef = useRef(false);
  const mountTimeRef = useRef(0);
  const startFallbackTimerRef = useRef(null);
  const minHoldTimerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    mountTimeRef.current = Date.now();

    const finish = () => {
      if (!mounted || finishedRef.current) return;
      finishedRef.current = true;
      if (onFinish) {
        onFinish();
      }
    };

    const triggerSettleHaptic = () => {
      if (logoSettledRef.current) return;
      logoSettledRef.current = true;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    };

    const startExit = () => {
      if (!mounted || exitStartedRef.current || finishedRef.current) return;
      exitStartedRef.current = true;
      overlayOpacity.value = withTiming(
        0,
        {
          duration: SPLASH_TIMING.exitFade,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          if (finished) {
            runOnJS(finish)();
          }
        }
      );
    };

    const onEntryDone = () => {
      if (!mounted || entryDoneRef.current) return;
      entryDoneRef.current = true;
      const elapsed = Date.now() - mountTimeRef.current;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      if (minHoldTimerRef.current) {
        clearTimeout(minHoldTimerRef.current);
      }
      minHoldTimerRef.current = setTimeout(() => {
        if (mounted) {
          startExit();
        }
      }, remaining);
    };

    const runAnimation = (reducedMotionEnabled) => {
      const garageDelay =
        SPLASH_TIMING.studyDelay + SPLASH_TIMING.garageStagger;

      overlayOpacity.value = 0.88;
      glowOpacity.value = 0.28;
      logoOpacity.value = 0.24;
      logoScale.value = 0.93;
      logoY.value = 8;
      studyOpacity.value = 0.18;
      studyY.value = 10;
      garageOpacity.value = 0.18;
      garageY.value = 10;
      tagOpacity.value = 0;
      tagY.value = 6;
      overlayOpacity.value = withTiming(1, {
        duration: SPLASH_TIMING.overlayIn,
        easing: Easing.out(Easing.cubic),
      });
      glowOpacity.value = withTiming(1, { duration: SPLASH_TIMING.glowIn });
      logoOpacity.value = withTiming(1, {
        duration: SPLASH_TIMING.iconOpacityIn,
      });
      iconGlossX.value = -1.2;
      iconGlossOpacity.value = 0;

      if (reducedMotionEnabled) {
        logoScale.value = withTiming(1, { duration: 260 });
        logoY.value = withTiming(0, { duration: 240 });
        studyOpacity.value = withDelay(
          SPLASH_TIMING.studyDelay,
          withTiming(1, { duration: SPLASH_TIMING.studyIn })
        );
        studyY.value = withDelay(
          SPLASH_TIMING.studyDelay,
          withTiming(0, { duration: SPLASH_TIMING.studyIn })
        );
        garageOpacity.value = withDelay(
          garageDelay,
          withTiming(1, { duration: SPLASH_TIMING.garageIn })
        );
        garageY.value = withDelay(
          garageDelay,
          withTiming(0, { duration: SPLASH_TIMING.garageIn })
        );
        tagOpacity.value = withDelay(
          SPLASH_TIMING.tagDelay,
          withTiming(1, { duration: SPLASH_TIMING.tagIn }, (finished) => {
            if (finished) {
              runOnJS(onEntryDone)();
            }
          })
        );
        tagY.value = withDelay(
          SPLASH_TIMING.tagDelay,
          withTiming(0, { duration: SPLASH_TIMING.tagIn })
        );
        return;
      }

      logoScale.value = withDelay(
        SPLASH_TIMING.iconScaleSpringDelay,
        withSpring(
          1,
          {
            damping: 16,
            stiffness: 210,
            mass: 0.9,
          },
          (finished) => {
            if (finished) {
              runOnJS(triggerSettleHaptic)();
            }
          }
        )
      );
      logoY.value = withTiming(0, {
        duration: 360,
        easing: Easing.out(Easing.cubic),
      });

      iconGlossOpacity.value = withDelay(
        SPLASH_TIMING.glossDelay,
        withSequence(
          withTiming(0.12, { duration: 120, easing: Easing.out(Easing.cubic) }),
          withTiming(0, {
            duration: SPLASH_TIMING.glossSweep - 120,
            easing: Easing.in(Easing.cubic),
          })
        )
      );
      iconGlossX.value = withDelay(
        SPLASH_TIMING.glossDelay,
        withTiming(1.2, {
          duration: SPLASH_TIMING.glossSweep,
          easing: Easing.out(Easing.cubic),
        })
      );

      studyOpacity.value = withDelay(
        SPLASH_TIMING.studyDelay,
        withTiming(1, { duration: SPLASH_TIMING.studyIn })
      );
      studyY.value = withDelay(
        SPLASH_TIMING.studyDelay,
        withTiming(0, {
          duration: SPLASH_TIMING.studyIn,
          easing: Easing.out(Easing.cubic),
        })
      );

      garageOpacity.value = withDelay(
        garageDelay,
        withTiming(1, { duration: SPLASH_TIMING.garageIn })
      );
      garageY.value = withDelay(
        garageDelay,
        withTiming(0, {
          duration: SPLASH_TIMING.garageIn,
          easing: Easing.out(Easing.cubic),
        })
      );

      tagOpacity.value = withDelay(
        SPLASH_TIMING.tagDelay,
        withTiming(1, { duration: SPLASH_TIMING.tagIn }, (finished) => {
          if (finished) {
            runOnJS(onEntryDone)();
          }
        })
      );
      tagY.value = withDelay(
        SPLASH_TIMING.tagDelay,
        withTiming(0, {
          duration: SPLASH_TIMING.tagIn,
          easing: Easing.out(Easing.cubic),
        })
      );
    };

    let hasStarted = false;
    const safeStart = (reducedMotionEnabled) => {
      if (!mounted || hasStarted) return;
      hasStarted = true;
      runAnimation(Boolean(reducedMotionEnabled));
    };

    startFallbackTimerRef.current = setTimeout(() => {
      safeStart(false);
    }, 140);

    AccessibilityInfo.isReduceMotionEnabled()
      .then((reduced) => {
        if (mounted && startFallbackTimerRef.current) {
          clearTimeout(startFallbackTimerRef.current);
        }
        safeStart(Boolean(reduced));
      })
      .catch(() => {
        if (mounted && startFallbackTimerRef.current) {
          clearTimeout(startFallbackTimerRef.current);
        }
        safeStart(false);
      });

    return () => {
      mounted = false;
      if (startFallbackTimerRef.current) {
        clearTimeout(startFallbackTimerRef.current);
      }
      if (minHoldTimerRef.current) {
        clearTimeout(minHoldTimerRef.current);
      }
      cancelAnimation(overlayOpacity);
      cancelAnimation(glowOpacity);
      cancelAnimation(logoOpacity);
      cancelAnimation(logoScale);
      cancelAnimation(logoY);
      cancelAnimation(studyOpacity);
      cancelAnimation(studyY);
      cancelAnimation(garageOpacity);
      cancelAnimation(garageY);
      cancelAnimation(tagOpacity);
      cancelAnimation(tagY);
      cancelAnimation(iconGlossX);
      cancelAnimation(iconGlossOpacity);
    };
  }, [
    garageOpacity,
    garageY,
    glowOpacity,
    iconGlossOpacity,
    iconGlossX,
    logoOpacity,
    logoScale,
    logoY,
    onFinish,
    overlayOpacity,
    tagOpacity,
    tagY,
    studyOpacity,
    studyY,
  ]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }, { translateY: logoY.value }],
  }));

  const studyStyle = useAnimatedStyle(() => ({
    opacity: studyOpacity.value,
    transform: [{ translateY: studyY.value }],
  }));

  const garageStyle = useAnimatedStyle(() => ({
    opacity: garageOpacity.value,
    transform: [{ translateY: garageY.value }],
  }));

  const tagStyle = useAnimatedStyle(() => ({
    opacity: tagOpacity.value,
    transform: [{ translateY: tagY.value }],
  }));

  const glossStyle = useAnimatedStyle(() => ({
    opacity: iconGlossOpacity.value,
    transform: [{ translateX: iconGlossX.value * 124 }, { rotateZ: "-18deg" }],
  }));

  return (
    <Animated.View
      style={overlayStyle}
      className="absolute inset-0 z-50 items-center justify-center"
      pointerEvents="none"
    >
      <View className="absolute inset-0" style={{ backgroundColor: BG_BASE }} />

      <LinearGradient
        colors={["#111729", "#0B0C10", "#07090F"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="absolute inset-0"
      />

      <Animated.View
        style={glowStyle}
        className="absolute -top-16 left-1/2 h-[340px] w-[340px] -translate-x-[170px] rounded-full"
        pointerEvents="none"
      >
        <View
          className="h-full w-full rounded-full"
          style={{ backgroundColor: "rgba(169,46,255,0.12)" }}
        />
      </Animated.View>
      <Animated.View
        style={glowStyle}
        className="absolute bottom-[-120px] left-1/2 h-[360px] w-[360px] -translate-x-[180px] rounded-full"
        pointerEvents="none"
      >
        <View
          className="h-full w-full rounded-full"
          style={{ backgroundColor: "rgba(52,215,173,0.10)" }}
        />
      </Animated.View>

      <View className="absolute inset-0 items-center justify-center px-8">
        <Animated.View style={logoStyle} className="items-center">
          <View className="h-[112px] w-[112px] items-center justify-center overflow-hidden rounded-[28px] border border-white/12 bg-[#111727]">
            <Image
              source={LOGO}
              resizeMode="contain"
              style={{ width: 90, height: 90 }}
            />
            <Animated.View
              pointerEvents="none"
              style={glossStyle}
              className="absolute left-[-30px] top-[-18px] h-[148px] w-[40px]"
            >
              <LinearGradient
                colors={[
                  "rgba(255,255,255,0)",
                  "rgba(255,255,255,0.22)",
                  "rgba(255,255,255,0)",
                ]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="h-full w-full"
              />
            </Animated.View>
          </View>
        </Animated.View>

        <View className="mt-5 flex-row items-end">
          <Animated.View style={studyStyle}>
            <Text
              style={{
                color: BRAND_MINT,
                fontSize: 37,
                fontWeight: "900",
                letterSpacing: -0.92,
                lineHeight: 40,
                fontFamily: "Inter_800ExtraBold",
              }}
            >
              Study
            </Text>
          </Animated.View>
          <Animated.View style={garageStyle}>
            <Text
              style={{
                color: BRAND_PURPLE,
                fontSize: 37,
                fontWeight: "900",
                letterSpacing: -0.92,
                lineHeight: 40,
                fontFamily: "Inter_800ExtraBold",
              }}
            >
              Garage
            </Text>
          </Animated.View>
        </View>

        <Animated.View style={tagStyle} className="mt-2.5">
          <Text
            style={{
              color: SUB_COLOR,
              fontSize: 12,
              letterSpacing: 2.5,
              fontFamily: "Inter_500Medium",
            }}
          >
            {TAGLINE_TEXT}
          </Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
}
