import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa17dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/7thsa1ka.json'
      destinationRoute='Sa17Pageka'
    />
  );
};

export default Sa17dataka;
