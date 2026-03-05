import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter2ndimpdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter2ndimp.json'
      destinationRoute='Inter2ndimpPage'
    />
  );
};

export default Inter2ndimpdata;
