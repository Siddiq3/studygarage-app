import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
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

const safeDecode = (value) => {
  if (value === null || value === undefined) return '';
  try {
    return decodeURIComponent(String(value));
  } catch (_error) {
    return String(value);
  }
};

export default function RemoteLabelHub({
  navigation,
  title,
  subtitle,
  dataUrl,
  items,
  variant = 'home',
  contentClassName = 'px-4',
  extractData = (payload) => payload?.results?.[0] || {},
  footer = null,
  emptyLabel = 'No data available',
}) {
  const isDark = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const skeletonPulse = useSharedValue(0.45);

  useEffect(() => {
    skeletonPulse.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 700 }),
        withTiming(0.45, { duration: 700 })
      ),
      -1,
      true
    );
  }, [skeletonPulse]);

  const skeletonStyle = useAnimatedStyle(() => ({
    opacity: skeletonPulse.value,
  }));

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(dataUrl);
        const payload = await res.json();
        if (!isMounted) return;
        const extracted = extractData(payload);
        setData(extracted || {});
      } catch (error) {
        console.error('Error fetching hub labels:', error);
        if (isMounted) {
          setData({});
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => {
      isMounted = false;
    };
  }, [dataUrl, extractData]);

  const renderedItems = useMemo(
    () =>
      items.map((item) => {
        if (item?.label) {
          return { ...item, resolvedLabel: item.label };
        }
        const rawValue = item?.key ? data?.[item.key] : '';
        const resolved = safeDecode(rawValue);
        return { ...item, resolvedLabel: resolved || item?.fallbackLabel || item?.key || 'Open' };
      }),
    [data, items]
  );

  const hasAtLeastOneItem = renderedItems.some((item) => !!item.resolvedLabel);

  const onItemPress = (item) => {
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
        <SGCard className="mb-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-sg-muted dark:text-sgd-muted">Study Modules</Text>
          <Text className="text-[30px] font-extrabold leading-[34px] text-sg-text dark:text-sgd-text">{title}</Text>
          {subtitle ? <Text className="mt-1 text-[14px] font-semibold text-sg-muted dark:text-sgd-muted">{subtitle}</Text> : null}

          {isLoading ? (
            <View className="py-4">
              {[0, 1, 2].map((idx) => (
                <Animated.View key={`hub-skeleton-${idx}`} style={skeletonStyle} className="mb-3 h-[58px] rounded-[18px] border border-white/10 bg-white/8" />
              ))}
            </View>
          ) : (
            <View className="mt-4 gap-3">
              {hasAtLeastOneItem ? (
                renderedItems.map((item, index) => (
                  <Animated.View key={item.id || item.route || item.key || `${index}`} entering={FadeInDown.delay(25 + index * 16).duration(200)}>
                    <AnimatedActionCard onPress={() => onItemPress(item)}>
                      <LinearGradient colors={gradients[index % gradients.length]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} className="rounded-[20px] p-[1.2px]">
                        <View className="rounded-[19px] border border-white/10 bg-[#111522]/86 px-4 py-4">
                          <Text className="text-[17px] font-bold tracking-[0.2px] text-white">{item.resolvedLabel}</Text>
                        </View>
                      </LinearGradient>
                    </AnimatedActionCard>
                  </Animated.View>
                ))
              ) : (
                <SGEmptyState
                  title="Content is being prepared"
                  subtitle={emptyLabel}
                  badgeLabel="NO DATA"
                />
              )}
            </View>
          )}
        </SGCard>
      </Animated.View>
      {footer}
    </ScreenLayoutContainer>
  );
}
