import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa19dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thfa1ka.json'
      destinationRoute='Fa19Pageka'
    />
  );
};

export default Fa19dataka;
