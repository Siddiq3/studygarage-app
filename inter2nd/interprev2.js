import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2600175192';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Interprev2 = ({ navigation }) => {

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
                <View>


                    <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148' }}>previous papers</Text>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('t2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('t2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR TELUGU</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('e2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('e2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ENGLISH</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('s2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('s2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR SANSKRIT</Text>
                        </TouchableOpacity>
                    </Card>

                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('h2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('h2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR HINDI</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me2aiapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me2aiapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2A EM</Text>
                        </TouchableOpacity>
                    </Card>





                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt2aiapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt2aiapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS-2A TM</Text>
                        </TouchableOpacity>
                    </Card>
                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt2biapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt2biapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2B TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me2biapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('met2biapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2B EM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pt2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pt2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR PHYSICS TM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pe2iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pe2iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR PHYSICS EM</Text>
                        </TouchableOpacity>
                    </Card>
                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('be2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('be2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR BOTANY-EM</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('bt2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('bt2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR BOTANY-TM</Text>
                        </TouchableOpacity>
                    </Card>




                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ce2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ce2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CHEMISTRY-EM</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ct2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ct2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CHEMISTRY-TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ze2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ze2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR ZOOLOGY-EM</Text>
                        </TouchableOpacity>
                    </Card>

                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('zt2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('zt2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ZOOLOGY-TM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('c2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('c2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CIVICS EM&TM</Text>
                        </TouchableOpacity>
                    </Card>





                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('eco2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('eco2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ECONOMICS EM&TM</Text>
                        </TouchableOpacity>
                    </Card>
                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('cm2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('cm2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR COMMERCE EM&TM</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('hy2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('hy2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR HISTORY EM&TM</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ps2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ps2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR POLITICAL SCIENCE EM&TM</Text>
                        </TouchableOpacity>
                    </Card>
                    <GAMBannerAd
                        unitId={adUnitId1}
                        sizes={[BannerAdSize.FULL_BANNER]}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>






            </ScrollView>


        </View>

    );
}

export default Interprev2;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})