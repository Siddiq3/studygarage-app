import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2600175192';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});




const Impinter = ({ navigation }) => {

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


                    <Text style={{ fontSize: 30, textAlign: 'center', color: '#D82148' }}>     Importent And gun Shot Questions...</Text>
                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>

                        <TouchableOpacity onPress={() =>
                            navigation.navigate('t1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('t1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR TELUGU</Text>
                        </TouchableOpacity>

                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('e1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('e1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ENGLISH</Text>
                        </TouchableOpacity>

                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('s1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('s1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR SANSKRIT</Text>
                        </TouchableOpacity>

                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('h1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('h1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR HINDI</Text>
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
                            navigation.navigate('me1aiapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me1aiapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-1A EM</Text>
                        </TouchableOpacity>

                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt1aiapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt1aiapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>MATHS-1A TM</Text>
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('mt1biapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('mt1biapimp') }
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
                            navigation.navigate('me1biapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('me1biapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> MATHS-1B EM</Text>
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pt1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pt1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR PHYSICS TM</Text>
                        </TouchableOpacity>

                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('pe1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('pe1iapimp') }
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
                            navigation.navigate('be1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('be1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR BOTANY-EM</Text>
                        </TouchableOpacity>

                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('bt1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('bt1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}> 1ST YEAR BOTANY-TM</Text>
                        </TouchableOpacity>

                    </Card>







                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ce1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ce1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CHEMISTRY-EM</Text>
                        </TouchableOpacity>

                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ct1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ct1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CHEMISTRY-TM</Text>
                        </TouchableOpacity>

                    </Card>

                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ze1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ze1iapimp') }
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
                            navigation.navigate('zt1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('zt1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ZOOLOGY-TM</Text>
                        </TouchableOpacity>

                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('c1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('c1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR CIVICS EM&TM</Text>
                        </TouchableOpacity>

                    </Card>




                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('eco1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('eco1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR ECONAMICS EM&TM</Text>

                        </TouchableOpacity>

                    </Card>


                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('cm1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('cm1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR COMMERCE EM&TM</Text>
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
                            navigation.navigate('hy1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('hy1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR HISTORY EM&TM</Text>
                        </TouchableOpacity>

                    </Card>



                    <Card style={{ padding: 10, margin: 15, borderRadius: 10 }}>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('ps1iapimp')} onPressOut={() => {
                                if (interstitialLoaded) {

                                    interstitial.show();
                                } else { navigation.navigate('ps1iapimp') }
                            }}>
                            <Text style={{ fontSize: 20, textAlign: 'center' }}>1ST YEAR POLITICAL SCIENCE EM&TM</Text>
                        </TouchableOpacity>

                    </Card>

                </View>

                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.FULL_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />




            </ScrollView>


        </View>

    );
}

export default Impinter;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

})