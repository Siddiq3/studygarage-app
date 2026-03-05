import React from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';

type Props = {
  visible: boolean;
  onClose: () => void;
  heightPct?: number;
  children: React.ReactNode;
};

export default function PremiumSheet({
  visible,
  onClose,
  heightPct = 0.6,
  children,
}: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const progress = useSharedValue(visible ? 1 : 0);
  const sheetMinHeight = Dimensions.get('window').height * heightPct;

  React.useEffect(() => {
    progress.value = withTiming(visible ? 1 : 0, {
      duration: reducedMotionEnabled ? 130 : visible ? 220 : 180,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress, reducedMotionEnabled, visible]);

  const scrimStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.4,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 120 }],
    opacity: 0.85 + progress.value * 0.15,
  }));

  if (!visible) {
    return null;
  }

  return (
    <View className='absolute inset-0 z-50 justify-end'>
      <Animated.View style={scrimStyle} className='absolute inset-0'>
        <Pressable onPress={onClose} className='absolute inset-0 bg-black/65' />
      </Animated.View>
      <Animated.View
        style={[sheetStyle, { minHeight: sheetMinHeight }]}
        className='overflow-hidden rounded-t-[28px] border border-white/12 bg-[#151821]'
      >
        <View className='items-center pb-2 pt-3'>
          <View className='h-1.5 w-12 rounded-full bg-white/25' />
        </View>
        <View className='px-4 pb-6'>{children}</View>
      </Animated.View>
    </View>
  );
}
