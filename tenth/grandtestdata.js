import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Grandtestdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thgrandtest.json'
      destinationRoute='GrandtestPage'
    />
  );
};

export default Grandtestdata;
