import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Tsimp = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU IMP QUES', route: 'Telugu ImpTs' },
    { label: 'HINDI IMP QUES', route: 'Hindi ImpTs' },
    { label: 'ENGLISH IMP QUES', route: 'English ImpTs' },
    { label: 'MATHS TM IMP QUES', route: 'Mathstm ImpTs' },
    { label: 'MATHS-EM IMP QUES', route: 'Mathsem ImpTs' },
    { label: 'PS-TM IMP QUES', route: 'Physicstm ImpTs' },
    { label: 'PS-EM IMP QUES', route: 'Physicsem ImpTs' },
    { label: 'BIOLOGY-TM IMP QUES', route: 'Biologytm ImpTs' },
    { label: 'BIOLOGY-EM IMP QUES', route: 'Biologyem ImpTs' },
    { label: 'SOCIAL-EM IMP QUES', route: 'Socialem ImpTs' },
    { label: 'SOCIAL-TM IMP QUES', route: 'Socialtm ImpTs' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title='Important & Gunshot Questions'
      subtitle='High-yield subject collections for revision'
      items={items}
    />
  );
};

export default Tsimp;
