import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated';
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
        entering={FadeIn.duration(180)}
        exiting={FadeOut.duration(140)}
        className="flex-1 items-center justify-center px-5"
      >
        <Pressable
          disabled={forceUpdate}
          onPress={onPressLater}
          className="absolute inset-0 bg-black/70"
        />

        <Animated.View
          entering={FadeInUp.duration(240)}
          exiting={FadeOutDown.duration(180)}
          className="w-full max-w-[392px] rounded-[28px] border border-white/10 bg-[#141821] px-5 py-5"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.26,
            shadowRadius: 18,
            elevation: 10,
          }}
        >
          <View className="mb-4 flex-row items-center justify-between">
            <View className="h-[46px] w-[46px] items-center justify-center rounded-full border border-[#8F74FF]/45 bg-[#1D1C2E]">
              <Ionicons
                name="cloud-download-outline"
                size={22}
                color="#BDA4FF"
              />
            </View>
            {forceUpdate ? (
              <View className="rounded-full border border-[#FFB15A]/55 bg-[#2B1F13] px-3 py-1">
                <Text className="text-[11px] font-bold uppercase tracking-[0.8px] text-[#FFD69D]">
                  Required
                </Text>
              </View>
            ) : null}
          </View>

          <Text className="text-[27px] font-black leading-[31px] text-[#F5F7FF]">
            {title}
          </Text>
          <Text className="mt-2 text-[14px] leading-[20px] text-[#B8C0D4]">
            {message}
          </Text>

          <View className="mt-4 flex-row items-center rounded-[14px] border border-white/10 bg-black/20 px-3 py-2.5">
            <Text className="flex-1 text-[12px] font-semibold text-[#AAB4CB]">
              Current: {currentVersion || 'unknown'}
            </Text>
            <Text className="text-[12px] font-bold text-[#E4EAF8]">
              Latest: {latestVersion || 'unknown'}
            </Text>
          </View>

          <View className="mt-5 flex-row gap-3">
            {!forceUpdate ? (
              <PressableScale
                onPress={onPressLater}
                activeScale={0.97}
                hapticType="tap"
                className="min-h-[52px] flex-1 items-center justify-center rounded-[14px] border border-white/12 bg-white/6"
              >
                <Text className="text-[14px] font-extrabold text-[#DDE3F1]">
                  {laterLabel}
                </Text>
              </PressableScale>
            ) : null}

            <PressableScale
              onPress={onPressUpdate}
              activeScale={0.96}
              hapticType="tap"
              className="min-h-[52px] flex-1 items-center justify-center rounded-[14px] border border-[#8F74FF]/55 bg-[#1E1930]"
            >
              <Text className="text-[14px] font-black text-[#F5F7FF]">
                {updateNowLabel}
              </Text>
            </PressableScale>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
