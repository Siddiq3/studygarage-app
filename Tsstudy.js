import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsstudy = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'telugu tsm' },
    { label: 'HINDI', route: 'hindi tsm' },
    { label: 'ENGLISH', route: 'english tsm' },
    { label: 'MATHAMATICS-EM', route: 'maths em tsm' },
    { label: 'MATHAMATICS-TM', route: 'maths tm tsm' },
    { label: 'BIOLOGY-EM', route: 'biology em tsm' },
    { label: 'BIOLOGY-TM', route: 'biology tm tsm' },
    { label: 'PHYSCICAL SCIENCE-EM', route: 'physics em tsm' },
    { label: 'PHYSCICAL SCIENCE-TM', route: 'physics tm tsm' },
    { label: 'SOCIAL-TM', route: 'social tm tsm' },
    { label: 'SOCIAL-EM', route: 'social em tsm' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Study Material'
      subtitle='Subject-wise Telangana study resources'
      items={items}
    />
  );
};

export default Tsstudy;
