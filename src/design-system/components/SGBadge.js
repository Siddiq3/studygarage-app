import React from 'react';
import { Text, View } from 'react-native';

const TONES = {
  success: ['bg-sg-successSoft', 'text-sg-success'],
  warning: ['bg-sg-marigoldSoft', 'text-sg-accent'],
  danger: ['bg-sg-dangerSoft', 'text-sg-danger'],
  info: ['bg-sg-primarySoft', 'text-sg-primary'],
};

export default function SGBadge({ label, tone = 'info', className = '', textClassName = '', style }) {
  const [surface, text] = TONES[tone] || TONES.info;
  return (
    <View className={`self-start rounded-[8px] px-2 py-1 ${surface} ${className}`} style={style}>
      <Text className={`text-[12px] font-sg-bold ${text} ${textClassName}`}>{label}</Text>
    </View>
  );
}
