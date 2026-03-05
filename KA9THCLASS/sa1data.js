import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa19dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thsa1ka.json'
      destinationRoute='Sa19Pageka'
    />
  );
};

export default Sa19dataka;
