import React from 'react';
import { View } from 'react-native';
import { cn } from '../cn';

type Props = {
  className?: string;
  options?: number;
};

export default function QuizSkeleton({ className, options = 4 }: Props) {
  return (
    <View className={cn('w-full rounded-[20px] border border-ds-border-subtle bg-ds-surface-base p-4', className)}>
      <View className='mb-4 h-5 w-5/6 rounded bg-ds-surface-strong' />
      {Array.from({ length: options }).map((_, idx) => (
        <View key={`quiz-skeleton-option-${idx}`} className='mb-2 h-11 rounded-[14px] bg-ds-surface-strong' />
      ))}
    </View>
  );
}
