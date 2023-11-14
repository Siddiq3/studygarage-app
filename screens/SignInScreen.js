import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { colors } from '../theme'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseAuth'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/loading'
import { setUserLoading } from '../redux/slice/user'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


export default function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userLoading } = useSelector(state => state.user);

    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        if (email && password) {
            // good to go
            // navigation.goBack();
            navigation.navigate('10th class');
            try {
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email, password);
                dispatch(setUserLoading(false));
            } catch (e) {
                dispatch(setUserLoading(false));
                Snackbar.show({
                    text: e.message,
                    backgroundColor: 'red'
                });
            }

        } else {
            // show error
            Snackbar.show({
                text: 'Email and Password are required!',
                backgroundColor: 'red'
            });
        }
    }
    return (

        <View style={{ flex: 1 }}>
            <View>
                <View className="relative">
                    <View className="absolute top-0 left-0 z-10">
                        <BackButton />
                    </View>

                    <Text className={`${colors.heading}`}>Sign In</Text>
                </View>

                <View >
                    <Image style={{ height: responsiveHeight(50), width: responsiveWidth(60), marginLeft: responsiveHeight(10), marginRight: responsiveHeight(10), }} source={require('../assets/images/welcome.gif')} />
                </View>
                <View >
                    <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                    <TextInput value={email} onChangeText={value => setEmail(value)} className="p-4 bg-white rounded-full mb-3" />
                    <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
                    <TextInput value={password} secureTextEntry onChangeText={value => setPassword(value)} className="p-4 bg-white rounded-full mb-3" />
                    <TouchableOpacity className="flex-row justify-end">
                        <Text>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                {
                    userLoading ? (
                        <Loading />
                    ) : (
                        <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: colors.button }} className="my-6 rounded-full p-3 shadow-sm mx-2">
                            <Text className="text-center text-white text-lg font-bold">Sign In</Text>
                        </TouchableOpacity>

                    )
                }

            </View>
        </View>

    )
}