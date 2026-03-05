import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Rv2dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thrv2ka.json'
      destinationRoute='Rv2Pageka'
    />
  );
};

export default Rv2dataka;
