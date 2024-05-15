import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Curent = () => {

    return (
        <View>

            <ScrollView>



                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5pYJsiTA0xc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/sp7HKJnPCOc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/8J-VXT8z_Ic`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/MjEePoBxjMM`)}>
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
export default Curent;