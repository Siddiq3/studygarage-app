import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import ScreenLayoutContainer from '../src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from '../src/design-system/components/ScreenHeader';
import SGButton from '../src/design-system/components/SGButton';

const Dtest = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <ScreenHeader eyebrow="NMMS" title="Daily test" subtitle="Every day we upload 6 NMMS practice questions. Complete this set regularly for better final-exam confidence." />
      <SGButton label="Start" onPress={() => navigation.navigate('Question6')} />
    </ScreenLayoutContainer>
  );
};

export default Dtest;
