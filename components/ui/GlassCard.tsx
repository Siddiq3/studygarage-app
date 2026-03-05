import React from 'react';
import { View } from 'react-native';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className = '' }: Props) {
  return (
    <View
      className={`overflow-hidden rounded-[24px] border border-white/10 ${className}`}
      style={{
        backgroundColor: '#1A1C2E',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="absolute inset-[1px] rounded-[23px] border border-white/6" pointerEvents="none" />
      <View className="p-5">{children}</View>
    </View>
  );
}
