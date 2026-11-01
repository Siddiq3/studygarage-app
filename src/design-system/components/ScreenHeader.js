import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ScreenHeader({ eyebrow, title, subtitle, onBack, right, board = false, className = 'mb-5' }) {
  const navigation = useNavigation();
  const handleBack = onBack || (navigation.canGoBack() ? navigation.goBack : null);

  return (
    <View className={className}>
      <View className="mb-4 min-h-[44px] flex-row items-center justify-between">
        {handleBack ? (
          <Pressable
            onPress={() => handleBack()}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            className={`h-11 w-11 items-center justify-center rounded-[14px] border active:opacity-60 ${
              board ? 'border-[#F4EFE2]/16 bg-[#1C4336]' : 'border-sg-border bg-sg-surface'
            }`}
          >
            <Ionicons name="arrow-back" size={20} color={board ? '#F4EFE2' : '#1D2A24'} />
          </Pressable>
        ) : (
          <View />
        )}
        {right || null}
      </View>
      {eyebrow ? (
        <Text className={`mb-1 text-[13px] font-sg-semibold ${board ? 'text-[#F2B632]' : 'text-sg-primary'}`}>{eyebrow}</Text>
      ) : null}
      <Text className={`text-[32px] leading-[36px] font-sg-display tracking-[-0.6px] ${board ? 'text-[#F4EFE2]' : 'text-sg-text'}`}>
        {title}
      </Text>
      {subtitle ? (
        <Text className={`mt-1.5 text-[14px] leading-[20px] font-sg-medium ${board ? 'text-[#B5C6BB]' : 'text-sg-muted'}`}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
