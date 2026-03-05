import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from './src/features/hubs/RemoteLabelHub';

const Class8tb = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'ttb8', route: 'telugu tb8' },
    { key: 'htb8', route: 'hindi tb8' },
    { key: 'etb8', route: 'english tb8' },
    { key: 'mttb8', route: 'mathstm tb8' },
    { key: 'metb8', route: 'mathsem tb8' },
    { key: 'nttb8', route: 'nstm tb8' },
    { key: 'netb8', route: 'nsem tb8' },
    { key: 'pttb8', route: 'pstm tb8' },
    { key: 'petb8', route: 'psem tb8' },
    { key: 'sttb8', route: 'socialtm tb8' },
    { key: 'setb8', route: 'socialem tb8' },
    { key: 's3tb8', route: 'social3m tb8' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="Class 8 Textbooks"
      subtitle="Open subject-wise class 8 books"
      dataUrl="https://siddiq3.github.io/Api/subject.json"
      items={items}
    />
  );
};

export default Class8tb;
