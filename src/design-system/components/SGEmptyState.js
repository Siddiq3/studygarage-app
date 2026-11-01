import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import SGButton from './SGButton';

// badgeLabel stays accepted so existing callers keep working; shouting "EMPTY" adds nothing.
export default function SGEmptyState({
  title,
  subtitle,
  action,
  actionLabel,
  onActionPress,
  icon = 'file-tray-outline',
  compact = false,
  board = false,
}) {
  return (
    <View className={`items-center rounded-[18px] border border-dashed ${board ? 'border-[#F4EFE2]/25' : 'border-sg-text/20'} ${compact ? 'p-4' : 'px-5 py-8'}`}>
      <View className={`h-12 w-12 items-center justify-center rounded-[14px] ${board ? 'bg-[#1C4336]' : 'bg-sg-bg2'}`}>
        <Ionicons name={icon} size={22} color={board ? '#B5C6BB' : '#5F6A63'} />
      </View>
      <Text className={`mt-3 text-center text-[16px] font-sg-bold ${board ? 'text-[#F4EFE2]' : 'text-sg-text'}`}>{title}</Text>
      {subtitle ? <Text className={`mt-1 text-center text-[13px] leading-[19px] font-sg-medium ${board ? 'text-[#B5C6BB]' : 'text-sg-muted'}`}>{subtitle}</Text> : null}
      {action || null}
      {!action && actionLabel && onActionPress ? (
        <SGButton label={actionLabel} variant={board ? 'boardGhost' : 'ghost'} onPress={onActionPress} className="mt-4 min-w-[140px]" />
      ) : null}
    </View>
  );
}
