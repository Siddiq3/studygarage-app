import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from '../src/features/hubs/SimpleSubjectHub';

const Ptpop = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: '2022 Prefinal paper', route: 'PhysicsTm 2022p' },
    { label: '2022 Public paper', route: 'PhysicsTm 2022' },
    { label: 'Model Paper 2023', route: 'PhysicsTm 2023' },
    { label: 'Blueprint for 100 marks', route: 'ScienceTM1 Blueprint' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Physics TM Previous Papers"
      subtitle="Public, prefinal, and model papers"
      items={items}
    />
  );
};

export default Ptpop;
