import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Imp7data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/7thimp.json'
      destinationRoute='Imp7Page'
    />
  );
};

export default Imp7data;
