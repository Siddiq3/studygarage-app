import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking, TouchableOpacity, Image } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, TestIds, AdEventType, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/6943855982';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2818388282601075/7368142213';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing', 'education,games,finance'],
});




const Note7e = ({ navigation }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const getQuiz = async () => {
        setIsLoading(true)
        const url1 = 'https://siddiq3.github.io/Api/notes7.json';
        const res = await fetch(url1);
        const data = await res.json();

        setQuestions(data.results[0]);

        setIsLoading(false)

    };

    useEffect(() => {
        getQuiz();
    }, []);
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



                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e1'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e1)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e2'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e2)}</Text>)}


                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e3'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e3)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e4'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e4)}</Text>)}


                    </TouchableOpacity>
                </Card>


                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.FULL_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e5'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e5)}</Text>)}


                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e6'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e6)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e6'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e6)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e7'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e7)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e8'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e8)}</Text>)}


                    </TouchableOpacity>
                </Card>

                <GAMBannerAd
                    unitId={adUnitId1}
                    sizes={[BannerAdSize.FULL_BANNER]}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1} onPress={() => {
                        if (interstitialLoaded) {

                            interstitial.show();
                        } else { navigation.navigate('n7e9'); }
                    }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e9)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e10'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e10)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e11'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e11)}</Text>)}


                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 10, margin: 15 }}>
                    <TouchableOpacity style={{ padding: 10, margin: 15 }} activeOpacity={1}
                        onPress={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('n7e12'); }
                        }}>
                        {isLoading ? <Text style={{ fontSize: 16, fontWeight: '500', }}>Loading...</Text> : questions && (<Text style={{ textAlign: 'center', fontSize: 20, textAlignVertical: 'center', }}>{decodeURIComponent(questions.n7e12)}</Text>)}


                    </TouchableOpacity>
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

export default Note7e;
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },

});