import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Mapdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmap.json'
      destinationRoute='MapPage'
    />
  );
};

export default Mapdata;
