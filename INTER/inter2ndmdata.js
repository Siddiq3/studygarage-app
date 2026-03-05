import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Inter2ndmdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/inter2ndm.json'
      destinationRoute='Inter2ndmPage'
    />
  );
};

export default Inter2ndmdata;
