import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import SGCard from '../../design-system/components/SGCard';
import AnimatedActionCard from '../../design-system/components/AnimatedActionCard';
import SGEmptyState from '../../design-system/components/SGEmptyState';

const gradients = [
  ['#2F6BFF', '#27CFFF', '#7C5FFF'],
  ['#31B4C5', '#42D58B', '#6FAEFF'],
  ['#8D60FF', '#4B76FF', '#34C8FF'],
  ['#FF7A66', '#FACF39', '#57CBE4'],
  ['#3556D8', '#2F8DFC', '#39D0E2'],
  ['#53BB90', '#2FAAD3', '#6D7DF9'],
];

export default function SimpleSubjectHub({
  navigation,
  title,
  subtitle,
  items,
  variant = 'home',
  contentClassName = 'px-4',
  footer = null,
  cardClassName = 'mb-4',
}) {
  const handleItemPress = (item) => {
    if (item?.onPress) {
      item.onPress();
      return;
    }
    if (item?.route) {
      navigation.navigate(item.route);
    }
  };

  return (
    <ScreenLayoutContainer variant={variant} contentClassName={contentClassName} scroll>
      <Animated.View entering={FadeInDown.duration(220)}>
        <SGCard className={cardClassName}>
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Study Modules</Text>
          <Text className="text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">{title}</Text>
          {subtitle ? <Text className="mt-1 text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">{subtitle}</Text> : null}

          {items.length ? (
            <View className="mt-4 gap-3">
              {items.map((item, index) => (
                <Animated.View key={item.id || item.route || `${item.label}-${index}`} entering={FadeInDown.delay(25 + index * 18).duration(200)}>
                  <AnimatedActionCard onPress={() => handleItemPress(item)}>
                    <LinearGradient
                      colors={gradients[index % gradients.length]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="rounded-[20px] p-[1.2px]"
                    >
                      <View className="rounded-[19px] border border-white/10 bg-[#111522]/86 px-4 py-4">
                        <Text className="text-[17px] font-bold tracking-[0.2px] text-white">{item.label}</Text>
                      </View>
                    </LinearGradient>
                  </AnimatedActionCard>
                </Animated.View>
              ))}
            </View>
          ) : (
            <View className="mt-4">
              <SGEmptyState
                title="No modules yet"
                subtitle="Try again in a moment."
                badgeLabel="MODULE EMPTY"
              />
            </View>
          )}
        </SGCard>
      </Animated.View>
      {footer}
    </ScreenLayoutContainer>
  );
}
