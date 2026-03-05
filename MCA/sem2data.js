import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mcasem2data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/mcasem2.json'
      destinationRoute='Mcasem2dataPage'
    />
  );
};

export default Mcasem2data;
