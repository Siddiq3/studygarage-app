import React from 'react';
import { TextInput, View } from 'react-native';

export default function SGInput({ className = '', inputClassName = '', ...props }) {
  return (
    <View className={`min-h-12 justify-center rounded-[18px] border border-white/12 bg-white/7 px-3.5 ${className}`}>
      <TextInput
        placeholderTextColor="#9AA3B7"
        className={`text-base font-medium text-white ${inputClassName}`}
        {...props}
      />
    </View>
  );
}
