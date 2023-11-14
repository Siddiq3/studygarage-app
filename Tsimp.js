import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Linking, } from "react-native";
import { Card } from "react-native-shadow-cards";


import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2600175192';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5720822270';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true

});


const Tsimp = ({ navigation }) => {

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



        <View style={styles.container} horizontal={false}>
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148' }}>     Importent And gun Shot Questions...</Text>


                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPressOut={() =>
                        navigation.navigate('Telugu ImpTs')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Telugu ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> TELUGU IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPressOut={() =>
                        navigation.navigate('Hindi ImpTs')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Hindi ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> HINDI IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPressOut={() =>
                        navigation.navigate('English ImpTs')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('English ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> English IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPressOut={() =>
                        navigation.navigate('Mathstm ImpTs')} onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Mathstm ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Maths TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Mathsem ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Mathsem ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Physicstm ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Physicstm ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> PS-TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Physicsem ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Physicsem ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> PS-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Biologytm ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Biologytm ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Biology-TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Biologyem ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Biologyem ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Biology-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Socialem ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Socialem ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Social-EM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20, }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Socialtm ImpTs')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Socialtm ImpTs') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>Social-TM IMP QUES</Text>
                    </TouchableOpacity>
                </Card>





            </ScrollView>

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.LEADERBOARD]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    );
}

export default Tsimp;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})