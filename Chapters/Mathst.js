import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-3251781230941397/6792182552';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,

});


const Mathste = ({ navigation }) => {
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

        <View style={styles.container}>


            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='1 వాస్తవ సంఖ్యలు' onPress={() =>
                        navigation.navigate('chapter1')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter1') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 1 వాస్తవ సంఖ్యలు</Text>
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='2 సమితులు' onPress={() =>
                        navigation.navigate('chapter2')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter2') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 2 సమితులు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='3 బహుపదులు' onPress={() =>
                        navigation.navigate('chapter3')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter3') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 3 బహుపదులు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='4 రెండు చరరాశులలో రేఖీయ సమీకరణాల జత' onPress={() =>
                        navigation.navigate('chapter4')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter4') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 4 రెండు చరరాశులలో రేఖీయ సమీకరణాల జత</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 5 వర్గ సమీకరణాలు' onPress={() =>
                        navigation.navigate('chapter5')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter5') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 5 వర్గ సమీకరణాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='6 శ్రేఢులు' onPress={() =>
                        navigation.navigate('chapter6')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter6') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 6 శ్రేఢులు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title=' 7 నిరూపక రేఖాగణితం' onPress={() =>
                        navigation.navigate('chapter7')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter7') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 7 నిరూపక రేఖాగణితం</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='8 సరూప త్రిభుజాలు' onPress={() =>
                        navigation.navigate('chapter8')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter8') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 8 సరూప త్రిభుజాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='9 వృత్తాలకు స్పర్శరేఖలు మరియు ఛేదనరేఖలు' onPress={() =>
                        navigation.navigate('chapter9')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter9') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 9 వృత్తాలకు స్పర్శరేఖలు మరియు ఛేదనరేఖలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='10 క్షేత్రమితి' onPress={() =>
                        navigation.navigate('chapter10')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter10') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 10 క్షేత్రమితి</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='11 త్రికోణమితి' onPress={() =>
                        navigation.navigate('chapter11')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter11') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 11 త్రికోణమితి</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='12 త్రికోణమితి అనువర్తనాలు' onPress={() =>
                        navigation.navigate('chapter12')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter12') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 12 త్రికోణమితి అనువర్తనాలు</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='13 సంభావ్యత' onPress={() =>
                        navigation.navigate('chapter13')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter13') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 13 సంభావ్యత</Text>
                    </TouchableWithoutFeedback>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback color='#5F939A' title='14 సాంఖ్యకశాస్త్రం' onPress={() =>
                        navigation.navigate('chapter14')} onPressOut={() => {
                            if (interstitialLoaded) {

                                interstitial.show();
                            } else { navigation.navigate('chapter14') }
                        }} >
                        <Text style={{ fontSize: 20, textAlign: 'center' }}> 14 సాంఖ్యకశాస్త్రం</Text>
                    </TouchableWithoutFeedback>
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





export default Mathste;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});