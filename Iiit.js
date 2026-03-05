import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Iiit = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'IIIT Syllabus', route: 'syllabus' },
    { label: 'IIIT Mathematics', route: 'im' },
    { label: 'IIIT Physics', route: 'ip' },
    { label: 'IIIT Biology', route: 'ib' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="IIIT Preparation"
      subtitle="Syllabus and subject material"
      items={items}
    />
  );
};

export default Iiit;
