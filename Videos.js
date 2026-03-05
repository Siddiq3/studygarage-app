import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import SimpleSubjectHub from './src/features/hubs/SimpleSubjectHub';

const Videos = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { label: 'TELUGU', route: 'Telugu' },
    { label: 'HINDI', route: 'Hindi' },
    { label: 'ENGLISH', route: 'English' },
    { label: 'MATHEMATICS-EM', route: 'Maths em' },
    { label: 'MATHEMATICS-TM', route: 'Maths tm' },
    { label: 'BIOLOGY-EM', route: 'Biology em' },
    { label: 'BIOLOGY-TM', route: 'Biology tm' },
    { label: 'PHYSICAL SCIENCE-EM', route: 'Physics em' },
    { label: 'PHYSICAL SCIENCE-TM', route: 'Physics tm' },
    { label: 'SOCIAL-TM', route: 'Social tm' },
    { label: 'SOCIAL-EM', route: 'Social em' },
  ];

  return (
    <SimpleSubjectHub
      navigation={navigation}
      title="Chapter Wise Video Explanation"
      subtitle="Watch topic videos by subject"
      items={items}
    />
  );
};

export default Videos;
