import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { BricolageGrotesque_700Bold } from "@expo-google-fonts/bricolage-grotesque";
import { PlusJakartaSans_500Medium } from "@expo-google-fonts/plus-jakarta-sans";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

const LETTER_S = require("../../../assets/branding/chalk/splash-s.png");
const LETTER_G = require("../../../assets/branding/chalk/splash-g.png");

const BOARD = "#14342A";
const CHALK = "#F4EFE2";
const MARIGOLD = "#F2B632";
const MARK_SIZE = 176;
const WORD = "StudyGarage";
const WIPE_EASE = Easing.bezier(0.45, 0, 0.2, 1);

const WRITE_S_MS = 620;
const WRITE_G_DELAY_MS = 500;
const WRITE_G_MS = 620;
const WORD_DELAY_MS = 950;
const LETTER_STAGGER_MS = 42;
const UNDERLINE_DELAY_MS = 1500;
const TAG_DELAY_MS = 1800;
const EXIT_AT_MS = 2900;
const EXIT_MS = 260;
const FONT_WAIT_MS = 1800;
const FAILSAFE_MS = 6000;

// Writes a letter with a brush: the clip moves one way, the art the opposite way.
function BrushLetter({ source, progress }) {
  const clipStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (progress.value - 1) * MARK_SIZE }],
  }));
  const artStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (1 - progress.value) * MARK_SIZE }],
  }));

  return (
    <Animated.View
      style={[
        clipStyle,
        {
          position: "absolute",
          width: MARK_SIZE,
          height: MARK_SIZE,
          overflow: "hidden",
        },
      ]}
    >
      <Animated.View style={artStyle}>
        <Image
          source={source}
          fadeDuration={0}
          resizeMode="contain"
          style={{ width: MARK_SIZE, height: MARK_SIZE }}
        />
      </Animated.View>
    </Animated.View>
  );
}

function WordLetter({ char, index, start, reducedMotion, fontFamily }) {
  const progress = useSharedValue(reducedMotion ? 1 : 0);

  useEffect(() => {
    if (!start || reducedMotion) return;
    progress.value = withDelay(
      WORD_DELAY_MS + index * LETTER_STAGGER_MS,
      withSpring(1, { damping: 11, stiffness: 170, mass: 0.7 })
    );
  }, [start, reducedMotion]);

  const style = useAnimatedStyle(() => ({
    opacity: Math.min(1, progress.value * 1.6),
    transform: [{ translateY: (1 - progress.value) * 26 }],
  }));

  return (
    <Animated.Text
      style={[
        style,
        {
          color: CHALK,
          fontFamily,
          fontSize: 36,
          lineHeight: 44,
          letterSpacing: -0.6,
        },
      ]}
    >
      {char}
    </Animated.Text>
  );
}

export default function AnimatedBrandSplash({ onFinish }) {
  const reducedMotion = useReducedMotionPreference();
  const [fontsLoaded] = useFonts({
    BricolageGrotesque_700Bold,
    PlusJakartaSans_500Medium,
  });
  const [laidOut, setLaidOut] = useState(false);
  const [started, setStarted] = useState(false);

  const screen = useSharedValue(1);
  const writeS = useSharedValue(0);
  const writeG = useSharedValue(0);
  const underline = useSharedValue(0);
  const tag = useSharedValue(0);
  const finishedRef = useRef(false);
  const exitTimerRef = useRef(null);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onFinish?.();
  };

  useEffect(() => {
    // Never trap the student on the splash if an animation or font stalls.
    const failsafe = setTimeout(finish, FAILSAFE_MS);
    return () => {
      clearTimeout(failsafe);
      clearTimeout(exitTimerRef.current);
    };
  }, []);

  // A cold start blocks the UI while JS loads, so timing must begin after the first
  // painted frame; started at mount, the animation finishes before anyone sees it.
  useEffect(() => {
    if (!laidOut) return undefined;
    const beginWhenPainted = () =>
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setStarted(true))
      );
    if (fontsLoaded) {
      beginWhenPainted();
      return undefined;
    }
    const fontTimer = setTimeout(beginWhenPainted, FONT_WAIT_MS);
    return () => clearTimeout(fontTimer);
  }, [fontsLoaded, laidOut]);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      writeS.value = 1;
      writeG.value = 1;
      underline.value = 1;
      tag.value = 1;
    } else {
      writeS.value = withTiming(1, { duration: WRITE_S_MS, easing: WIPE_EASE });
      writeG.value = withDelay(
        WRITE_G_DELAY_MS,
        withTiming(1, { duration: WRITE_G_MS, easing: WIPE_EASE })
      );
      underline.value = withDelay(
        UNDERLINE_DELAY_MS,
        withTiming(1, { duration: 360, easing: Easing.out(Easing.cubic) })
      );
      tag.value = withDelay(TAG_DELAY_MS, withTiming(1, { duration: 320 }));
    }

    exitTimerRef.current = setTimeout(() => {
      screen.value = withTiming(0, { duration: EXIT_MS }, (done) => {
        if (done) runOnJS(finish)();
      });
    }, reducedMotion ? 900 : EXIT_AT_MS);
  }, [started]);

  const screenStyle = useAnimatedStyle(() => ({ opacity: screen.value }));
  const underlineStyle = useAnimatedStyle(() => ({
    opacity: underline.value > 0 ? 1 : 0,
    transform: [{ scaleX: underline.value }],
  }));
  const tagStyle = useAnimatedStyle(() => ({
    opacity: tag.value,
    transform: [{ translateY: (1 - tag.value) * 6 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      onLayout={() => setLaidOut(true)}
      style={[
        screenStyle,
        {
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: BOARD,
        },
      ]}
    >
      <View style={{ width: MARK_SIZE, height: MARK_SIZE }}>
        <BrushLetter source={LETTER_S} progress={writeS} />
        <BrushLetter source={LETTER_G} progress={writeG} />
      </View>

      <View style={{ flexDirection: "row", marginTop: 4 }}>
        {WORD.split("").map((char, index) => (
          <WordLetter
            key={`${char}-${index}`}
            char={char}
            index={index}
            start={started}
            reducedMotion={reducedMotion}
            fontFamily={fontsLoaded ? "BricolageGrotesque_700Bold" : undefined}
          />
        ))}
      </View>

      <Animated.View
        style={[
          underlineStyle,
          {
            width: 150,
            height: 4,
            borderRadius: 2,
            marginTop: 2,
            backgroundColor: MARIGOLD,
          },
        ]}
      />

      <Animated.View style={[tagStyle, { marginTop: 12 }]}>
        <Text
          style={{
            color: "#B5C6BB",
            fontFamily: fontsLoaded ? "PlusJakartaSans_500Medium" : undefined,
            fontSize: 15,
          }}
        >
          Learn and earn
        </Text>
      </Animated.View>
    </Animated.View>
  );
}
