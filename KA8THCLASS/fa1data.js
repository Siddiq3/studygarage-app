import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa18dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/8thfa1ka.json'
      destinationRoute='Fa18Pageka'
    />
  );
};

export default Fa18dataka;
