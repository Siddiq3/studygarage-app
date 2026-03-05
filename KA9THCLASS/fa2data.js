import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa29dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/9thfa2ka.json'
      destinationRoute='Fa29Pageka'
    />
  );
};

export default Fa29dataka;
