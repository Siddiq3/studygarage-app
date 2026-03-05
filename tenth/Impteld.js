import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Impteldata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimptel.json'
      destinationRoute='ImptelPage'
    />
  );
};

export default Impteldata;
