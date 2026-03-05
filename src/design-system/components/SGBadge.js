import React from 'react';
import { Text, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SGBadge({ label, tone = 'info', className = '', textClassName = '', style }) {
  const isDark = useColorScheme() === 'dark';

  const toneColors =
    tone === 'success'
      ? ['#053C2A', '#00FFA3']
      : tone === 'warning'
      ? ['#3C2D00', '#FFD700']
      : tone === 'danger'
      ? ['#3A1010', '#FF3B30']
      : ['#281341', '#B026FF'];

  return (
    <LinearGradient
      colors={toneColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className={`self-start rounded-full border border-white/20 px-2.5 py-1.5 ${className}`}
      style={[
        {
          shadowColor: tone === 'warning' ? '#FFD700' : tone === 'success' ? '#00FFA3' : '#B026FF',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isDark ? 0.32 : 0.18,
          shadowRadius: 12,
          elevation: 6,
        },
        style,
      ]}
    >
      <Text className={`text-xs font-extrabold text-white ${textClassName}`}>{label}</Text>
    </LinearGradient>
  );
}
