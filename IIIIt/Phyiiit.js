import React, { useEffect, useState } from "react";
import { Text, View, Linking, ScrollView, Button, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/3572356105';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Phyiiit = ({ navigation }) => {
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
        <View style={{ flex: 1, backgroundColor: '#3DAEC5' }}>
            <ScrollView>
                <GAMBannerAd
                    unitId={adUnitId2}
                    sizes={[BannerAdSize.FULL_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Phyics Material' onPress={() =>
                        navigation.navigate('phyics material')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('phyics materia') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> Phyics Material</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>Physics Video Explanation for IIIT/Polycet/NTSE</Text>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Heat' onPress={() =>
                        Linking.openURL(`https://youtu.be/9ZAdnxX2gbI`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='ACIDS BASES  SALTS , BITS PART-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/vQisIHGzySQ`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='ACIDS BASES  SALTS , BITS PART-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/et3vLnGAuZE`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='ACIDS BASES  SALTS , BITS PART-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/Uy71wMzo-0c`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES' onPress={() =>
                        Linking.openURL(`https://youtu.be/mX4XppZdNMY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES' onPress={() =>
                        Linking.openURL(`https://youtu.be/8ZODMxgs7TM`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Refraction of light at curved surface' onPress={() =>
                        Linking.openURL(`https://youtu.be/yQ-TEi1Wk-A`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Refraction of light at curved surface' onPress={() =>
                        Linking.openURL(`https://youtu.be/yQ-TEi1Wk-A`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Refraction of light at curved surface' onPress={() =>
                        Linking.openURL(`https://youtu.be/8zg_rElPGHE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='PRINCIPLES OF METALLURGY MCQ PART-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/NZcHjedBh4Y`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='PRINCIPLES OF METALLURGY MCQ PART-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/m9NDnNdXqP4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='CLASSIFICATION OF ELEMENTS Part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/LmdhvaaltsE`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='CLASSIFICATION OF ELEMENTS Part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/wSL2DEZwNuE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Chemical Bonding -1' onPress={() =>
                        Linking.openURL(`https://youtu.be/vfG9faM2ISE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Chemical Bonding -2' onPress={() =>
                        Linking.openURL(`https://youtu.be/xG6HetpgKIE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Chemical Bonding -3' onPress={() =>
                        Linking.openURL(`https://youtu.be/d4rCkHsbCCU  `)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='CARBON AND ITS COMPOUNDS' onPress={() =>
                        Linking.openURL(` https://youtu.be/wKz-DKk7h8E`)}>
                    </Button>
                </Card>


                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='STRUCTURE OF ATOM' onPress={() =>
                        Linking.openURL(`https://youtu.be/AUmCxlTIxuk `)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title=' ELECTRIC CURRENT' onPress={() =>
                        Linking.openURL(` https://youtu.be/xSL1p5AfWCM`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title=' HUMAN EYE AND COLOURFUL WORLD BITS PART-1' onPress={() =>
                        Linking.openURL(` https://youtu.be/nYncl6USNGY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title=' HUMAN EYE AND COLOURFUL WORLD BITS PART-2' onPress={() =>
                        Linking.openURL(` https://youtu.be/Zo1WHRrEyos`)}>
                    </Button>
                </Card>

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

export default Phyiiit;