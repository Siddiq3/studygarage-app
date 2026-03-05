import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Weeklytestdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thweeklytest.json'
      destinationRoute='WeeklytestPage'
    />
  );
};

export default Weeklytestdata;
