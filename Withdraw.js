import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Text, TextInput, View, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import ScreenLayoutContainer from './src/design-system/components/ScreenLayoutContainer';
import ScreenHeader from './src/design-system/components/ScreenHeader';
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
      'Submit your details first, otherwise your money will not be credited.',
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
        Alert.alert('Withdrawal request submitted');
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
      <ScreenHeader
        tone="marigold"
        onBack={handleBackPress}
        eyebrow="Withdrawal"
        title="Payout details"
        subtitle="Fill in every field correctly to receive your reward."
      />
      <Animated.View>
        <SGCard className="mb-4">
          <View className="gap-3">
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
          <Text className="mt-3 text-[12px] font-sg-medium text-sg-muted">
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
    <View className="flex-row items-center rounded-[18px] border border-sg-border bg-[#FFFCF5] px-4 py-3">
      <View className="mr-2 h-8 w-8 items-center justify-center rounded-full border border-sg-border bg-[#FFFCF5]">
        <Ionicons name={iconName} size={15} color="#1D2A24" />
      </View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={isDark ? '#1D2A24' : '#5F6A63'}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        className="flex-1 text-[16px] font-sg-semibold text-sg-text"
      />
    </View>
  );
}

export default WithdrawalFormPage;
