import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const Magn = () => {

    return (
        <View>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='OERSTEDS EXPERIMENT' onPress={() =>
                        Linking.openURL(`https://youtu.be/uHBdiPx_1EA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Magnetic Field- field ' onPress={() =>
                        Linking.openURL(`https://youtu.be/yqV8EXhzoRs`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Magnetic Flux and Magnetic Flux density' onPress={() =>
                        Linking.openURL(`https://youtu.be/oPE5RjLzZSI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Magnetic Field Due To Current Carrying Long St. Wire' onPress={() =>
                        Linking.openURL(`https://youtu.be/wwu1UdPVTjg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Magnetic Field Due to Current Carrying Circular Coil' onPress={() =>
                        Linking.openURL(`https://youtu.be/sMs3jBAacIA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Solenoid' onPress={() =>
                        Linking.openURL(`https://youtu.be/QO6SvUB40pA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='RIGHT HAND RULE' onPress={() =>
                        Linking.openURL(`https://youtu.be/2Gg1Phu0_dc`)}>
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
export default Magn;