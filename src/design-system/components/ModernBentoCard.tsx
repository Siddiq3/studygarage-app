import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ModernBentoCard({ children, className = '', style }: Props) {
  return (
    <View
      className={`overflow-hidden rounded-[18px] border border-sg-border bg-sg-surface ${className}`}
      style={[
        {
          shadowColor: '#3B3322',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 1,
        },
        style,
      ]}
    >
      <View className="p-4">{children}</View>
    </View>
  );
}
