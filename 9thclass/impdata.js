import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Imp9data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thimp.json'
      destinationRoute='Imp9Page'
    />
  );
};

export default Imp9data;
