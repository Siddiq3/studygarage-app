import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa38data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/8thfa3.json'
      destinationRoute='UrlPage'
    />
  );
};

export default Fa38data;
