import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  message: string;
  visible: boolean;
  onHide?: () => void;
};

export default function MiniToast({ message, visible, onHide }: Props) {
  const [mounted, setMounted] = useState(visible);
  const autoDismissRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-14);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) });
      translateY.value = withTiming(0, {
        duration: 230,
        easing: Easing.out(Easing.cubic),
      });

      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
      }

      autoDismissRef.current = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 180 });
        translateY.value = withTiming(-10, { duration: 180 }, (finished) => {
          if (finished) {
            runOnJS(setMounted)(false);
            if (onHide) runOnJS(onHide)();
          }
        });
      }, 2500);
    } else if (mounted) {
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
        autoDismissRef.current = null;
      }
      opacity.value = withTiming(0, { duration: 160 });
      translateY.value = withTiming(-10, { duration: 160 }, (finished) => {
        if (finished) {
          runOnJS(setMounted)(false);
        }
      });
    }
  }, [mounted, onHide, opacity, translateY, visible]);

  useEffect(
    () => () => {
      if (autoDismissRef.current) {
        clearTimeout(autoDismissRef.current);
        autoDismissRef.current = null;
      }
      cancelAnimation(opacity);
      cancelAnimation(translateY);
    },
    [opacity, translateY]
  );

  const toastStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!mounted) return null;

  return (
    <View pointerEvents="none" className="absolute left-4 right-4 top-12 z-[70]">
      <Animated.View
        style={toastStyle}
        className="rounded-[14px] border border-white/12 bg-white/8 px-4 py-3"
      >
        <Text className="text-center text-[13px] font-semibold text-[#F5F7FF]">
          {message}
        </Text>
      </Animated.View>
    </View>
  );
}
