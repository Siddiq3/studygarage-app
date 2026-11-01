import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import ContentsList from '../../design-system/components/ContentsList';
import SGEmptyState from '../../design-system/components/SGEmptyState';

export default function SimpleSubjectHub({
  navigation,
  title,
  subtitle,
  items,
  variant = 'home',
  contentClassName = 'px-4',
  footer = null,
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
      <ScreenHeader title={title} subtitle={subtitle} />
      <Animated.View entering={FadeInDown.duration(220)}>
        {items.length ? (
          <ContentsList items={items.map((item) => ({ ...item, onPress: () => handleItemPress(item) }))} />
        ) : (
          <SGEmptyState title="No modules yet" subtitle="Try again in a moment." />
        )}
      </Animated.View>
      {footer}
    </ScreenLayoutContainer>
  );
}
