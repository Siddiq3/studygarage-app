import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from './src/features/hubs/RemoteLabelHub';

const Class9tb = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'ttb9', route: 'telugu tb9' },
    { key: 'htb9', route: 'hindi tb9' },
    { key: 'etb9', route: 'english tb9' },
    { key: 'mttb9', route: 'mathstm tb9' },
    { key: 'metb9', route: 'mathsem tb9' },
    { key: 'nttb9', route: 'nstm tb9' },
    { key: 'netb9', route: 'nsem tb9' },
    { key: 'pttb9', route: 'pstm tb9' },
    { key: 'petb9', route: 'psem tb9' },
    { key: 'sttb9', route: 'socialtm tb9' },
    { key: 'setb9', route: 'socialem tb9' },
    { key: 's3tb9', route: 'social3m tb9' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="Class 9 Textbooks"
      subtitle="Open subject-wise class 9 books"
      dataUrl="https://siddiq3.github.io/Api/subject.json"
      items={items}
    />
  );
};

export default Class9tb;
