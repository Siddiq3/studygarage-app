import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter1stimpdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter1stimp.json'
      destinationRoute='Inter1stimpPage'
    />
  );
};

export default Inter1stimpdata;
