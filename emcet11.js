import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from 'react-native-responsive-dimensions';

const Emcet11 = ({ navigation }) => {

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>

                <Text style={{ fontSize: responsiveFontSize(3.5), marginTop: 30, marginBottom: 60, textAlign: 'center' }}>
                    🎖️ Everyday We Will UPLOAD 6 Questions from Maths-1A, Maths-1B, Physics, Zoology, Botany. 
                    It Will Be Useful For Competitive Exams ✍
                    CLICK START BUTTON 👇🏻👇🏻
                </Text>

                <TouchableOpacity
                    style={{ padding: 10, margin: 15, borderRadius: 15, marginTop: 20, backgroundColor: '#03045e' }}
                    onPress={() => navigation.navigate('Question11')}
                >
                    <Text style={{ fontSize: responsiveFontSize(2.5), fontWeight: '500', textAlign: 'center', color: '#ffffff' }}>
                        START
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}

export default Emcet11;
