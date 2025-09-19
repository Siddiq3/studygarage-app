import React, { useEffect } from "react";
import { BackHandler, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions'; // Make sure you installed this package

const Dtest = ({ navigation }) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack();
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
                <Text style={{ 
                    fontSize: responsiveFontSize(3.5), 
                    marginBottom: 60, 
                    textAlign: 'center' 
                }}>
                    🎖️ Everyday We Will UPLOAD 6 Questions from Nmms Syllabus. It Will Be Useful For FINAL NMMS Exams✍
                    CLICK START BUTTON 👇🏻👇🏻
                </Text>

                <TouchableOpacity 
                    style={{ 
                        padding: 10, 
                        marginHorizontal: 15, 
                        borderRadius: 15, 
                        backgroundColor: '#03045e' 
                    }} 
                    onPress={() => navigation.navigate('Question6')}
                >
                    <Text style={{ 
                        fontSize: responsiveFontSize(2.5), 
                        fontWeight: '500', 
                        textAlign: 'center', 
                        color: '#ffffff' 
                    }}>
                        START
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default Dtest;
