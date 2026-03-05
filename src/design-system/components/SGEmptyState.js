import React from 'react';
import { Text, View } from 'react-native';
import SGButton from './SGButton';

export default function SGEmptyState({
  title,
  subtitle,
  action,
  actionLabel,
  onActionPress,
  badgeLabel = 'EMPTY',
  compact = false,
}) {
  return (
    <View className={`items-center overflow-hidden rounded-[20px] border border-sg-border bg-sg-surface/90 p-4 dark:border-sgd-border dark:bg-sgd-surface/90 ${compact ? 'p-3' : ''}`}>
      <View className="rounded-full border border-sg-border bg-sg-surface2/90 px-2.5 py-1 dark:border-sgd-border dark:bg-sgd-surface2/90">
        <Text className="text-[11px] font-bold tracking-[0.3px] text-sg-muted dark:text-sgd-muted">{badgeLabel}</Text>
      </View>
      <Text className="mt-2 text-center text-base font-extrabold text-sg-text dark:text-sgd-text">{title}</Text>
      {subtitle ? <Text className="mt-1.5 text-center text-[13px] text-sg-muted dark:text-sgd-muted">{subtitle}</Text> : null}
      {action || null}
      {!action && actionLabel && onActionPress ? (
        <SGButton label={actionLabel} variant="ghost" onPress={onActionPress} className="mt-2.5 min-w-[140px]" />
      ) : null}
    </View>
  );
}
