import { useCallback, useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export default function useReferralAnimations() {
  const cardScale = useSharedValue(0.96);
  const chipScale = useSharedValue(0.95);
  const chipGlowOpacity = useSharedValue(0.06);
  const copySparkle = useSharedValue(0);
  const shareBurst = useSharedValue(0);
  const claimedCountScale = useSharedValue(1);
  const toastOpacity = useSharedValue(0);
  const toastTranslateY = useSharedValue(24);

  useEffect(() => {
    cardScale.value = withSpring(1, {
      damping: 14,
      stiffness: 190,
      mass: 0.82,
    });

    chipScale.value = withSpring(1, {
      damping: 15,
      stiffness: 200,
      mass: 0.86,
    });

    chipGlowOpacity.value = withSequence(
      withTiming(0.12, { duration: 260 }),
      withTiming(0.07, { duration: 500 })
    );

    return () => {
      cancelAnimation(cardScale);
      cancelAnimation(chipScale);
      cancelAnimation(chipGlowOpacity);
      cancelAnimation(copySparkle);
      cancelAnimation(shareBurst);
      cancelAnimation(claimedCountScale);
      cancelAnimation(toastOpacity);
      cancelAnimation(toastTranslateY);
    };
  }, [
    cardScale,
    chipGlowOpacity,
    chipScale,
    claimedCountScale,
    copySparkle,
    shareBurst,
    toastOpacity,
    toastTranslateY,
  ]);

  const playCopyFeedback = useCallback(() => {
    cardScale.value = withSequence(
      withTiming(1.01, { duration: 90 }),
      withSpring(1, { damping: 14, stiffness: 250, mass: 0.7 })
    );

    copySparkle.value = 0;
    copySparkle.value = withTiming(1, {
      duration: 420,
      easing: Easing.out(Easing.cubic),
    });
  }, [cardScale, copySparkle]);

  const playShareFeedback = useCallback(() => {
    shareBurst.value = 0;
    shareBurst.value = withTiming(1, {
      duration: 760,
      easing: Easing.out(Easing.cubic),
    });

    chipGlowOpacity.value = withSequence(
      withTiming(0.14, { duration: 160 }),
      withTiming(0.07, { duration: 380 })
    );
  }, [chipGlowOpacity, shareBurst]);

  const playClaimFeedback = useCallback(() => {
    chipGlowOpacity.value = withSequence(
      withTiming(0.18, { duration: 180 }),
      withTiming(0.07, { duration: 420 })
    );

    chipScale.value = withSequence(
      withTiming(1.05, { duration: 140 }),
      withSpring(1, { damping: 13, stiffness: 220, mass: 0.75 })
    );

    claimedCountScale.value = withSequence(
      withTiming(1.08, { duration: 120 }),
      withSpring(1, { damping: 14, stiffness: 230, mass: 0.7 })
    );
  }, [chipGlowOpacity, chipScale, claimedCountScale]);

  const showToastAnimation = useCallback(() => {
    toastOpacity.value = withTiming(1, { duration: 180 });
    toastTranslateY.value = withTiming(0, { duration: 180 });
  }, [toastOpacity, toastTranslateY]);

  const hideToastAnimation = useCallback(() => {
    toastOpacity.value = withTiming(0, { duration: 180 });
    toastTranslateY.value = withTiming(20, { duration: 180 });
  }, [toastOpacity, toastTranslateY]);

  return {
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
  };
}
