import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Impmedata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimpme.json'
      destinationRoute='ImpmePage'
    />
  );
};

export default Impmedata;
