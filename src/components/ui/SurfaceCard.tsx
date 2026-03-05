import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { shadows } from '../../theme/shadows';
import { cn } from './cn';

type Variant = 'base' | 'strong' | 'hero';

type Props = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  style?: StyleProp<ViewStyle>;
  variant?: Variant;
  noPadding?: boolean;
};

const variantClassMap: Record<Variant, string> = {
  base: 'bg-ds-surface-base',
  strong: 'bg-ds-surface-strong',
  hero: 'bg-ds-surface-strong',
};

const variantShadowMap: Record<Variant, ViewStyle> = {
  base: shadows.base,
  strong: shadows.card,
  hero: shadows.hero,
};

export default function SurfaceCard({
  children,
  className,
  contentClassName,
  style,
  variant = 'strong',
  noPadding = false,
}: Props) {
  return (
    <View
      className={cn(
        'overflow-hidden rounded-[20px] border border-ds-border-subtle',
        variantClassMap[variant],
        className
      )}
      style={[variantShadowMap[variant], style]}
    >
      <View className={cn(noPadding ? '' : 'p-4', contentClassName)}>{children}</View>
    </View>
  );
}
