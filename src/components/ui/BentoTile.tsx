import React from 'react';
import { View } from 'react-native';
import SurfaceCard from './SurfaceCard';
import Text from './Text';
import PressableScale from './PressableScale';
import { cn } from './cn';

type Props = {
  title: string;
  subtitle?: string;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
  onPress?: () => void;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export default function BentoTile({
  title,
  subtitle,
  selected = false,
  disabled = false,
  className,
  onPress,
  leftSlot,
  rightSlot,
}: Props) {
  return (
    <PressableScale onPress={onPress} disabled={disabled} className={cn('rounded-[20px]', className)}>
      <SurfaceCard
        variant={selected ? 'hero' : 'base'}
        className={cn(selected ? 'border-ds-accent-purple bg-ds-interaction-selected-bg' : '', disabled ? 'opacity-60' : '')}
      >
        <View className='flex-row items-center justify-between'>
          <View className='flex-1'>
            <View className='mb-1 flex-row items-center'>{leftSlot}</View>
            <Text variant='title.md'>{title}</Text>
            {subtitle ? <Text variant='caption' tone='muted' className='mt-1'>{subtitle}</Text> : null}
          </View>
          {rightSlot ? <View className='ml-3'>{rightSlot}</View> : null}
        </View>
      </SurfaceCard>
    </PressableScale>
  );
}
