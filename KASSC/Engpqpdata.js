import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Engpqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thengpqpka.json'
      destinationRoute='EngPqpPageka'
    />
  );
};

export default Engpqpdataka;
