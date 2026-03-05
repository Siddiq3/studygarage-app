import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter2ndpqpdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter2ndpqp.json'
      destinationRoute='Inter2ndpqpPage'
    />
  );
};

export default Inter2ndpqpdata;
