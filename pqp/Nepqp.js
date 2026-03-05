import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Nepop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Public paper', route: 'BiologyEM 2022' },
    { label: '2022 Prefinal paper', route: 'BiologyEM 2022p' },
    { label: 'Model Paper 2023', route: 'BiologyEM 2023' },
    { label: 'Blueprint for 100 marks', route: 'ScienceEM1 Blueprint' },
    { label: '2019 Public paper', route: 'BiologyEM 2019p' },
    { label: '2018 Public paper', route: 'BiologyEM 2018p' },
    { label: '2017 Public paper', route: 'BiologyEM 2017p' },
    { label: '2016 Public paper', route: 'BiologyEM 2016p' },
    { label: '2015 Public paper', route: 'BiologyEM 2015p' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Biology EM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Nepop;
