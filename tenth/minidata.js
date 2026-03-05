import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Minidata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmini.json'
      destinationRoute='MiniPage'
    />
  );
};

export default Minidata;
