import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Importe = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU IMP QUES', route: 'Telugu Imp' },
    { label: 'HINDI IMP QUES', route: 'Hindi Imp' },
    { label: 'ENGLISH IMP QUES', route: 'English Imp' },
    { label: 'MATHS TM IMP QUES', route: 'Mathstm Imp' },
    { label: 'MATHS EM IMP QUES', route: 'Mathsem Imp' },
    { label: 'PS TM IMP QUES', route: 'Physicstm Imp' },
    { label: 'PS EM IMP QUES', route: 'Physicsem Imp' },
    { label: 'BIOLOGY TM IMP QUES', route: 'Biologytm Imp' },
    { label: 'BIOLOGY EM IMP QUES', route: 'Biologyem Imp' },
    { label: 'SOCIAL EM IMP QUES', route: 'Socialem Imp' },
    { label: 'SOCIAL TM IMP QUES', route: 'Socialtm Imp' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Important & Gun Shot Questions"
      subtitle="High-value question banks by subject"
      items={items}
    />
  );
};

export default Importe;
