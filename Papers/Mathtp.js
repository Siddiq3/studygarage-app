import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayoutContainer from '../src/design-system/components/ScreenLayoutContainer';
import SGCard from '../src/design-system/components/SGCard';
import MrecAdComponent from '../MrecAdComponent';

const Mathtp = () => {
  return (
    <ScreenLayoutContainer variant="home" contentClassName="px-4" scroll>
      <SGCard className="mb-4 items-center py-10">
        <Text className="text-[30px] font-black text-sg-text dark:text-sgd-text">Uploaded Shortly</Text>
        <Text className="mt-2 text-center text-[14px] font-medium text-sg-muted dark:text-sgd-muted">
          Math test paper content will be available soon.
        </Text>
      </SGCard>

      <View className="mb-4">
        <MrecAdComponent />
      </View>
    </ScreenLayoutContainer>
  );
};

export default Mathtp;
