import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Stpop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Prefinal paper', route: 'SocialTm 2022p' },
    { label: 'Model Paper 2023', route: 'SocialTm 2023' },
    { label: '2022 Public paper', route: 'SocialTm 2022' },
    { label: 'Blueprint for 100 marks', route: 'SocialTm Blueprint' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Social TM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Stpop;
