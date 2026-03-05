import React from 'react';
import { View } from 'react-native';
import { cn } from '../cn';

type Props = {
  rows?: number;
  className?: string;
};

export default function ListSkeleton({ rows = 4, className }: Props) {
  return (
    <View className={cn('w-full', className)}>
      {Array.from({ length: rows }).map((_, idx) => (
        <View
          key={`list-skeleton-${idx}`}
          className='mb-3 rounded-[18px] border border-ds-border-subtle bg-ds-surface-base p-4'
        >
          <View className='h-3 w-2/3 rounded bg-ds-surface-strong' />
        </View>
      ))}
    </View>
  );
}
