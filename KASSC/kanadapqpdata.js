import React from 'react';
import RemoteDataListScreen from '../src/features/lists/RemoteDataListScreen';

const Kanadapqpdataka = ({ navigation }) => {
  return (
    <RemoteDataListScreen
      navigation={navigation}
      fetchUrl='https://siddiq3.github.io/Api/10thkanpqpka.json'
      destinationRoute='KanPqpPageka'
    />
  );
};

export default Kanadapqpdataka;
