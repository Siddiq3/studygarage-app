import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';


const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});
const Nste1 = ({ navigation }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    // No advert ready to show yet
    if (!loaded) {
        console.log('hi');
    } const [interstitialLoaded, setInterstitialLoaded] = useState(false);


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



                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt1') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1.పోషణ – ఆహార సరఫరా వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt2') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2. శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt3') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 3. ప్రసరణ –పదార్థ రవాణా వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt4') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 4. విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt5')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt5') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> '5. నియంత్రణ –సమన్వయ వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt6')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt6') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 6. ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1.ఉష్ణం' onPress={() =>
                        navigation.navigate('Nt7')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('Nt7') }
                        }}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}>7. జీవక్రియలలో సమన్వయం</Text>
                    </TouchableWithoutFeedback>
                </Card>








            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.MEDIUM_RECTANGLE]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    );
}

export default Nste1;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});