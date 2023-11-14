import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";



import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2600175192';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});



const Interst2 = ({ navigation }) => {


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


                    <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148' }}> study materials</Text>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('t2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('t2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR TELUGU</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('e2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('e2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ENGLISH</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('s2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('s2iapst') }
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
                            navigation.navigate('h2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('h2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR HINDI</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me2aiapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me2aiapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2A EM</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt2aiapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt2aiapst') }
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
                            navigation.navigate('mt2biapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt2biapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2B TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('me2biapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me2biapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-2B TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pt2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pt2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR PHYSICS TM</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pe2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pe2iapst') }
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
                            navigation.navigate('be2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('be2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR BOTANY-EM</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('bt2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('bt2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR BOTANY-TM</Text>
                        </TouchableOpacity>
                    </Card>







                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ce2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ce2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CHEMISTRY-EM</Text>
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
                            navigation.navigate('ct2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ct2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CHEMISTRY-TM</Text>
                        </TouchableOpacity>
                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ze2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ze2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 2nd YEAR ZOOLOGY-EM</Text>
                        </TouchableOpacity>
                    </Card>





                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('zt2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('zt2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ZOOLOGY-TM</Text>
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
                            navigation.navigate('c2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('c2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR CIVICS</Text>
                        </TouchableOpacity>
                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('eco2iapst')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('eco2iapst') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR ECONOMICS</Text>
                        </TouchableOpacity>
                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('cm2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('cm2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR COMMERCE</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('hy2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('hy2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR HISTORY</Text>
                        </TouchableOpacity>
                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ps2iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ps2iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>2nd YEAR POLITICAL SCIENCE</Text>
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

export default Interst2;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})