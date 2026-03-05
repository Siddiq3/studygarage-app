import React from 'react';
import { Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableScale from '../ui/PressableScale';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type Props = {
  label: string;
  selected?: boolean;
  onPress: () => void;
  compact?: boolean;
  className?: string;
};

export default function ChoiceChip({
  label,
  selected = false,
  onPress,
  compact = true,
  className = '',
}: Props) {
  const selectedProgress = useSharedValue(selected ? 1 : 0);
  const containerClass = compact ? 'min-h-[46px] rounded-full px-4 py-2' : 'min-h-[70px] rounded-[18px] px-4 py-3';

  React.useEffect(() => {
    selectedProgress.value = withTiming(selected ? 1 : 0, { duration: 160 });
  }, [selected, selectedProgress]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: selectedProgress.value,
    transform: [{ scale: 0.92 + selectedProgress.value * 0.08 }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: selectedProgress.value,
    transform: [{ scale: 0.8 + selectedProgress.value * 0.2 }],
  }));

  return (
    <View className={`relative ${className}`}>
      <Animated.View
        pointerEvents="none"
        style={ringStyle}
        className={`absolute -inset-[1px] border border-[#00FFA3]/50 bg-[#00FFA3]/6 ${compact ? 'rounded-full' : 'rounded-[18px]'}`}
      />
      <PressableScale
        onPress={onPress}
        hapticType="light"
        activeScale={0.96}
        className={`border border-white/10 bg-[#171A22] ${containerClass}`}
      >
        <View className="flex-row items-center justify-center">
          <Text className={`font-extrabold tracking-tight text-white ${compact ? 'text-[14px]' : 'text-[18px]'}`}>{label}</Text>
          <Animated.View style={checkStyle} className="ml-2 h-5 w-5 items-center justify-center rounded-full bg-[#00FFA3]">
            <AntDesign name="check" size={11} color="#08120D" />
          </Animated.View>
        </View>
      </PressableScale>
    </View>
  );
}
