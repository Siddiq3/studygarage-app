import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from './src/features/hubs/RemoteLabelHub';

const Class7tb = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'ttb7', route: 'telugu tb7' },
    { key: 'htb7', route: 'hindi tb7' },
    { key: 'etb7', route: 'english tb7' },
    { key: 'mttb7', route: 'mathstm tb7' },
    { key: 'metb7', route: 'mathsem tb7' },
    { key: 'nttb7', route: 'nstm tb7' },
    { key: 'netb7', route: 'nsem tb7' },
    { key: 'sttb7', route: 'socialtm tb7' },
    { key: 'setb7', route: 'socialem tb7' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="Class 7 Textbooks"
      subtitle="Open subject-wise class 7 books"
      dataUrl="https://siddiq3.github.io/Api/subject.json"
      items={items}
    />
  );
};

export default Class7tb;
