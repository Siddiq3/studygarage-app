import React, { useEffect, useState } from "react";
import { Text, View, Linking, ScrollView, Button, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/3572356105';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Mathsiiit = ({ navigation }) => {
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

            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }} />
            <ScrollView>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <TouchableWithoutFeedback color='#5F939A' title='Maths Material' onPress={() =>
                        navigation.navigate('maths Material')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('maths Material') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> maths Material</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>Maths Video Explanation for IIIT/Polycet/NTSE</Text>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Real Numbers' onPress={() =>
                        Linking.openURL(`https://youtu.be/SN9oNfMLAhA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Sets' onPress={() =>
                        Linking.openURL(`https://youtu.be/nylyvwSccG8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Polynomial' onPress={() =>
                        Linking.openURL(`https://youtu.be/l68uX91eeJ0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Pair of Linear Equations in Two Variables ' onPress={() =>
                        Linking.openURL(`https://youtu.be/yqBHtw_2KwM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Quadratic Equations' onPress={() =>
                        Linking.openURL(`https://youtu.be/rJKqF2iMj6k`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Progression' onPress={() =>
                        Linking.openURL(`https://youtu.be/mDJxHCZwunM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Coordinate Geometry' onPress={() =>
                        Linking.openURL(`https://youtu.be/Mc7mAJA5lG0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Trigonometry part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/e2CH7MekM0o`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Trigonometry part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/GgPBKRIWBvs`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20, backgroundColor: '#9FC8D1' }}>
                    <Button color='#5F939A' title='Model Paper Explanation' onPress={() =>
                        Linking.openURL(`https://youtu.be/NsvnpvayPQo`)}>
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
export default Mathsiiit;