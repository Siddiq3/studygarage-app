import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import RemoteLabelHub from '../src/features/hubs/RemoteLabelHub';

const Nmmssm = ({ navigation }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const items = [
    { key: 'nmmsme', route: 'nmmsme' },
    { key: 'nmmsmt', route: 'nmmsmt' },
    { key: 'nmmspe', route: 'nmmsse' },
    { key: 'nmmspt', route: 'nmmsst' },
    { key: 'nmmsse', route: 'nmmsse' },
    { key: 'nmmsst', route: 'nmmsst' },
  ];

  return (
    <RemoteLabelHub
      navigation={navigation}
      title="NMMS Study Material"
      subtitle="Choose medium and subject set"
      dataUrl="https://siddiq3.github.io/Api/nmms.json"
      items={items}
    />
  );
};

export default Nmmssm;
