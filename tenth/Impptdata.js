import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Impptdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimppt.json'
      destinationRoute='ImpptPage'
    />
  );
};

export default Impptdata;
