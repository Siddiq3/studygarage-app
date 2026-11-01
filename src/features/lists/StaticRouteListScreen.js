import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import Animated from 'react-native-reanimated';
import ScreenLayoutContainer from '../../design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../../design-system/components/ScreenHeader';
import ContentsList from '../../design-system/components/ContentsList';

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
      <ScreenHeader tone="board" eyebrow="Practice" title={title} subtitle={subtitle} />
      <Animated.View>
        <ContentsList
          numbered
          items={items.map((item) => ({ ...item, onPress: () => navigation.navigate(item.screen) }))}
        />
      </Animated.View>
    </ScreenLayoutContainer>
  );
}
