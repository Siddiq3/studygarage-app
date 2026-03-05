import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsplan = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'telugu tsp' },
    { label: 'HINDI', route: 'hindi tsp' },
    { label: 'ENGLISH', route: 'english tsp' },
    { label: 'MATHAMATICS-EM', route: 'maths em tsp' },
    { label: 'MATHAMATICS-TM', route: 'maths tm tsp' },
    { label: 'BIOLOGY-EM', route: 'biology em tsp' },
    { label: 'BIOLOGY-TM', route: 'biology tm tsp' },
    { label: 'PHYSCICAL SCIENCE-EM', route: 'physics em tsp' },
    { label: 'PHYSCICAL SCIENCE-TM', route: 'physics tm tsp' },
    { label: 'SOCIAL-TM', route: 'social tm tsp' },
    { label: 'SOCIAL-EM', route: 'social em tsp' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Telangana Test Plan'
      subtitle='Smart paper sequence by subject'
      items={items}
    />
  );
};

export default Tsplan;
