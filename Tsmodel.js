import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsmodel = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'telugu testpapersTS' },
    { label: 'HINDI', route: 'hindi testpapersTS' },
    { label: 'ENGLISH', route: 'english testpapersTS' },
    { label: 'MATHAMATICS-EM', route: 'maths em testpapersTS' },
    { label: 'MATHAMATICS-TM', route: 'maths tm testpapersTS' },
    { label: 'PS-EM', route: 'physics em testpapersTS' },
    { label: 'PS-TM', route: 'physics tm testpapersTS' },
    { label: 'NS-EM', route: 'ns em testpapersTS' },
    { label: 'NS-TM', route: 'ns tm testpapersTS' },
    { label: 'SOCIAL-TM', route: 'social tm testpapersTS' },
    { label: 'SOCIAL-EM', route: 'social em testpapersTS' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Model Papers'
      subtitle='Subject-wise Telangana test papers'
      items={items}
    />
  );
};

export default Tsmodel;
