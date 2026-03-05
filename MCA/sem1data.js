import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mcasem1data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/mcasem1.json'
      destinationRoute='Mcasem1dataPage'
    />
  );
};

export default Mcasem1data;
