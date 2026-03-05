import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import PressableScale from '../ui/PressableScale';
import PremiumText from './PremiumText';
import { haptics } from '../../services/haptics';

type Props = {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  hint?: string;
};

export default function PremiumToggle({ label, value, onChange, hint }: Props) {
  const x = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    x.value = withSpring(value ? 1 : 0, {
      damping: 14,
      stiffness: 220,
      mass: 0.8,
    });
  }, [value, x]);

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value * 20 }],
  }));

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: x.value > 0.5 ? 'rgba(143,116,255,0.38)' : 'rgba(255,255,255,0.12)',
  }));

  const handlePress = () => {
    haptics.trigger('selection');
    onChange(!value);
  };

  return (
    <PressableScale onPress={handlePress} activeScale={0.98} className='rounded-[16px] border border-white/10 bg-white/5 px-3 py-3'>
      <View className='flex-row items-center justify-between'>
        <View className='flex-1 pr-3'>
          <PremiumText variant='body.md' className='text-white'>
            {label}
          </PremiumText>
          {hint ? (
            <PremiumText variant='caption' className='mt-0.5 text-white/60'>
              {hint}
            </PremiumText>
          ) : null}
        </View>
        <Animated.View style={trackStyle} className='h-8 w-14 rounded-full border border-white/15 p-1'>
          <Animated.View style={knobStyle} className='h-6 w-6 rounded-full bg-white' />
        </Animated.View>
      </View>
    </PressableScale>
  );
}
