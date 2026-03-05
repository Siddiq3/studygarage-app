import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';

type Props = {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function PremiumDialog({ visible, onClose, children }: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();

  if (!visible) return null;

  return (
    <View className='absolute inset-0 z-50 items-center justify-center px-6'>
      <Animated.View
        entering={FadeIn.duration(160)}
        exiting={FadeOut.duration(120)}
        className='absolute inset-0 bg-black/60'
      >
        <Pressable onPress={onClose} className='absolute inset-0' />
      </Animated.View>
      <Animated.View
        entering={reducedMotionEnabled ? FadeIn.duration(120) : ZoomIn.duration(180)}
        exiting={reducedMotionEnabled ? FadeOut.duration(100) : ZoomOut.duration(150)}
        className='w-full max-w-[390px] overflow-hidden rounded-[24px] border border-white/12 bg-[#141821] p-5'
      >
        {children}
      </Animated.View>
    </View>
  );
}
