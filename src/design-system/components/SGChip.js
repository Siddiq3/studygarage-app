import React from 'react';
import { Text, View } from 'react-native';

export default function SGChip({ label, tone = 'neutral', className = '', textClassName = '', style }) {
  const toneClass =
    tone === 'accent'
      ? 'border-[#B026FF]/70 bg-[#2A133F]/80'
      : tone === 'warning'
      ? 'border-[#FFD700]/70 bg-[#2F2408]/80'
      : 'border-[#00FFA3]/55 bg-[#0F3329]/80';

  return (
    <View className={`rounded-full border px-3 py-1.5 ${toneClass} ${className}`} style={style}>
      <Text className={`text-xs font-bold text-white ${textClassName}`}>{label}</Text>
    </View>
  );
}
