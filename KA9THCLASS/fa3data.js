import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa39dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thfa3ka.json'
      destinationRoute='Fa39Pageka'
    />
  );
};

export default Fa39dataka;
