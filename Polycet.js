import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Polycet = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'AP POLYCET Previous Papers', route: 'appoly' },
    { label: 'IIIT 2023 Preparation', route: 'IIItp' },
    { label: 'TS POLYCET Previous Papers', route: 'tspoly' },
    { label: 'AP & TS POLYCET Preparation', route: 'polypre' },
    { label: 'Mock Tests', route: 'polymock' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Polycet"
      subtitle="Previous papers and preparation tracks"
      items={items}
    />
  );
};

export default Polycet;
