import React from 'react';
import { Text, View } from 'react-native';

const Title = ({ titleText }) => {
  return (
    <View className="items-center justify-center py-4">
      <Text className="text-[34px] font-sg-display text-sg-text">{titleText}</Text>
    </View>
  );
};

export default Title;
