import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter1stmdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter1stm.json'
      destinationRoute='Inter1stmPage'
    />
  );
};

export default Inter1stmdata;
