import React from 'react';
import { Image, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableScale from '../ui/PressableScale';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

type Props = {
  label: string;
  imageSource?: any;
  selected?: boolean;
  onPress: () => void;
  className?: string;
};

export default function ChoiceTile({ label, imageSource, selected = false, onPress, className = '' }: Props) {
  const ringProgress = useSharedValue(selected ? 1 : 0);
  const checkProgress = useSharedValue(selected ? 1 : 0);
  const bounceScale = useSharedValue(1);
  const lastSelectedRef = React.useRef(selected);

  React.useEffect(() => {
    ringProgress.value = withTiming(selected ? 1 : 0, { duration: 160 });
    checkProgress.value = withTiming(selected ? 1 : 0, { duration: 120 });

    if (selected && !lastSelectedRef.current) {
      bounceScale.value = withSequence(
        withTiming(0.98, { duration: 70 }),
        withTiming(1.02, { duration: 90 }),
        withTiming(1, { duration: 90 })
      );
    }

    lastSelectedRef.current = selected;
  }, [bounceScale, checkProgress, ringProgress, selected]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: ringProgress.value,
    transform: [{ scale: 0.9 + ringProgress.value * 0.1 }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkProgress.value,
    transform: [{ scale: 0.78 + checkProgress.value * 0.22 }],
  }));

  const tileScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bounceScale.value }],
  }));

  return (
    <View className={`relative flex-1 rounded-[20px] ${className}`}>
      <Animated.View
        pointerEvents="none"
        style={ringStyle}
        className="absolute -inset-[1px] rounded-[20px] border border-[#00FFA3]/55 bg-[#00FFA3]/6"
      />
      <Animated.View style={tileScaleStyle}>
        <PressableScale
          onPress={onPress}
          hapticType="light"
          activeScale={0.96}
          className="rounded-[20px] border border-white/10 bg-[#171A22] px-3 py-3"
        >
          <View className="items-center">
            {imageSource ? <Image source={imageSource} className="h-12 w-12 rounded-full" resizeMode="cover" /> : null}
            <Text className="mt-2 text-[15px] font-extrabold tracking-tight text-white">{label}</Text>
          </View>
          <Animated.View style={checkStyle} className="absolute right-2 top-2 h-5 w-5 items-center justify-center rounded-full bg-[#00FFA3]">
            <AntDesign name="check" size={11} color="#08120D" />
          </Animated.View>
        </PressableScale>
      </Animated.View>
    </View>
  );
}
