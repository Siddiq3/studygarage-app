import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import PressableScale from '../ui/PressableScale';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import useReducedMotionPreference from '../../src/hooks/useReducedMotionPreference';

type Props = {
  value: string;
  onChange: (value: string) => void;
  boySource: any;
  girlSource: any;
};

export default function AvatarPicker({ value, onChange, boySource, girlSource }: Props) {
  const [isBusy, setIsBusy] = useState(false);
  const imageOpacity = useSharedValue(1);
  const avatarScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);
  const reduceMotion = useReducedMotionPreference();

  const source = useMemo(() => {
    if (typeof value === 'string' && (value.startsWith('http') || value.startsWith('file:') || value.startsWith('content://') || value.startsWith('data:image'))) {
      return { uri: value };
    }

    if (value === 'girl') {
      return girlSource;
    }

    return boySource;
  }, [boySource, girlSource, value]);

  useEffect(() => {
    imageOpacity.value = 0;
    imageOpacity.value = withTiming(1, { duration: 180 });
    pulseOpacity.value = 0;
    pulseScale.value = 1;
    if (!reduceMotion) {
      pulseOpacity.value = withSequence(
        withTiming(0.34, { duration: 90 }),
        withTiming(0, { duration: 170 })
      );
      pulseScale.value = withSequence(
        withTiming(1.05, { duration: 140 }),
        withTiming(1, { duration: 140 })
      );
    }
  }, [imageOpacity, pulseOpacity, pulseScale, reduceMotion, value]);

  useEffect(() => {
    if (reduceMotion) {
      avatarScale.value = withTiming(1, { duration: 120 });
      return;
    }

    avatarScale.value = withDelay(
      120,
      withSequence(
        withTiming(1.03, { duration: 260 }),
        withSpring(1, { damping: 16, stiffness: 210, mass: 0.55 })
      )
    );
  }, [avatarScale, reduceMotion]);

  const imageStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
  }));

  const avatarStyle = useAnimatedStyle(() => ({
    transform: [{ scale: avatarScale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
    transform: [{ scale: pulseScale.value }],
  }));

  const handlePickImage = async () => {
    if (isBusy) return;

    setIsBusy(true);
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert('Permission needed', 'Please allow photo access to upload your avatar.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets?.length > 0) {
        onChange(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image picker error:', error);
      Alert.alert('Upload failed', 'Unable to pick image right now. Please try again.');
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <View className="items-center">
      <Animated.View style={avatarStyle} className="relative rounded-full">
        <Animated.View
          pointerEvents="none"
          style={pulseStyle}
          className="absolute -inset-1 rounded-full border border-[#00FFA3]/55 bg-[#00FFA3]/12"
        />
        <PressableScale
          onPress={handlePickImage}
          hapticType="light"
          disabled={isBusy}
          activeScale={0.97}
          className="h-[136px] w-[136px] items-center justify-center rounded-full border border-white/10 bg-[#141821]"
        >
          <Animated.View style={imageStyle} className="h-[128px] w-[128px] overflow-hidden rounded-full">
            <Image source={source} className="h-[128px] w-[128px] rounded-full" resizeMode="cover" />
          </Animated.View>
          <View className="absolute bottom-1 right-1 h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-[#0F131D]">
            <AntDesign name="camerao" size={14} color="#00FFA3" />
          </View>
        </PressableScale>
      </Animated.View>
      <PressableScale
        onPress={handlePickImage}
        hapticType="light"
        disabled={isBusy}
        activeScale={0.96}
        className="mt-2 flex-row items-center rounded-full border border-white/12 bg-white/6 px-3 py-1.5"
      >
        <AntDesign name="camerao" size={12} color="#00FFA3" />
        <Text className="ml-1.5 text-[11px] font-bold tracking-[0.2px] text-white">
          {isBusy ? 'Opening...' : 'Upload from Gallery'}
        </Text>
      </PressableScale>
      <Text className="mt-2 text-center text-[11px] font-medium text-[#A8B2CA]">
        Upload your real photo or keep the avatar.
      </Text>
    </View>
  );
}
