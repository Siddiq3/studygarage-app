import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Hinpqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thhinpqpka.json'
      destinationRoute='HinPqpPageka'
    />
  );
};

export default Hinpqpdataka;
