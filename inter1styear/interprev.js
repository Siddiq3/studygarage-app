import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2600175192';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Interprev = ({ navigation }) => {


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
                            navigation.navigate('t1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('t1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR TELUGU</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('e1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('e1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ENGLISH</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('s1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('s1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR SANSKRIT</Text>
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
                            navigation.navigate('h1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('h1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR HINDI</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me1aiapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me1aiapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-1A EM</Text>
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
                            navigation.navigate('mt1aiapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt1aiapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS-1A TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me1biapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me1biapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-1B TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt1biapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt1biapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-1B TM</Text>
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
                            navigation.navigate('pt1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pt1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR PHYSICS TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pe1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pe1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR PHYSICS EM</Text>
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
                            navigation.navigate('be1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('be1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR BOTANY-EM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('bt1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('bt1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR BOTANY-TM</Text>
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
                            navigation.navigate('ce1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ce1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CHEMISTRY-EM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ct1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ct1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CHEMISTRY-TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ze1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ze1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR ZOOLOGY-EM</Text>
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
                            navigation.navigate('zt1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('zt1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ZOOLOGY-TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('c1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('c1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CIVICS EM&TM</Text>
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
                            navigation.navigate('eco1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('eco1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ECONOMICS EM&TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('cm1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('cm1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR COMMERCE EM&TM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('hy1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('hy1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR HISTORY EM&TM</Text>
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
                            navigation.navigate('ps1iapprev')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ps1iapprev') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR POLITICAL SCIENCE EM&TM</Text>
                        </TouchableOpacity>
                    </Card>

                </View>






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

export default Interprev;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})