import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Atom = () => {

    return (
        <View>

            <ScrollView>


                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/vdGtbBbtbRI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Mepat5glTMU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/Qv2RvBpkOx0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-4 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Is5ckLj-hWA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-5 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/sTE0YU8ntnY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QjEB6R-VPxc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Structure of Atom-1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/_2-0NUQ_dCM`)}>
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
export default Atom;