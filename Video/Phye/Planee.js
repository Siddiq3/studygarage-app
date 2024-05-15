import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Planee = () => {

    return (
        <View>


            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/TIkg7wzxc04`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/HqfdWe0FQeE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/Y24HXSUlwtQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-4' onPress={() =>
                        Linking.openURL(`https://youtu.be/mJWKw8Rg0CM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-5' onPress={() =>
                        Linking.openURL(`https://youtu.be/kVV8IMaYE5o`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-6' onPress={() =>
                        Linking.openURL(`https://youtu.be/G8q8rPyf0vA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTION OF LIGHT AT PLANE SURFACES PART-7' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZnkUZtWKLpg`)}>
                    </Button>
                </Card>
            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId2}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}

export default Planee;