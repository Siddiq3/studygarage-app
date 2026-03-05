import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from '../src/features/hubs/RemoteLabelHub';

const Nmmstp = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'test1', route: 'test1' },
    { key: 'test2', route: 'test2' },
    { key: 'test3', route: 'test3' },
    { key: 'test4', route: 'test4' },
    { key: 'test5', route: 'test5' },
    { key: 'test6', route: 'test6' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Test Papers"
      subtitle="Mock tests for final preparation"
      dataUrl="https://siddiq3.github.io/Api/test.json"
      items={items}
    />
  );
};

export default Nmmstp;
