import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'

import { GoogleSignin, statusCodes, } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential, } from 'firebase/auth'
import { auth } from '../config/firebaseAuth'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AntDesign } from '@expo/vector-icons';

// Somewhere in your code

GoogleSignin.configure({
    webClientId: '642376879468-436e2utsj4tnkc1lglubjackgd2573nv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)

});


export default function WelcomScreen() {
    const navigation = useNavigation();

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredentials = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredentials);

        } catch (error) {
            console.log('got error: ', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };
    return (
        <View style={{ flex: 1, }}>
            <ScrollView>

                <View >
                    <Image style={{ height: responsiveHeight(50), width: responsiveWidth(60), marginLeft: responsiveHeight(10), marginRight: responsiveHeight(10), marginTop: 40 }} source={require('../assets/images/welcome.gif')} />
                </View>
                <View >
                    <Text style={{ color: '#74c69d', textAlign: 'center', justifyContent: 'center', fontSize: responsiveFontSize(4), fontWeight: 900, margin: responsiveHeight(1), marginTop: responsiveHeight(2) }}>EARN WITH LEARN</Text>

                    <TouchableOpacity style={{ padding: 10, margin: 15, backgroundColor: "#74c69d", borderRadius: 20, margin: responsiveHeight(1) }} onPress={() => navigation.navigate('SignIn')} >
                        <Text style={{ color: '#000000', textAlign: 'center', justifyContent: 'center', fontSize: responsiveFontSize(2), fontWeight: 900 }}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ padding: 10, margin: 15, backgroundColor: "#74c69d", borderRadius: 20, margin: responsiveHeight(1) }} onPress={() => navigation.navigate('SignUp')} >
                        <Text style={{ color: '#000000', textAlign: 'center', justifyContent: 'center', fontSize: responsiveFontSize(2), fontWeight: 900 }} >Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ padding: 1, margin: 10, backgroundColor: "#74c69d", borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 70 }} onPress={() => signIn()}  >
                        <View  >
                            <AntDesign name="google" size={35} color="black" />
                            <Text style={{ color: '#000000', textAlign: 'center', justifyContent: 'center', fontSize: responsiveFontSize(2), fontWeight: 900 }} > Sign in with google</Text>
                        </View>

                    </TouchableOpacity>
                </View>


            </ScrollView>

        </View>


    )
}