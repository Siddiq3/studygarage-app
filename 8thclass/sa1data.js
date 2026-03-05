import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa18data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/8thsa1.json'
      destinationRoute='Sa18Page'
    />
  );
};

export default Sa18data;
