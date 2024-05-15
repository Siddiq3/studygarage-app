import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, BackHandler } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';



const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';




const Quiz = ({ navigation }) => {
    useEffect(() => {


        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.goBack(); // Navigate back when back button is pressed
            return true; // Prevent default behavior
        });

        return () => backHandler.remove();
    }, []);
    return (



        <View style={styles.container}>
            <ScrollView>









                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='BIOLOGY-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Biology tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='PHYSICAL SCIENCE-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Physics tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='PHYSICAL SCIENCE-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Physics emq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 5, margin: 20 }}>
                    <TouchableOpacity color='#5F939A' title='SOCIAL-TM' activeOpacity={1} onPress={() =>
                        navigation.navigate('Social tmq')}
                    >
                        <Text style={{ fontSize: 25, textAlign: 'center' }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>

                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>      Reaming subhects uploaded soon...</Text>

            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

        </View>

    );
}

export default Quiz;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#bdfff3'

    }

});