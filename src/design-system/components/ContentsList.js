import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { iconForLabel } from './moduleIcons';

export function ContentsRow({ label, index, icon, trailingIcon = 'chevron-forward', onPress, last = false }) {
  const handlePress = () => {
    Haptics.selectionAsync().catch(() => {});
    onPress?.();
  };
  const name = icon === false ? null : icon || iconForLabel(label);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="button"
      android_ripple={{ color: 'rgba(29,42,36,0.06)' }}
      className={`min-h-[64px] flex-row items-center px-4 py-3 active:bg-sg-bg2 ${last ? '' : 'border-b border-sg-border'}`}
    >
      {name ? (
        <View className="mr-3 h-10 w-10 items-center justify-center rounded-[12px] bg-sg-primarySoft">
          <Ionicons name={name} size={19} color="#17694F" />
        </View>
      ) : (
        <Text className="mr-3 w-7 text-[14px] font-sg-bold text-sg-primary" style={{ fontVariant: ['tabular-nums'] }}>
          {String((index ?? 0) + 1).padStart(2, '0')}
        </Text>
      )}
      <Text className="flex-1 text-[15px] leading-[21px] font-sg-semibold text-sg-text">{label}</Text>
      <Ionicons name={trailingIcon} size={18} color="#5F6A63" />
    </Pressable>
  );
}

// A table of contents, not a stack of cards: one sheet, hairline rows.
export default function ContentsList({ items, numbered = false, className = 'mb-4', getKey }) {
  return (
    <View
      className={`overflow-hidden rounded-[18px] border border-sg-border bg-sg-surface ${className}`}
      style={{ shadowColor: '#3B3322', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 1 }}
    >
      {items.map((item, index) => (
        <ContentsRow
          key={getKey ? getKey(item, index) : item.id || item.route || item.screen || `${item.label}-${index}`}
          label={item.label}
          index={index}
          icon={numbered ? false : item.icon}
          trailingIcon={item.trailingIcon}
          onPress={item.onPress}
          last={index === items.length - 1}
        />
      ))}
    </View>
  );
}
