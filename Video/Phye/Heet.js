import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
//const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const Heet = () => {

    return (
        <View>

            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Thermal Equilibrium-heat and Temperature' onPress={() =>
                        Linking.openURL(`https://youtu.be/sxhkJPtWwoE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Temperature and Kinetic Energy' onPress={() =>
                        Linking.openURL(`https://youtu.be/xNZrSRy27f8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Applications of Specific Heat Capacity' onPress={() =>
                        Linking.openURL(`https://youtu.be/XWRgFtqkUrE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Principle of Calorimeter' onPress={() =>
                        Linking.openURL(`https://youtu.be/TXDzfauOLNc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Evaporation' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZtShL8kNWfE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Evaporation Condensation' onPress={() =>
                        Linking.openURL(`https://youtu.be/cjSXiHIoibI`)}>
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
export default Heet;