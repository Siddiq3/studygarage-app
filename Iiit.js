import React, { useEffect } from "react";
import { View, Button, ScrollView, TouchableOpacity, Text, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";




import { BannerAdSize, TestIds, BannerAd, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';






const Iiit = ({ navigation }) => {

    useEffect(() => {


        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
    }, []);

    return (

        <View style={{ flex: 1 }} horizontal={false}>
            <ScrollView>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT SYLLABUS' onPress={() =>
                        navigation.navigate('syllabus')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT SYLLABUS</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT -Maths' onPress={() =>
                        navigation.navigate('im')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT-MATHAMATICS</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT Physics ' onPress={() =>
                        navigation.navigate('ip')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT Phyics</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT Biology' onPress={() =>
                        navigation.navigate('ib')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT Biology</Text>
                    </TouchableOpacity>
                </Card>





            </ScrollView>


            <BannerAd
                unitId={adUnitId1}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Iiit;