import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mcasem4data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/mcasem4.json'
      destinationRoute='Mcasem4dataPage'
    />
  );
};

export default Mcasem4data;
