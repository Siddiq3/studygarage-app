import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from './src/features/hubs/RemoteLabelHub';

const Class6tb = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'ttb6', route: 'telugu tb6' },
    { key: 'htb6', route: 'hindi tb6' },
    { key: 'etb6', route: 'english tb6' },
    { key: 'mttb6', route: 'mathstm tb6' },
    { key: 'metb6', route: 'mathsem tb6' },
    { key: 'nttb6', route: 'nstm tb6' },
    { key: 'netb6', route: 'nsem tb6' },
    { key: 'sttb6', route: 'socialtm tb6' },
    { key: 'setb6', route: 'socialem tb6' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="Class 6 Textbooks"
      subtitle="Open subject-wise class 6 books"
      dataUrl="https://siddiq3.github.io/Api/subject.json"
      items={items}
    />
  );
};

export default Class6tb;
