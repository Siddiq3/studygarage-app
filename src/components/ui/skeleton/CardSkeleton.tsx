import React from 'react';
import { View } from 'react-native';
import { cn } from '../cn';

type Props = {
  className?: string;
};

export default function CardSkeleton({ className }: Props) {
  return (
    <View className={cn('rounded-[20px] border border-ds-border-subtle bg-ds-surface-base p-4', className)}>
      <View className='mb-3 h-4 w-1/2 rounded bg-ds-surface-strong' />
      <View className='mb-2 h-3 w-full rounded bg-ds-surface-strong' />
      <View className='h-3 w-4/5 rounded bg-ds-surface-strong' />
    </View>
  );
}
