import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Rv3data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thrv3.json'
      destinationRoute='Rv3Page'
    />
  );
};

export default Rv3data;
