import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function SGSectionHeader({ title, subtitle, actionLabel, onActionPress, className = '' }) {
  return (
    <View className={`flex-row items-end justify-between gap-2.5 ${className}`}>
      <View className="flex-1">
        <Text className="text-[22px] leading-[26px] font-sg-display tracking-[-0.3px] text-sg-text">{title}</Text>
        {subtitle ? <Text className="mt-0.5 text-[13px] font-sg-medium text-sg-muted">{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress} hitSlop={10}>
          <Text className="text-[13px] font-sg-bold text-sg-primary">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
