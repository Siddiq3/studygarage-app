import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Sa19data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thsa1.json'
      destinationRoute='Sa19Page'
    />
  );
};

export default Sa19data;
