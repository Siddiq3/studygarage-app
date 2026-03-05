import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Public2023data = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thpublic2023.json'
      destinationRoute='Public2023Page'
    />
  );
};

export default Public2023data;
