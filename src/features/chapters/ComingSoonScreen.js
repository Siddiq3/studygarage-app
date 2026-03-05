import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';

export default function ComingSoonScreen({
  title = 'Chapter Wise Video Explanation',
  subtitle = 'New chapter explainers will be uploaded shortly',
}) {
  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Video Modules</Text>
          <Text className="mt-1 text-[26px] font-extrabold leading-[30px] text-sg-text dark:text-sgd-text">{title}</Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">{subtitle}</Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4 items-center py-10">
          <Text className="text-center text-[18px] font-bold text-sg-text dark:text-sgd-text">UPLOADED SHORTLY...</Text>
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
