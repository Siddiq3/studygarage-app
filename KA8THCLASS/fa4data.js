import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa48dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/8thfa4ka.json'
      destinationRoute='Fa48Pageka'
    />
  );
};

export default Fa48dataka;
