import React from 'react';
import { Linking } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import ContentsList from '../../design-system/components/ContentsList';

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
      <ScreenHeader eyebrow="Videos" title={title} subtitle={subtitle} />
      <Animated.View entering={FadeInDown.duration(220)}>
        <ContentsList
          numbered
          items={items.map((item) => ({
            ...item,
            trailingIcon: item.url ? 'play-circle-outline' : 'chevron-forward',
            onPress: () => handleOpen(item),
          }))}
        />
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
