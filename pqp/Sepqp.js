import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableWithoutFeedback, Linking, } from "react-native";
import { Card } from "react-native-shadow-cards";


import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/9410155118';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true

});


const Sepop = ({ navigation }) => {

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
            <ScrollView>





                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2022')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2022') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2022 Public paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('SocialEm 2022p')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2022p') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>2022-Prefinal paper</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('SocialEm 2023')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2023') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Model Paper 2023</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPress={() =>
                        navigation.navigate('SocialEm Blueprint')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm Blueprint') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Bule Print for 100 marks</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2019p1')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2019p1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2019-public paper- 1</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2019p2')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2019p2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2019-public paper- 2</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2018p1')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2018p1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2018-public paper- 1</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2018p2')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2018p2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2018-public paper- 2</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2017p1')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2017p1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2017-public paper- 1</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2017p2')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2017p2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2017-public paper- 2</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2016p1')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2016p1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2016-public paper- 1</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2016p2')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2016p2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2016-public paper- 2</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2015p1')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2015p1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2015-public paper- 1</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback onPressOut={() =>
                        navigation.navigate('SocialEm 2015p2')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('SocialEm 2015p2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2015-public paper- 2</Text>
                    </TouchableWithoutFeedback>
                </Card>



            </ScrollView>

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    );
}

export default Sepop;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE3E1',
    },

})