import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsprev = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'telugu ts' },
    { label: 'HINDI', route: 'hindi ts' },
    { label: 'ENGLISH', route: 'english ts' },
    { label: 'MATHAMATICS-EM', route: 'maths em ts' },
    { label: 'MATHAMATICS-TM', route: 'maths tm ts' },
    { label: 'BIOLOGY-EM', route: 'biology em ts' },
    { label: 'BIOLOGY-TM', route: 'biology tm ts' },
    { label: 'PHYSCICAL SCIENCE-EM', route: 'physics em ts' },
    { label: 'PHYSCICAL SCIENCE-TM', route: 'physics tm ts' },
    { label: 'SOCIAL-TM', route: 'social tm ts' },
    { label: 'SOCIAL-EM', route: 'social em ts' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Previous Year Papers'
      subtitle='Practice with past Telangana question sets'
      items={items}
    />
  );
};

export default Tsprev;
