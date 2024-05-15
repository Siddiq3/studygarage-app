import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Chemical = () => {

    return (
        <View>

            <ScrollView>


                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Davys Experiment  Lewis Dot Symbols' onPress={() =>
                        Linking.openURL(`https://youtu.be/0QpAI8R_WBc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electronic Theory Of Valence | Octet Rule | Cation  Anion' onPress={() =>
                        Linking.openURL(`https://youtu.be/cJn-y6SjUCs`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Ionic Bond | Formation Of NaCl, MgCl2, AlCl3 , Na2O | Factors' onPress={() =>
                        Linking.openURL(`https://youtu.be/d-jHhfBGoD8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Covalent Bond | Formation of F2, O2, N2, CH4, NH3 and H2O' onPress={() =>
                        Linking.openURL(`https://youtu.be/kVS2iPDhV8k`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='VSEPR Theory ' onPress={() =>
                        Linking.openURL(`https://youtu.be/81FGI-l2kDI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Valence Bond Theory  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/w3tgxAoWT1E`)}>
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
export default Chemical;