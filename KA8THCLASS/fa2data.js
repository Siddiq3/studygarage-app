import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa28dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/8thfa2ka.json'
      destinationRoute='Fa28Pageka'
    />
  );
};

export default Fa28dataka;
