import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Nmms = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'Study Material', route: 'nmmssm' },
    { label: 'Previous Papers', route: 'nmmspp' },
    { label: 'Test Papers', route: 'nmmstp' },
    { label: 'Daily Test', route: 'nmmsdt' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="NMMS"
      subtitle="Daily practice and exam-ready resources"
      items={items}
    />
  );
};

export default Nmms;
