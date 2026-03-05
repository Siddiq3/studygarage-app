import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Prefinaldataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thprefinalka.json'
      destinationRoute='PrefinalPageka'
    />
  );
};

export default Prefinaldataka;
