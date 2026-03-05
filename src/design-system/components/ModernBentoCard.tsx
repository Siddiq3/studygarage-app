import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ModernBentoCard({ children, className = '', style }: Props) {
  return (
    <View
      className={`overflow-hidden rounded-[24px] border ${className}`}
      style={[
        {
          borderColor: 'rgba(255,255,255,0.10)',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
          backgroundColor: '#1A1C2E',
        },
        style,
      ]}
    >
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(30,33,46,0.95)', 'rgba(25,28,38,0.95)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <LinearGradient
        pointerEvents="none"
        colors={['rgba(255,255,255,0.04)', 'transparent', 'rgba(176,38,255,0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <View className="absolute inset-[1px] rounded-[23px] border border-white/5" pointerEvents="none" />
      <View className="p-4">{children}</View>
    </View>
  );
}
