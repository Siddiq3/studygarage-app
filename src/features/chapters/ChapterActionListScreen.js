import React from 'react';
import { Linking, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import AnimatedActionCard from '../../design-system/components/AnimatedActionCard';

export default function ChapterActionListScreen({
  navigation,
  title = 'Chapter Wise Video Explanation',
  subtitle = 'Open a chapter to continue',
  items = [],
  variant = 'home',
}) {
  const handleOpen = (item) => {
    if (item?.url) {
      Linking.openURL(item.url);
      return;
    }
    if (item?.screen) {
      navigation?.navigate(item.screen);
    }
  };

  return (
    <ScreenLayoutContainer variant={variant} contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Video Modules</Text>
          <Text className="mt-1 text-[26px] font-extrabold leading-[30px] text-sg-text dark:text-sgd-text">{title}</Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">{subtitle}</Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          {items.map((item, index) => (
            <Animated.View key={`${item.label}-${index}`} entering={FadeInDown.delay(20 + index * 10).duration(170)} className="mb-3">
              <AnimatedActionCard onPress={() => handleOpen(item)}>
                <View className="rounded-[18px] border border-sg-border bg-sg-surface/88 px-4 py-4 dark:border-sgd-border dark:bg-sgd-surface/88">
                  <View className="flex-row items-center justify-between">
                    <Text className="flex-1 text-[15px] font-bold text-sg-text dark:text-sgd-text">{item.label}</Text>
                    <Text className="ml-3 text-[12px] font-semibold text-sg-muted dark:text-sgd-muted">Open</Text>
                  </View>
                </View>
              </AnimatedActionCard>
            </Animated.View>
          ))}
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
