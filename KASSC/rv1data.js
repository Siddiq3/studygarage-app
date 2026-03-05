import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Rv1dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thrv1ka.json'
      destinationRoute='Rv1Pageka'
    />
  );
};

export default Rv1dataka;
