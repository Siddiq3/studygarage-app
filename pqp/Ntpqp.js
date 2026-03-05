import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Ntpop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Public paper', route: 'BiologyTm 2022' },
    { label: '2022 Prefinal paper', route: 'BiologyTm 2022p' },
    { label: 'Model Paper 2023', route: 'BiologyTm 2023' },
    { label: 'Blueprint for 100 marks', route: 'ScienceTM Blueprint' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Biology TM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Ntpop;
