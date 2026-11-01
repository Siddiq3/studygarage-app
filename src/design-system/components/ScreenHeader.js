import React, { useContext, useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { ScreenChromeContext } from './ScreenLayoutContainer';

// One colour per area of the app. Ember is left out on purpose: it belongs to streaks.
export const HEADER_TONES = {
  green: { bg: '#17694F', title: '#F4EFE2', body: '#D5E6DB', eyebrow: '#F2B632', icon: 'book' },
  berry: { bg: '#8C2F4B', title: '#F4EFE2', body: '#F0D9DF', eyebrow: '#F2B632', icon: 'document-text' },
  blue: { bg: '#2B6A8F', title: '#F4EFE2', body: '#D7E6EF', eyebrow: '#F2B632', icon: 'play-circle' },
  board: { bg: '#14342A', title: '#F4EFE2', body: '#B5C6BB', eyebrow: '#F2B632', icon: 'help-circle' },
  marigold: { bg: '#F2B632', title: '#14342A', body: '#3A3A22', eyebrow: '#14342A', icon: 'wallet', statusDark: true },
};

export default function ScreenHeader({
  eyebrow,
  title,
  subtitle,
  onBack,
  right,
  board = false,
  className = 'mb-5',
  tone = 'green',
  icon,
  children,
}) {
  const navigation = useNavigation();
  const { topPadding, setBandColor } = useContext(ScreenChromeContext);
  const handleBack = onBack || (navigation.canGoBack() ? navigation.goBack : null);
  const colors = HEADER_TONES[tone] || HEADER_TONES.green;

  useEffect(() => {
    if (board) return undefined;
    setBandColor(colors.bg);
    return () => setBandColor(null);
  }, [board, colors.bg, setBandColor]);

  const backButton = handleBack ? (
    <Pressable
      onPress={() => handleBack()}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      className={`h-11 w-11 items-center justify-center rounded-[14px] active:opacity-60 ${
        board ? 'border border-[#F4EFE2]/16 bg-[#1C4336]' : 'bg-[#14342A]/20'
      }`}
    >
      <Ionicons name="arrow-back" size={20} color={board ? '#F4EFE2' : colors.title} />
    </Pressable>
  ) : (
    <View />
  );

  if (board) {
    return (
      <View className={className}>
        <View className="mb-4 min-h-[44px] flex-row items-center justify-between">
          {backButton}
          {right || null}
        </View>
        {eyebrow ? <Text className="mb-1 text-[13px] font-sg-semibold text-[#F2B632]">{eyebrow}</Text> : null}
        <Text className="text-[32px] leading-[36px] font-sg-display tracking-[-0.6px] text-[#F4EFE2]">{title}</Text>
        {subtitle ? <Text className="mt-1.5 text-[14px] leading-[20px] font-sg-medium text-[#B5C6BB]">{subtitle}</Text> : null}
      </View>
    );
  }

  return (
    <View
      className="mb-5 overflow-hidden rounded-b-[28px] px-5 pb-6"
      style={{ backgroundColor: colors.bg, marginTop: -topPadding, marginHorizontal: -16, paddingTop: topPadding }}
    >
      <StatusBar style={colors.statusDark ? 'dark' : 'light'} />
      <View pointerEvents="none" style={{ position: 'absolute', right: -44, top: 14, opacity: 0.13 }}>
        <Ionicons name={icon || colors.icon} size={210} color={colors.statusDark ? '#14342A' : '#F4EFE2'} />
      </View>
      <View className="mb-5 min-h-[44px] flex-row items-center justify-between">
        {backButton}
        {right || null}
      </View>
      {eyebrow ? (
        <Text className="mb-1 text-[14px] font-sg-bold" style={{ color: colors.eyebrow }}>
          {eyebrow}
        </Text>
      ) : null}
      <Text className="text-[38px] leading-[42px] font-sg-display tracking-[-0.8px]" style={{ color: colors.title }}>
        {title}
      </Text>
      {subtitle ? (
        <Text className="mt-2 text-[15px] leading-[21px] font-sg-medium" style={{ color: colors.body }}>
          {subtitle}
        </Text>
      ) : null}
      {children}
    </View>
  );
}
