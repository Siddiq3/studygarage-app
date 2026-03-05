import React, { useEffect } from 'react';
import { BackHandler, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import AnimatedActionCard from '../../design-system/components/AnimatedActionCard';

export default function StaticRouteListScreen({
  navigation,
  title = 'Test Papers',
  subtitle = 'Open a paper set',
  items = [],
  variant = 'home',
}) {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScreenLayoutContainer variant={variant} contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Practice</Text>
          <Text className="mt-1 text-[26px] font-extrabold leading-[30px] text-sg-text dark:text-sgd-text">{title}</Text>
          <Text className="mt-1 text-[13px] font-medium text-sg-muted dark:text-sgd-muted">{subtitle}</Text>
        </SGCard>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(60).duration(220)}>
        <SGCard className="mb-4">
          {items.map((item, index) => (
            <Animated.View key={`${item.label}-${index}`} entering={FadeInDown.delay(20 + index * 10).duration(160)} className="mb-3">
              <AnimatedActionCard onPress={() => navigation.navigate(item.screen)}>
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
