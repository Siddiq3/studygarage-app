import React, { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

type Props = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
  style?: StyleProp<ViewStyle>;
  baseColor?: string;
  highlightColor?: string;
};

export default function ShimmerSkeleton({
  width = "100%",
  height = 16,
  borderRadius = 10,
  className,
  style,
  baseColor = "rgba(255,255,255,0.10)",
  highlightColor = "rgba(255,255,255,0.30)",
}: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const shimmerProgress = useSharedValue(-1);
  const [layoutWidth, setLayoutWidth] = useState(120);

  useEffect(() => {
    if (reducedMotionEnabled) {
      shimmerProgress.value = 0;
      return;
    }

    shimmerProgress.value = withRepeat(
      withTiming(1, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );

    return () => {
      cancelAnimation(shimmerProgress);
    };
  }, [reducedMotionEnabled, shimmerProgress]);

  const shimmerStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      shimmerProgress.value,
      [-1, 1],
      [-layoutWidth, layoutWidth]
    );
    return {
      transform: [{ translateX }],
      opacity: reducedMotionEnabled ? 0 : 1,
    };
  });

  const handleLayout = (event: LayoutChangeEvent) => {
    const nextWidth = event?.nativeEvent?.layout?.width;
    if (Number.isFinite(nextWidth) && nextWidth > 0) {
      setLayoutWidth(nextWidth);
    }
  };

  return (
    <View
      onLayout={handleLayout}
      className={className}
      style={[
        {
          width,
          height,
          borderRadius,
          overflow: "hidden",
          backgroundColor: baseColor,
        },
        style,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, shimmerStyle]}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            highlightColor,
            "rgba(255,255,255,0)",
          ]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            width: Math.max(64, layoutWidth * 0.52),
            height: "100%",
          }}
        />
      </Animated.View>
    </View>
  );
}
