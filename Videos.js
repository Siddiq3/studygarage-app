import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";

import { InterstitialAd, AdEventType, TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';



const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';

const Videos = ({ navigation }) => {


    return (



        <View style={styles.container} horizontal={false}>
            <ScrollView>
                <Text style={{ fontSize: 25, textAlign: 'center', color: '#D82148' }}>     Chapter Wise Video Explanation</Text>




                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='TELUGU' onPress={() =>
                        navigation.navigate('Telugu')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>TELUGU</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='HINDI' onPress={() =>
                        navigation.navigate('Hindi')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>HINDI</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='ENGLISH' onPress={() =>
                        navigation.navigate('English')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}>ENGLISH</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='MATHAMATICS-EM' onPress={() =>
                        navigation.navigate('Maths em')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> MATHAMATICS-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='MATHAMATICS-TM' onPress={() =>
                        navigation.navigate('Maths tm')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> MATHAMATICS-TM</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 30, margin: 20 }}>

                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='BIOLOGY-EM' onPress={() =>
                        navigation.navigate('Biology em')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> BIOLOGY-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='BIOLOGY-TM' onPress={() =>
                        navigation.navigate('Biology tm')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> BIOLOGY-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='PHYSCICAL SCIENCE-EM' onPress={() =>
                        navigation.navigate('Physics em')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> PHYSCICAL SCIENCE-EM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='PHYSICAL SCIENCE-TM' onPress={() =>
                        navigation.navigate('Physics tm')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> PHYSCICAL SCIENCE-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='SOCIAL-TM' onPress={() =>
                        navigation.navigate('Social tm')} >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> SOCIAL-TM</Text>
                    </TouchableOpacity>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='SOCIAL-EM' onPress={() =>
                        navigation.navigate('Social em')}
                    >
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#5F939A' }}> SOCIAL-EM</Text>
                    </TouchableOpacity>
                </Card>

            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.LEADERBOARD]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

        </View>

    );
}

export default Videos;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cbb4d4'

    }

});