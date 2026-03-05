import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mbasem2data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/Mbasem2.json'
      destinationRoute='Mbasem2dataPage'
    />
  );
};

export default Mbasem2data;
