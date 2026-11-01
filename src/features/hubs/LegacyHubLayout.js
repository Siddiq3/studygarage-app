import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import SGEmptyState from '../../design-system/components/SGEmptyState';
import SGSectionHeader from '../../design-system/components/SGSectionHeader';
import ShimmerSkeleton from '../../components/ui/ShimmerSkeleton';
import { iconForLabel } from '../../design-system/components/moduleIcons';

function ModuleTile({ label, onPress }) {
  return (
    <Pressable
      onPress={() => {
        Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      accessibilityRole="button"
      android_ripple={{ color: 'rgba(29,42,36,0.06)' }}
      className="min-h-[104px] rounded-[16px] border border-sg-border bg-sg-surface px-2.5 py-3 active:bg-sg-bg2"
    >
      <View className="mb-2 h-9 w-9 items-center justify-center rounded-[11px] bg-sg-primarySoft">
        <Ionicons name={iconForLabel(label)} size={18} color="#17694F" />
      </View>
      <Text numberOfLines={3} className="text-[13px] leading-[17px] font-sg-semibold text-sg-text">
        {label}
      </Text>
    </Pressable>
  );
}

export default function LegacyHubLayout({ title, subtitle, buttons, isLoading }) {
  // Labels come from a remote file: until they arrive there is nothing meaningful to show.
  const namedButtons = (buttons || []).filter((button) => button?.label);

  if (isLoading || (buttons?.length && !namedButtons.length)) {
    return (
      <View className="w-full">
        <View className="mb-3 w-1/2">
          <ShimmerSkeleton height={24} borderRadius={8} />
        </View>
        <View className="flex-row flex-wrap justify-between">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <View key={`legacy-loading-${idx}`} className="mb-2.5 w-[31.8%]">
              <ShimmerSkeleton height={104} borderRadius={16} />
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View className="w-full">
      <SGSectionHeader title={title} subtitle={subtitle} className="mb-3" />
      {namedButtons.length ? (
        <View className="flex-row flex-wrap justify-between">
          {namedButtons.map((button, index) => (
            <Animated.View
              key={button.id || `${button.label}-${index}`}
              entering={FadeInDown.delay(20 + index * 12).duration(200)}
              className="mb-2.5 w-[31.8%]"
            >
              <ModuleTile label={button.label} onPress={button.onPress} />
            </Animated.View>
          ))}
        </View>
      ) : (
        <SGEmptyState title="No modules available" subtitle="Try again in a while." />
      )}
    </View>
  );
}
