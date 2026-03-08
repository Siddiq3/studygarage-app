import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
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
} from 'react-native-reanimated';
import PressableScale from '../ui/PressableScale';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import { colors } from '../../theme/colors';

const SG_BRAND_MINT = '#34D7AD';
const SG_BRAND_PURPLE = '#A92EFF';

type AppUpdateModalProps = {
  visible: boolean;
  type: 'optional' | 'required';
  title?: string;
  message?: string;
  currentVersion?: string;
  latestVersion?: string;
  updateNowLabel?: string;
  laterLabel?: string;
  onUpdate?: () => void | Promise<void>;
  onDismiss?: () => void | Promise<void>;
};

export default function AppUpdateModal({
  visible,
  type,
  title = 'Update available',
  message = 'A newer version is ready to install.',
  currentVersion = '',
  latestVersion = '',
  updateNowLabel = 'Update now',
  laterLabel = 'Later',
  onUpdate,
  onDismiss,
}: AppUpdateModalProps) {
  const { width } = useWindowDimensions();
  const reducedMotionEnabled = useReducedMotionPreference();
  const [rendered, setRendered] = useState(visible);
  const actionLockRef = useRef(false);

  const isRequired = type === 'required';
  const cardWidth = Math.min(420, width * 0.88);

  const scrimProgress = useSharedValue(0);
  const cardProgress = useSharedValue(0);
  const contentProgress = useSharedValue(0);
  const iconPulse = useSharedValue(0);

  const animateIn = useCallback(() => {
    scrimProgress.value = withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });

    if (reducedMotionEnabled) {
      cardProgress.value = withTiming(1, { duration: 220 });
      contentProgress.value = withDelay(40, withTiming(1, { duration: 180 }));
      iconPulse.value = withDelay(80, withTiming(1, { duration: 180 }));
      return;
    }

    cardProgress.value = withSpring(1, {
      damping: 20,
      stiffness: 220,
      mass: 0.86,
      overshootClamping: false,
    });
    contentProgress.value = withDelay(85, withTiming(1, { duration: 220 }));
    iconPulse.value = withDelay(
      150,
      withSequence(
        withTiming(1, { duration: 150, easing: Easing.out(Easing.cubic) }),
        withTiming(0, { duration: 190, easing: Easing.out(Easing.cubic) })
      )
    );
  }, [
    cardProgress,
    contentProgress,
    iconPulse,
    reducedMotionEnabled,
    scrimProgress,
  ]);

  const animateOut = useCallback(() => {
    contentProgress.value = withTiming(0, { duration: 120 });
    scrimProgress.value = withTiming(0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    });
    cardProgress.value = withTiming(
      0,
      {
        duration: reducedMotionEnabled ? 170 : 220,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(setRendered)(false);
          actionLockRef.current = false;
        }
      }
    );
  }, [cardProgress, contentProgress, reducedMotionEnabled, scrimProgress]);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      actionLockRef.current = false;
      cardProgress.value = 0;
      contentProgress.value = 0;
      scrimProgress.value = 0;
      iconPulse.value = 0;
      requestAnimationFrame(animateIn);
      return;
    }

    if (rendered) {
      animateOut();
    }
  }, [
    animateIn,
    animateOut,
    cardProgress,
    contentProgress,
    iconPulse,
    rendered,
    scrimProgress,
    visible,
  ]);

  useEffect(
    () => () => {
      cancelAnimation(scrimProgress);
      cancelAnimation(cardProgress);
      cancelAnimation(contentProgress);
      cancelAnimation(iconPulse);
    },
    [cardProgress, contentProgress, iconPulse, scrimProgress]
  );

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: scrimProgress.value,
  }));

  const cardStyle = useAnimatedStyle(() => {
    const translateY = reducedMotionEnabled ? 0 : (1 - cardProgress.value) * 20;
    const scale = reducedMotionEnabled ? 1 : 0.96 + cardProgress.value * 0.04;
    const opacity = reducedMotionEnabled ? cardProgress.value : 0.3 + cardProgress.value * 0.7;

    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentProgress.value,
    transform: [{ translateY: (1 - contentProgress.value) * 8 }],
  }));

  const iconStyle = useAnimatedStyle(() => {
    const pop = reducedMotionEnabled ? 1 : 1 + iconPulse.value * 0.06;
    const rotate = reducedMotionEnabled ? '0deg' : `${iconPulse.value * 5.5}deg`;

    return {
      transform: [{ scale: pop }, { rotate }],
    };
  });

  const handleDismiss = useCallback(() => {
    if (isRequired || actionLockRef.current) {
      return;
    }
    actionLockRef.current = true;
    onDismiss?.();
  }, [isRequired, onDismiss]);

  const handleUpdate = useCallback(() => {
    if (actionLockRef.current) {
      return;
    }
    actionLockRef.current = true;
    onUpdate?.();
    setTimeout(() => {
      actionLockRef.current = false;
    }, 700);
  }, [onUpdate]);

  if (!rendered) {
    return null;
  }

  const accentTone = SG_BRAND_PURPLE;
  const iconTint = SG_BRAND_MINT;
  const badgeBorder = 'rgba(169,46,255,0.48)';
  const badgeBg = 'rgba(34,24,52,0.88)';

  return (
    <Modal
      transparent
      statusBarTranslucent
      visible={rendered}
      animationType="none"
      onRequestClose={isRequired ? () => {} : handleDismiss}
    >
      <View style={styles.root} pointerEvents="box-none">
        <Animated.View style={[styles.scrim, scrimStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            disabled={isRequired}
            onPress={handleDismiss}
          />
        </Animated.View>

        <View style={styles.center} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.card,
              {
                width: cardWidth,
                backgroundColor: colors.bg.elevated,
                borderColor: colors.border.subtle,
              },
              cardStyle,
            ]}
          >
            <Animated.View
              style={[
                styles.iconGlow,
                {
                  borderColor: accentTone,
                  shadowColor: accentTone,
                },
                iconStyle,
              ]}
            />

            <Animated.View style={[styles.iconBadge, { borderColor: badgeBorder, backgroundColor: badgeBg }, iconStyle]}>
              <Ionicons name="cloud-download-outline" size={24} color={iconTint} />
            </Animated.View>

            {isRequired ? (
              <View style={[styles.requiredPill, { borderColor: badgeBorder, backgroundColor: badgeBg }]}>
                <Text style={[styles.requiredPillText, { color: SG_BRAND_MINT }]}>REQUIRED</Text>
              </View>
            ) : null}

            <Animated.View style={contentStyle}>
              <Text style={[styles.overline, { color: SG_BRAND_MINT }]}>APP UPDATE</Text>
              <Text style={styles.title}>
                {isRequired ? 'Update required' : title}
              </Text>
              <Text style={styles.subtitle}>
                {isRequired
                  ? 'Please update to continue using StudyGarage.'
                  : message || 'New improvements are ready for you.'}
              </Text>

              <View style={styles.versionRow}>
                <View style={styles.versionBlock}>
                  <Text style={styles.versionLabel}>Current version</Text>
                  <Text style={styles.versionValue}>{currentVersion || 'unknown'}</Text>
                </View>
                <View style={styles.versionDivider} />
                <View style={styles.versionBlock}>
                  <Text style={[styles.versionLabel, styles.versionLabelRight]}>Latest version</Text>
                  <Text style={[styles.versionValue, styles.versionValueRight]}>
                    {latestVersion || 'unknown'}
                  </Text>
                </View>
              </View>

              {isRequired ? (
                <PressableScale
                  onPress={handleUpdate}
                  activeScale={0.97}
                  hapticType="tap"
                  className="items-center justify-center rounded-[14px]"
                    style={[
                      styles.primaryButton,
                      styles.singlePrimaryButton,
                      {
                        borderColor: 'rgba(169,46,255,0.44)',
                        backgroundColor: 'rgba(44,24,72,0.94)',
                      },
                    ]}
                  >
                    <Text style={styles.primaryButtonText}>{updateNowLabel}</Text>
                </PressableScale>
              ) : (
                <View style={styles.buttonRow}>
                  <PressableScale
                    onPress={handleDismiss}
                    activeScale={0.97}
                    hapticType="tap"
                    className="items-center justify-center rounded-[14px]"
                    style={styles.secondaryButton}
                  >
                    <Text style={styles.secondaryButtonText}>{laterLabel}</Text>
                  </PressableScale>

                  <PressableScale
                    onPress={handleUpdate}
                    activeScale={0.97}
                    hapticType="tap"
                    className="items-center justify-center rounded-[14px]"
                    style={styles.primaryButton}
                  >
                    <Text style={styles.primaryButtonText}>{updateNowLabel}</Text>
                  </PressableScale>
                </View>
              )}
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay.scrim,
  },
  center: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 12,
  },
  iconGlow: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    opacity: 0.38,
    shadowOpacity: 0.28,
    shadowRadius: 16,
  },
  iconBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  requiredPill: {
    position: 'absolute',
    top: 18,
    right: 20,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  requiredPillText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  overline: {
    color: colors.text.secondary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  title: {
    color: colors.text.primary,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 8,
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  versionRow: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    borderRadius: 14,
    backgroundColor: 'rgba(10,10,10,0.22)',
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  versionBlock: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  versionDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  versionLabel: {
    color: colors.text.secondary,
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  versionLabelRight: {
    textAlign: 'right',
  },
  versionValue: {
    color: colors.text.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  versionValueRight: {
    textAlign: 'right',
    color: SG_BRAND_MINT,
  },
  buttonRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  primaryButton: {
    minHeight: 52,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(176,38,255,0.44)',
    backgroundColor: 'rgba(38,26,61,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  primaryButtonText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    minHeight: 52,
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  secondaryButtonText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  singlePrimaryButton: {
    marginTop: 18,
  },
});
