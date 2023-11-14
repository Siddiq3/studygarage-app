import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const Coordination = () => {

    return (
        <View>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />

            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Coordination' onPress={() =>
                        Linking.openURL(`https://youtu.be/ccG5cRzrBnc`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Responding in Stimuli' onPress={() =>
                        Linking.openURL(`https://youtu.be/P22FyYg432E`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Integrating pathways-Nervous' onPress={() =>
                        Linking.openURL(`https://youtu.be/iNAlZZhL96o`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Central Nervous System(CNS)' onPress={() =>
                        Linking.openURL(`https://youtu.be/VReqS33NE6Y`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Coordination without Nerves' onPress={() =>
                        Linking.openURL(`https://youtu.be/7B11Bhh3Brg`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Other Chemical Coordinators' onPress={() =>
                        Linking.openURL(`https://youtu.be/xfUEGZ2ebog`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Endocrine Glands' onPress={() =>
                        Linking.openURL(`https://youtu.be/0YdB0zCS5l4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Autonomous Nervous System' onPress={() =>
                        Linking.openURL(`https://youtu.be/-4zv2eyyDf8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Control Mechanisms in Plants' onPress={() =>
                        Linking.openURL(`https://youtu.be/gt4P1DPjIU8`)}>
                    </Button>
                </Card> <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Tropic and Nastic Movements in Plants' onPress={() =>
                        Linking.openURL(`https://youtu.be/WPmh9jnCvVw`)}>
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
export default Coordination;