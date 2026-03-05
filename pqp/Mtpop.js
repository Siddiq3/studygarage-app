import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Mtpop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Prefinal paper', route: 'MathsTm 2022p' },
    { label: 'Model Paper 2023', route: 'MathsTm 2023' },
    { label: '2022 Public paper', route: 'MathsTm 2022' },
    { label: 'Blueprint for 100 marks', route: 'MathsTm Blueprint' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Maths TM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Mtpop;
