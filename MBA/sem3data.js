import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mbasem3data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/Mbasem3.json'
      destinationRoute='Mbasem3dataPage'
    />
  );
};

export default Mbasem3data;
