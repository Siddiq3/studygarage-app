import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa27dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/7thsa2ka.json'
      destinationRoute='Sa27Pageka'
    />
  );
};

export default Sa27dataka;
