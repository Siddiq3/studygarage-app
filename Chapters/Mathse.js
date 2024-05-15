import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});


const Mathsee = ({ navigation }) => {
    const [interstitialLoaded, setInterstitialLoaded] = useState(false);


    const loadInterstitial = () => {
        const unsubscribeLoaded = interstitial.addAdEventListener(
            AdEventType.LOADED,
            () => {
                setInterstitialLoaded(true);
            }
        );

        const unsubscribeClosed = interstitial.addAdEventListener(
            AdEventType.CLOSED,
            () => {
                setInterstitialLoaded(false);
                interstitial.load();
            }
        );

        interstitial.load();

        return () => {
            unsubscribeClosed();
            unsubscribeLoaded();
        }
    }
    useEffect(() => {
        const unsubscribeInterstitialEvents = loadInterstitial();

        return () => {
            unsubscribeInterstitialEvents();

        };
    }, [])
    return (

        <View style={styles.container}>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1 Real Numbers' onPress={() =>
                        navigation.navigate('real numbers')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('real numbers') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1 Real Numbers </Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='2 Sets ' onPress={() =>
                        navigation.navigate('sets')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('sets') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2 Sets </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='3 Polynomials ' onPress={() =>
                        navigation.navigate('polynomials')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('polynomials') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 3 Polynomials </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='4 Pair of Linear Equations in Two Variables ' onPress={() =>
                        Linking.openURL(`https://youtu.be/NeMs_ydV4dY`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 4 Pair of Linear Equations in Two Variables </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='5 Quadratic Equations ' onPress={() =>
                        Linking.openURL(`https://youtu.be/zp3NZ6Fr-sE`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 5 Quadratic Equations </Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='6 Progressions ' onPress={() =>
                        Linking.openURL(`https://youtu.be/gKJtrtTn49E`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  6 Progressions </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 7 Coordinate Geometry ' onPress={() =>
                        navigation.navigate('coordinate')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('coordinate') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 7 Coordinate Geometry </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='8 Similar Triangles ' onPress={() =>
                        navigation.navigate('similar')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('similar') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 8 Similar Triangles </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 9 Tangents and Secants to a Circle ' onPress={() =>
                        navigation.navigate('tangents')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('tangents') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 9 Tangents and Secants to a Circle </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='10 Mensuration ' onPress={() =>
                        Linking.openURL(`https://youtu.be/AzV28RGJUlI`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 10 Mensuration </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='11 Trigonometry ' onPress={() =>
                        navigation.navigate('trigonometry')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('trigonometry') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 11 Trigonometry </Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 12 Applications of Trigonometry ' onPress={() =>
                        Linking.openURL(`https://youtu.be/92qg_Un-OVw`)}>
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>  12 Applications of Trigonometry</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='13 Probability ' onPress={() =>
                        navigation.navigate('probability')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('probability') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 13 Probability</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='14 Statistics ' onPress={() =>
                        navigation.navigate('stats')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('stats') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 14 Statistics  </Text>
                    </TouchableWithoutFeedback>
                </Card>

            </ScrollView>


        </View>

    );
}

export default Mathsee;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});