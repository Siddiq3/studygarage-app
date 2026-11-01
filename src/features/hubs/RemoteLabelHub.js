import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import ContentsList from '../../design-system/components/ContentsList';
import SGEmptyState from '../../design-system/components/SGEmptyState';
import ShimmerSkeleton from '../../components/ui/ShimmerSkeleton';

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
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

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
      <ScreenHeader title={title} subtitle={subtitle} />
      <Animated.View entering={FadeInDown.duration(220)}>
        {isLoading ? (
          <View className="gap-2.5">
            {[0, 1, 2, 3].map((idx) => (
              <ShimmerSkeleton key={`hub-skeleton-${idx}`} height={64} borderRadius={16} />
            ))}
          </View>
        ) : hasAtLeastOneItem ? (
          <ContentsList
            items={renderedItems.map((item) => ({ ...item, label: item.resolvedLabel, onPress: () => onItemPress(item) }))}
          />
        ) : (
          <SGEmptyState title="Content is being prepared" subtitle={emptyLabel} />
        )}
      </Animated.View>
      {footer}
    </ScreenLayoutContainer>
  );
}
