import React from 'react';
import { Text, View, ScrollView } from 'react-native';

const Englishv = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 40, textAlign: 'center' }}>
          UPLOADED SHORTLY...
        </Text>
      </ScrollView>
    </View>
  );
};

export default Englishv;
