import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Imphindata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thimphin.json'
      destinationRoute='ImphinPage'
    />
  );
};

export default Imphindata;
