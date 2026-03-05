import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Rv3dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thrv3.json'
      destinationRoute='Rv3Pageka'
    />
  );
};

export default Rv3dataka;
