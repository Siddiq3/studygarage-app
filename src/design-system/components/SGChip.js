import React from 'react';
import { Text, View } from 'react-native';

export default function SGChip({ label, tone = 'neutral', className = '', textClassName = '', style }) {
  const surface = tone === 'accent' ? 'bg-sg-primarySoft' : tone === 'warning' ? 'bg-sg-marigoldSoft' : 'bg-sg-successSoft';
  const text = tone === 'accent' ? 'text-sg-primary' : tone === 'warning' ? 'text-sg-accent' : 'text-sg-success';
  return (
    <View className={`rounded-[8px] px-2.5 py-1.5 ${surface} ${className}`} style={style}>
      <Text className={`text-[12px] font-sg-bold ${text} ${textClassName}`}>{label}</Text>
    </View>
  );
}
