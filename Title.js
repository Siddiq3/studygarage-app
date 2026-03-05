import React from 'react';
import { Text, View } from 'react-native';

const Title = ({ titleText }) => {
  return (
    <View className="items-center justify-center py-4">
      <Text className="text-[34px] font-black tracking-[0.4px] text-sg-text dark:text-sgd-text">{titleText}</Text>
    </View>
  );
};

export default Title;
