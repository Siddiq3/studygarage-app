import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mcasem3data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/mcasem3.json'
      destinationRoute='Mcasem3dataPage'
    />
  );
};

export default Mcasem3data;
