import React from 'react';
import { View } from 'react-native';
import { cn } from './cn';

type Props = {
  vertical?: boolean;
  className?: string;
};

export default function Divider({ vertical = false, className }: Props) {
  if (vertical) {
    return <View className={cn('w-px bg-ds-border-subtle', className)} />;
  }

  return <View className={cn('h-px w-full bg-ds-border-subtle', className)} />;
}
