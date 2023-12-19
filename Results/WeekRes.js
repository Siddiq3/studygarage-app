import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import Title from '../Title';
import { TestIds, InterstitialAd, AdEventType, } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/2407646303';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true
});

const WeekResult = ({ navigation, route }) => {
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
    }
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
    const { score, } = route.params

    const resultBanner = score >= 60 ? "https://cdni.iconscout.com/illustration/premium/thumb/men-celebrating-victory-4587301-3856211.png" : "https://cdni.iconscout.com/illustration/free/thumb/concept-about-business-failure-1862195-1580189.png"
    return (
        <View style={styles.container}>
            <Title titleText='RESULTS' />
            <Text style={styles.scoreValue}>{score}</Text>

            <View style={styles.bannerContainer}>
                <Image
                    source={{
                        uri: resultBanner,
                    }}
                    style={styles.banner}
                    resizeMode="contain"
                />
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('10th class')} style={styles.button}
                onPressOut={() => {
                    if (interstitialLoaded) {

                        interstitial.show();
                    } else { navigation.navigate('10th class') }
                }}
            >
                <Text style={styles.buttonText}>GO TO HOME</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Weekly Answer')} style={styles.button}
                onPressOut={() => {
                    if (interstitialLoaded) {

                        interstitial.show();
                    } else { navigation.navigate('Weekly Answer') }
                }}
            >
                <Text style={styles.buttonText}>Click Here for Answers</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};



export default WeekResult;

const styles = StyleSheet.create({
    banner: {
        height: 300,
        width: 300,
    },
    bannerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    container: {
        paddingTop: 40,
        paddingHorizontal: 20,
        height: '100%',
    },
    button: {
        width: '100%',
        backgroundColor: '#1A759F',
        padding: 20,
        borderRadius: 22,
        alignItems: 'center',
        marginBottom: 40,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ED4264',
        textAlign: 'center'
    },
    scoreValue: {
        fontSize: 24,
        fontWeight: '800',
        alignSelf: 'center'
    }
});