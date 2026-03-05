import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa16dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/6thfa1ka.json'
      destinationRoute='Fa16Pageka'
    />
  );
};

export default Fa16dataka;
