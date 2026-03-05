import React from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import PremiumText from './PremiumText';

type Props = {
  visible: boolean;
  message: string;
};

export default function PremiumToast({ visible, message }: Props) {
  if (!visible || !message) return null;

  return (
    <View className='pointer-events-none absolute bottom-24 left-0 right-0 z-50 items-center px-5'>
      <Animated.View
        entering={FadeInDown.duration(160)}
        exiting={FadeOutDown.duration(130)}
        className='rounded-full border border-white/14 bg-[#12151F]/95 px-4 py-2'
      >
        <PremiumText variant='caption' className='text-white'>
          {message}
        </PremiumText>
      </Animated.View>
    </View>
  );
}
