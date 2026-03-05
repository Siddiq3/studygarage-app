import React from 'react';
import { Text, View } from 'react-native';
import { typography } from '../../theme/typography';
import { cn } from './cn';
import PressableScale from './PressableScale';

type Props = {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
};

export default function Chip({ label, selected = false, disabled = false, className, onPress }: Props) {
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'rounded-[999px] border px-4 py-2',
        selected
          ? 'border-ds-accent-purple bg-ds-interaction-selected-bg'
          : 'border-ds-border-subtle bg-ds-surface-base',
        disabled ? 'bg-ds-interaction-disabled-bg opacity-60' : '',
        className
      )}
    >
      <View className='items-center justify-center'>
        <Text
          style={typography.body.md}
          className={cn(selected ? 'text-ds-text-primary' : 'text-ds-text-secondary')}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </PressableScale>
  );
}
