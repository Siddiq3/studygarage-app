import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Kapqp = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'KANADA', route: 'kanada ka' },
    { label: 'HINDI', route: 'hindi ka' },
    { label: 'ENGLISH', route: 'english ka' },
    { label: 'MATHEMATICS-EM & KM', route: 'maths ka' },
    { label: 'SCIENCE-EM & KM', route: 'biology ka' },
    { label: 'SOCIAL-EM & KM', route: 'social ka' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Karnataka Previous Papers"
      subtitle="2015 to 2023 question papers"
      items={items}
    />
  );
};

export default Kapqp;
