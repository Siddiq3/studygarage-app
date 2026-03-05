import React, { useMemo } from 'react';
import {
  PixelRatio,
  Text as RNText,
  type TextProps,
  type TextStyle,
} from 'react-native';
import { typography } from '../../theme/typography';
import { getResponsiveSize } from '../../theme/premiumTokens';
import { cn } from './cn';

type Variant =
  | 'display.xl'
  | 'display.lg'
  | 'title.lg'
  | 'title.md'
  | 'body.lg'
  | 'body.md'
  | 'caption'
  | 'micro.upper'
  | 'button'
  | 'tab.label'
  | 'metric';

type Tone = 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'info';

type Props = TextProps & {
  variant?: Variant;
  tone?: Tone;
  className?: string;
  fitText?: boolean;
};

const variantStyles: Record<Variant, TextStyle> = {
  'display.xl': typography.display.xl,
  'display.lg': typography.display.lg,
  'title.lg': typography.title.lg,
  'title.md': typography.title.md,
  'body.lg': typography.body.lg,
  'body.md': typography.body.md,
  caption: typography.caption,
  'micro.upper': typography.micro.upper,
  button: typography.button,
  'tab.label': typography.tab.label,
  metric: typography.metric,
};

const toneClassMap: Record<Tone, string> = {
  primary: 'text-ds-text-primary',
  secondary: 'text-ds-text-secondary',
  muted: 'text-ds-text-muted',
  accent: 'text-ds-accent-purple',
  success: 'text-ds-status-success',
  warning: 'text-ds-status-warning',
  info: 'text-ds-status-info',
};

export default function Text({
  variant = 'body.md',
  tone = 'primary',
  className,
  fitText = true,
  style,
  allowFontScaling,
  maxFontSizeMultiplier,
  ...rest
}: Props) {
  const scaledStyle = useMemo(() => {
    const baseStyle = variantStyles[variant];
    if (!fitText) return baseStyle;

    const currentScale = PixelRatio.getFontScale();
    const min = Math.max(10, baseStyle.fontSize ? baseStyle.fontSize * 0.86 : 12);
    const max = baseStyle.fontSize ? baseStyle.fontSize * 1.18 : 16;
    const fontSize = getResponsiveSize(min, max, currentScale);
    const lineHeight = Math.round(fontSize * (baseStyle.lineHeight && baseStyle.fontSize ? baseStyle.lineHeight / baseStyle.fontSize : 1.3));

    return {
      ...baseStyle,
      fontSize,
      lineHeight,
      fontVariant: variant === 'metric' ? ['tabular-nums'] : baseStyle.fontVariant,
      includeFontPadding: false as const,
      textAlignVertical: 'center' as const,
    };
  }, [fitText, variant]);

  return (
    <RNText
      {...rest}
      allowFontScaling={allowFontScaling ?? true}
      maxFontSizeMultiplier={maxFontSizeMultiplier ?? 1.3}
      className={cn(toneClassMap[tone], className)}
      style={[scaledStyle, style]}
    />
  );
}
