import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Modelpaperdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmodelka.json'
      destinationRoute='ModelpaperPageka'
    />
  );
};

export default Modelpaperdataka;
