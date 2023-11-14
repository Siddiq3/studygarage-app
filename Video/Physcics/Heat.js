import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';
const Heat = () => {

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
                    <Button color='#5F939A' title='ఉష్ణం - ఉష్ణోగ్రత -1' onPress={() =>
                        Linking.openURL(`https://youtu.be/Bte-lkclZWk`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ఉష్ణం -ఉష్ణోగ్రత -2' onPress={() =>
                        Linking.openURL(` https://youtu.be/RwCr2vkUwh8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ఉష్ణం 3 ఉష్ణ బదిలీ, ఉష్ణ సమతాస్ధితి' onPress={() =>
                        Linking.openURL(`https://youtu.be/D7tXPd11rEM `)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='విశిష్టోష్ణం' onPress={() =>
                        Linking.openURL(`https://youtu.be/tiHQBk_0Nqg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ఘన పదార్థాల విశిష్టోష్ణం' onPress={() =>
                        Linking.openURL(` https://youtu.be/4xYXCw6UIfE`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='విశిష్టోష్ణం అనువర్తనాలు' onPress={() =>
                        Linking.openURL(` https://youtu.be/VgTYAUIOxuY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='మిశ్రమాల పద్దతి  సూత్రం' onPress={() =>
                        Linking.openURL(`https://youtu.be/1wp1ZcIQxPc`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='భాష్పీభవనము ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5ZUfi74MsXM`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='భాష్పీభవనం పై గాలి ప్రభావం –కృత్యం' onPress={() =>
                        Linking.openURL(`https://youtu.be/PkCFR4U4stc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='సాంద్రీకరణము' onPress={() =>
                        Linking.openURL(`https://youtu.be/Ej0o_JEv27Y`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='మరగడం' onPress={() =>
                        Linking.openURL(`https://youtu.be/ikrg_pCVAHY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ద్రవీభవనం ఘనీభవనం' onPress={() =>
                        Linking.openURL(`https://youtu.be/gRdPXolCai0`)}>
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
export default Heat;