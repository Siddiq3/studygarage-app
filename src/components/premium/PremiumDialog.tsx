import React from 'react';
import { Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';
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
        className='absolute inset-0 bg-sg-bg2'
      >
        <Pressable onPress={onClose} className='absolute inset-0' />
      </Animated.View>
      <Animated.View
        className='w-full max-w-[390px] overflow-hidden rounded-[18px] border border-sg-border bg-[#FFFCF5] p-5'
      >
        {children}
      </Animated.View>
    </View>
  );
}
