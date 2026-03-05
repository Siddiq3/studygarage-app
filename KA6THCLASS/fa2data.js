import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa26dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/6thfa2ka.json'
      destinationRoute='Fa26Pageka'
    />
  );
};

export default Fa26dataka;
