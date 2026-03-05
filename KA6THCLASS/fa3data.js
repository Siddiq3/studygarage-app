import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa36dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/6thfa3ka.json'
      destinationRoute='Fa36Pageka'
    />
  );
};

export default Fa36dataka;
