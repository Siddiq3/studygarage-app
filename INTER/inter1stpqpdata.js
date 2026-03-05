import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter1stpqpdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter1stpqp.json'
      destinationRoute='Inter1stpqpPage'
    />
  );
};

export default Inter1stpqpdata;
