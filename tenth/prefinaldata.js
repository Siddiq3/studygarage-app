import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Prefinaldata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thprefinal.json'
      destinationRoute='PrefinalPage'
    />
  );
};

export default Prefinaldata;
