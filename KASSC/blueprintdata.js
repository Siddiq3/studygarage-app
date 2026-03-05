import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Blueprintdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thkablue.json'
      destinationRoute='blueprintka'
    />
  );
};

export default Blueprintdataka;
