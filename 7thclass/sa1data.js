import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa17data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/7thsa1.json'
      destinationRoute='Sa17Page'
    />
  );
};

export default Sa17data;
