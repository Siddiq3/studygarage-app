import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Dailytestdata = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thdailytest.json'
      destinationRoute='DailytestPage'
    />
  );
};

export default Dailytestdata;
