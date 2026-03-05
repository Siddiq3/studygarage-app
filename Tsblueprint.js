import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsblue = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'telugu tsb' },
    { label: 'HINDI', route: 'hindi tsb' },
    { label: 'ENGLISH', route: 'english tsb' },
    { label: 'MATHAMATICS-EM', route: 'maths em tsb' },
    { label: 'MATHAMATICS-TM', route: 'maths tm tsb' },
    { label: 'BIOLOGY-EM', route: 'biology em tsb' },
    { label: 'BIOLOGY-TM', route: 'biology tm tsb' },
    { label: 'PHYSCICAL SCIENCE-EM', route: 'physics em tsb' },
    { label: 'PHYSCICAL SCIENCE-TM', route: 'physics tm tsb' },
    { label: 'SOCIAL-TM', route: 'social tm tsb' },
    { label: 'SOCIAL-EM', route: 'social em tsb' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Blueprint'
      subtitle='Subject-wise Telangana blueprint maps'
      items={items}
    />
  );
};

export default Tsblue;
