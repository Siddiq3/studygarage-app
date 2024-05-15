import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Plane = () => {

    return (
        <View>

            <ScrollView>


                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='సమతలాల వద్ద కాంతి వక్రీభవనం' onPress={() =>
                        Linking.openURL(`https://youtu.be/VxVvCg_l9FI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Refractive index (TM)' onPress={() =>
                        Linking.openURL(`https://youtu.be/u_CKOlgpKJY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Refraction through a semicircular glass slab(TM)' onPress={() =>
                        Linking.openURL(`https://youtu.be/dI6GKhzyyAo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Total international refraction ' onPress={() =>
                        Linking.openURL(`https://youtu.be/508w7480iyk`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Applications of Total international refraction' onPress={() =>
                        Linking.openURL(`https://youtu.be/v5U4gqe70mA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='పార్శ్వ విస్థాపనం - నిలువు విస్థాపనం' onPress={() =>
                        Linking.openURL(`https://youtu.be/NZgCikFV6EM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='సంపూర్ణాంతర పరావర్తనం' onPress={() =>
                        Linking.openURL(`https://youtu.be/-8837612hcw`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='కాంతి వక్రీభవనం సమస్యలు' onPress={() =>
                        Linking.openURL(`https://youtu.be/o--6HX7A2kY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='1 కాంతి వక్రీభవనం పై బిట్స ' onPress={() =>
                        Linking.openURL(` https://youtu.be/Z2PMAvL9XlE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='2.కాంతి వక్రీభవనం పై బిట్స ' onPress={() =>
                        Linking.openURL(`https://youtu.be/GlCF6CQLpxk`)}>
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
export default Plane;