import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Epop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Public paper', route: 'English 2022' },
    { label: '2022 Prefinal paper', route: 'English 2022p' },
    { label: 'Model Paper 2023', route: 'English 2023' },
    { label: 'Blueprint for 100 marks', route: 'English Blueprint' },
    { label: '2019 Public paper - 1', route: 'English 2019p1' },
    { label: '2019 Public paper - 2', route: 'English 2019p2' },
    { label: '2018 Public paper - 1', route: 'English 2018p1' },
    { label: '2018 Public paper - 2', route: 'English 2018p2' },
    { label: '2017 Public paper - 1', route: 'English 2017p1' },
    { label: '2017 Public paper - 2', route: 'English 2017p2' },
    { label: '2016 Public paper - 1', route: 'English 2016p1' },
    { label: '2016 Public paper - 2', route: 'English 2016p2' },
    { label: '2015 Public paper - 1', route: 'English 2015p1' },
    { label: '2015 Public paper - 2', route: 'English 2015p2' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="English Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Epop;
