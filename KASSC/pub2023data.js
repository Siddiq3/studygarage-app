import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Public2023dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thpublic2023ka.json'
      destinationRoute='Public2023Pageka'
    />
  );
};

export default Public2023dataka;
