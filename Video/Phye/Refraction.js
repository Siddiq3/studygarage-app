import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';
//const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const Refraction = () => {

    return (
        <View>

            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/dvOhSlKUOD8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/q4c5Ll118no`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/s-i1TKd9vQE`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-4' onPress={() =>
                        Linking.openURL(`https://youtu.be/s-i1TKd9vQE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-5' onPress={() =>
                        Linking.openURL(`https://youtu.be/I3hFJqFmV2Q`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-6' onPress={() =>
                        Linking.openURL(`https://youtu.be/IhFYqR-zttY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-7' onPress={() =>
                        Linking.openURL(`https://youtu.be/36S5Laul7RI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-8' onPress={() =>
                        Linking.openURL(`https://youtu.be/MhDtm93utfk`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-9' onPress={() =>
                        Linking.openURL(`https://youtu.be/PxLD15N7A08`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT CURVED SURFACES PART-10' onPress={() =>
                        Linking.openURL(`https://youtu.be/Oo6smi4LyF4`)}>
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
export default Refraction;