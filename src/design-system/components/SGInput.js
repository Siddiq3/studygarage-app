import React from 'react';
import { TextInput, View } from 'react-native';

export default function SGInput({ className = '', inputClassName = '', ...props }) {
  return (
    <View className={`min-h-12 justify-center rounded-[14px] border border-sg-border bg-sg-surface px-3.5 ${className}`}>
      <TextInput
        placeholderTextColor="#5F6A63"
        selectionColor="rgba(23,105,79,0.3)"
        className={`text-[16px] font-sg-medium text-sg-text ${inputClassName}`}
        {...props}
      />
    </View>
  );
}
