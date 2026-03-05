import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Sepop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Public paper', route: 'SocialEm 2022' },
    { label: '2022 Prefinal paper', route: 'SocialEm 2022p' },
    { label: 'Model Paper 2023', route: 'SocialEm 2023' },
    { label: 'Blueprint for 100 marks', route: 'SocialEm Blueprint' },
    { label: '2019 Public paper - 1', route: 'SocialEm 2019p1' },
    { label: '2019 Public paper - 2', route: 'SocialEm 2019p2' },
    { label: '2018 Public paper - 1', route: 'SocialEm 2018p1' },
    { label: '2018 Public paper - 2', route: 'SocialEm 2018p2' },
    { label: '2017 Public paper - 1', route: 'SocialEm 2017p1' },
    { label: '2017 Public paper - 2', route: 'SocialEm 2017p2' },
    { label: '2016 Public paper - 1', route: 'SocialEm 2016p1' },
    { label: '2016 Public paper - 2', route: 'SocialEm 2016p2' },
    { label: '2015 Public paper - 1', route: 'SocialEm 2015p1' },
    { label: '2015 Public paper - 2', route: 'SocialEm 2015p2' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Social EM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Sepop;
