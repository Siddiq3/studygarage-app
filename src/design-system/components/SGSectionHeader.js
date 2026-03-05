import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function SGSectionHeader({ title, subtitle, actionLabel, onActionPress, className = '' }) {
  return (
    <View className={`flex-row items-center justify-between gap-2.5 ${className}`}>
      <View className="flex-1">
        <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Section</Text>
        <Text className="mt-1 text-[22px] font-extrabold tracking-tight text-sg-text dark:text-sgd-text">{title}</Text>
        {subtitle ? <Text className="mt-1 text-[13px] font-semibold text-sg-muted dark:text-sgd-muted">{subtitle}</Text> : null}
      </View>
      {actionLabel ? (
        <Pressable onPress={onActionPress} className="rounded-full border border-white/15 bg-white/8 px-3 py-1">
          <Text className="text-xs font-bold text-[#00FFA3]">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
