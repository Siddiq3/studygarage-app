import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import PressableScale from '../ui/PressableScale';

export default function AppUpdatePrompt({
  visible,
  forceUpdate = false,
  title = 'Update available',
  message = 'A newer version is ready to install.',
  currentVersion = '',
  latestVersion = '',
  updateNowLabel = 'Update now',
  laterLabel = 'Later',
  onPressUpdate,
  onPressLater,
}) {
  if (!visible) return null;

  return (
    <Modal transparent statusBarTranslucent animationType="none" visible={visible}>
      <Animated.View
        className="flex-1 items-center justify-center px-5"
      >
        <Pressable
          disabled={forceUpdate}
          onPress={onPressLater}
          className="absolute inset-0 bg-sg-bg2"
        />

        <Animated.View
          className="w-full max-w-[392px] rounded-[18px] border border-sg-border bg-[#FFFCF5] px-5 py-5"
          style={{
            shadowColor: '#3B3322',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.26,
            shadowRadius: 18,
            elevation: 10,
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View className="h-[46px] w-[46px] items-center justify-center rounded-full border border-[#17694F]/45 bg-[#FFFCF5]">
              <Ionicons
                name="cloud-download-outline"
                size={22}
                color="#17694F"
              />
            </View>
            {forceUpdate ? (
              <View className="rounded-full border border-[#C4551A]/55 bg-[#FFFCF5] px-3 py-1">
                <Text className="text-[12px] font-sg-bold text-[#C4551A]">
                  Required
                </Text>
              </View>
            ) : null}
          </View>

          <Text className="text-[27px] font-sg-display leading-[31px] text-[#1D2A24]">
            {title}
          </Text>
          <Text className="mt-2 text-[14px] leading-[20px] text-[#1D2A24] font-sg-medium">
            {message}
          </Text>

          <View className="mt-4 flex-row items-center rounded-[14px] border border-sg-border bg-sg-bg2 px-3 py-2.5">
            <Text className="flex-1 text-[12px] font-sg-semibold text-[#1D2A24]">
              Current: {currentVersion || 'unknown'}
            </Text>
            <Text className="text-[12px] font-sg-bold text-[#1D2A24]">
              Latest: {latestVersion || 'unknown'}
            </Text>
          </View>

          <View className="mt-5 flex-row gap-3">
            {!forceUpdate ? (
              <PressableScale
                onPress={onPressLater}
                activeScale={0.97}
                hapticType="tap"
                className="min-h-[52px] flex-1 items-center justify-center rounded-[14px] border border-sg-border bg-sg-bg2"
              >
                <Text className="text-[14px] font-sg-extrabold text-[#1D2A24]">
                  {laterLabel}
                </Text>
              </PressableScale>
            ) : null}

            <PressableScale
              onPress={onPressUpdate}
              activeScale={0.96}
              hapticType="tap"
              className="min-h-[52px] flex-1 items-center justify-center rounded-[14px] border border-[#17694F]/55 bg-[#FFFCF5]"
            >
              <Text className="text-[14px] font-sg-extrabold text-[#1D2A24]">
                {updateNowLabel}
              </Text>
            </PressableScale>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
