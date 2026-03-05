import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, TextInput, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import SGCard from './src/design-system/components/SGCard';
import SGButton from './src/design-system/components/SGButton';

const WithdrawalFormPage = () => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  const [formData, setFormData] = useState({
    userName: '',
    phoneNumber: '',
    upiId: '',
    email: '',
  });

  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Enter Your Details And Click On Submit Button OtherWise Money Will be Not Credited',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'Exit', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    );
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://api.way2employee.com/sk0301withdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Alert.alert('Withdrawal request submitted successfully!');
        navigation.navigate('10th class');
      } else {
        Alert.alert('Error submitting withdrawal request');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An unexpected error occurred');
    }

    setFormData({
      userName: '',
      phoneNumber: '',
      upiId: '',
      email: '',
    });
  };

  return (
    <ScreenLayoutContainer variant="wallet" contentClassName="px-4" scroll>
      <Animated.View entering={FadeInDown.duration(240)}>
        <SGCard className="mb-4 overflow-hidden">
          <LinearGradient
            colors={['rgba(56,37,103,0.46)', 'rgba(17,28,43,0.9)', 'rgba(14,20,31,0.95)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="-m-4 mb-4 rounded-[24px] border border-white/10 px-5 py-4"
          >
            <Text className="text-[11px] font-bold uppercase tracking-[1.1px] text-white/70">Withdrawal</Text>
            <Text className="mt-1 text-[28px] font-extrabold leading-[32px] text-white">Submit Payout Details</Text>
            <Text className="mt-1 text-[13px] font-medium text-[#AEB8CF]">
              Fill all fields correctly to receive your reward amount.
            </Text>

            <View className="mt-3 self-start rounded-full border border-[#00FFA3]/35 bg-[#0F3329] px-2.5 py-1">
              <Text className="text-[11px] font-extrabold text-[#00FFA3]">Secure payout form</Text>
            </View>
          </LinearGradient>

          <View className="mt-4 gap-3">
            <InputField
              placeholder="User Name"
              iconName="person-outline"
              value={formData.userName}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, userName: text }))}
              isDark={isDark}
            />
            <InputField
              placeholder="Phone Number"
              iconName="call-outline"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, phoneNumber: text }))}
              isDark={isDark}
              keyboardType="phone-pad"
            />
            <InputField
              placeholder="UPI ID"
              iconName="wallet-outline"
              value={formData.upiId}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, upiId: text }))}
              isDark={isDark}
              autoCapitalize="none"
            />
            <InputField
              placeholder="Email"
              iconName="mail-outline"
              value={formData.email}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              isDark={isDark}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <SGButton label="Submit" onPress={handleSubmit} className="mt-5" />
          <Text className="mt-3 text-[11px] font-medium text-sg-muted dark:text-sgd-muted">
            Double-check UPI ID and phone number before submitting.
          </Text>
        </SGCard>
      </Animated.View>
    </ScreenLayoutContainer>
  );
};

function InputField({
  placeholder,
  iconName,
  value,
  onChangeText,
  isDark,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
}) {
  return (
    <View className="flex-row items-center rounded-[18px] border border-white/10 bg-[#141A25] px-4 py-3">
      <View className="mr-2 h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#1D2431]">
        <Ionicons name={iconName} size={15} color="#BAC5DC" />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#AEB5C6' : '#7A6A66'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="flex-1 text-[16px] font-semibold text-sg-text dark:text-sgd-text"
      />
    </View>
  );
}

export default WithdrawalFormPage;
