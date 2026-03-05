import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Fa37dataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/7thfa3ka.json'
      destinationRoute='Fa37Pageka'
    />
  );
};

export default Fa37dataka;
