import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Impntdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thmpnt.json'
      destinationRoute='ImpntPage'
    />
  );
};

export default Impntdata;
