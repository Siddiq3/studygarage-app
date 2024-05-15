import React, { useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';
const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';
const Socialee = ({ navigation }) => {

    return (

        <View style={styles.container}>

            <Text style={{ fontSize: 40, textAlign: 'center' }}> UPLOADED SHORTLY...</Text>
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

export default Socialee;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});