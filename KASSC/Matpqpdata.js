import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Matpqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmatpqpka.json'
      destinationRoute='MatPqpPageka'
    />
  );
};

export default Matpqpdataka;
