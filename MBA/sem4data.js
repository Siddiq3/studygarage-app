import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mbasem4data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/Mbasem4.json'
      destinationRoute='Mbasem4dataPage'
    />
  );
};

export default Mbasem4data;
