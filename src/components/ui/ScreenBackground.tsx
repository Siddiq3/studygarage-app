import React from 'react';
import { ScrollView, View, type ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/colors';
import { cn } from './cn';

type BackgroundVariant = 'base' | 'elevated' | 'deep';

type Props = ViewProps & {
  children?: React.ReactNode;
  scroll?: boolean;
  contentClassName?: string;
  contentContainerClassName?: string;
  variant?: BackgroundVariant;
  showGlow?: boolean;
  showNoise?: boolean;
};

const gradientByVariant: Record<BackgroundVariant, [string, string, string]> = {
  base: [colors.bg.base, colors.bg.deep, colors.bg.elevated],
  elevated: [colors.bg.elevated, colors.bg.base, colors.bg.deep],
  deep: [colors.bg.deep, colors.bg.base, colors.bg.elevated],
};

export default function ScreenBackground({
  children,
  className,
  contentClassName,
  contentContainerClassName,
  scroll = true,
  variant = 'base',
  showGlow = true,
  showNoise = true,
  ...rest
}: Props) {
  const content = scroll ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className={cn('flex-1', contentClassName)}
      contentContainerStyle={{ flexGrow: 1 }}
      contentContainerClassName={contentContainerClassName}
    >
      {children}
    </ScrollView>
  ) : (
    <View className={cn('flex-1', contentClassName, contentContainerClassName)}>{children}</View>
  );

  return (
    <View {...rest} className={cn('flex-1 bg-ds-bg-base', className)}>
      <LinearGradient
        colors={gradientByVariant[variant]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className='absolute inset-0'
      />

      {showGlow ? (
        <>
          <View className='pointer-events-none absolute -left-24 -top-12 h-72 w-72 rounded-full bg-ds-accent-purple/20' />
          <View className='pointer-events-none absolute -right-20 top-52 h-64 w-64 rounded-full bg-ds-accent-mint/10' />
        </>
      ) : null}

      {showNoise ? (
        <View className='pointer-events-none absolute inset-0 bg-ds-text-primary/5' style={{ opacity: 0.02 }} />
      ) : null}

      {content}
    </View>
  );
}
