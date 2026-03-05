import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Socpqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thsocpqpka.json'
      destinationRoute='SocPqpPageka'
    />
  );
};

export default Socpqpdataka;
