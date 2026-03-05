import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Rv2data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thrv2.json'
      destinationRoute='Rv2Page'
    />
  );
};

export default Rv2data;
