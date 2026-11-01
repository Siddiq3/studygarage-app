import React from 'react';
import Animated from 'react-native-reanimated';
import SurfaceCard from '../ui/SurfaceCard';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';

type Props = React.ComponentProps<typeof SurfaceCard> & {
  animate?: boolean;
  delayMs?: number;
};

export default function PremiumCard({
  children,
  animate = true,
  delayMs = 0,
  ...rest
}: Props) {
  const reducedMotionEnabled = useReducedMotionPreference();
  const canAnimate = animate && !reducedMotionEnabled;

  if (!canAnimate) {
    return <SurfaceCard {...rest}>{children}</SurfaceCard>;
  }

  return (
    <Animated.View
    >
      <SurfaceCard {...rest}>{children}</SurfaceCard>
    </Animated.View>
  );
}
