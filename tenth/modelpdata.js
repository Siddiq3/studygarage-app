import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Modelpaperdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmodel.json'
      destinationRoute='ModelpaperPage'
    />
  );
};

export default Modelpaperdata;
