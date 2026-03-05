import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Imp6dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/6thimpka.json'
      destinationRoute='Imp6Pageka'
    />
  );
};

export default Imp6dataka;
