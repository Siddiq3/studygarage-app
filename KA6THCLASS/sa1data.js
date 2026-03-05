import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa16dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/6thsa1ka.json'
      destinationRoute='Sa16Pageka'
    />
  );
};

export default Sa16dataka;
