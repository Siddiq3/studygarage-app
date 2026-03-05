import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mbasem1data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/Mbasem1.json'
      destinationRoute='Mbasem1dataPage'
    />
  );
};

export default Mbasem1data;
