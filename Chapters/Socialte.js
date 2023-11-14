import React, { useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";

import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';
const Socialte = ({ navigation }) => {

    return (

        <View style={styles.container}>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='1 భారతదేశం: భౌగోళిక స్వరూపాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/XQ6wjGneIwo`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='2 అభివృద్ధి భావనలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/voI6qAvIjKY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='3 ఉత్పత్తి, ఉపాధి ' onPress={() =>
                        Linking.openURL(`https://youtu.be/3IM1p513zT4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='4 భారతదేశ శీతోష్ణస్థితి ' onPress={() =>
                        Linking.openURL(`https://youtu.be/2wV72wUnxlU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='5 భారతదేశ నదులు, నీటి వనరులు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/EGUUVko1a7I`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='6 ప్రజలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZY9skKA0Ef8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='7 ప్రజలు –నివాస ప్రాంతాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/rUPKTzohIRI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='8 ప్రజలు –వలసలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ev4jnJiViUI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='9 రాంపురం : గ్రామ ఆర్థిక వ్యవస్థ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/VB-ETSmxHkU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='10 ప్రపంచీకరణ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/j1sXlH_q6QA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='11 ఆహార భద్రత ' onPress={() =>
                        Linking.openURL(`https://youtu.be/6rgbYXVZKb0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='12 సమానత – సుస్థిర అభివృద్ధి ' onPress={() =>
                        Linking.openURL(`https://youtu.be/JNLk83aA_dg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='13 ప్రపంచ యుద్ధాల మధ్య ప్రపంచం 1900-1950 : భాగం-I  భాగం-II' onPress={() =>
                        Linking.openURL(`https://youtu.be/nUy2R_mnYM0`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='15 వలస పాలిత ప్రాంతాలలో జాతి విముక్తి ఉద్యమాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/rfio3hsvNHg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 16 భారతదేశ జాతీయోద్యమం-దేశ విభజన, స్వాతంత్య్రం: 1939-1947 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/vuWrEFVdew8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='17 స్వతంత్ర భారత రాజ్యాంగ నిర్మాణం ' onPress={() =>
                        Linking.openURL(`https://youtu.be/lyI8F1ckn_M`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='18 స్వతంత్ర భారతదేశం (మొదటి ముప్ఫై సంవత్సరాలు-1947-1977) ' onPress={() =>
                        Linking.openURL(`https://youtu.be/bEpDcNO8xGo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='19 రాజకీయ ధోరణుల ఆవిర్భావం : 1977-2000 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/dMfIGM84_kA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='20 ప్రపంచ యుద్దాల తరువాత ప్రపంచం, భారతదేశం ' onPress={() =>
                        Linking.openURL(`https://youtu.be/J-mcjLHQYrE`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 21 సమకాలీన సామాజిక ఉద్యమాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/8kv6oKxcTG0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='22 పౌరులు, ప్రభుత్వాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/1_LFC3ypOKk`)}>
                    </Button>
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

export default Socialte;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});