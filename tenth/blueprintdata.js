import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Blueprintdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thblue.json'
      destinationRoute='UrlPage'
    />
  );
};

export default Blueprintdata;
