import React, { useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/1783193953';

const Nsee = ({ navigation }) => {

    return (

        <View style={styles.container}>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='1 Nutrition ' onPress={() =>
                        Linking.openURL(`https://youtu.be/EjuRUvDDa0U`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='2 Respiration ' onPress={() =>
                        Linking.openURL(`https://youtu.be/wizRGgIVdi4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 3 Transportation ' onPress={() =>
                        Linking.openURL(`https://youtu.be/APAIKgRSDho`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='4 Excretion ' onPress={() =>
                        Linking.openURL(`https://youtu.be/fd-Vgc73VRQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='5 Coordination ' onPress={() =>
                        Linking.openURL(`https://youtu.be/mdFM5zFCyeY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='6 Reproduction ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Arrg1wvXWgI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='7 Coordination in Life Processes ' onPress={() =>
                        navigation.navigate('coordinations')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='8 Heredity ' onPress={() =>
                        Linking.openURL(`https://youtu.be/CsKDXDYYwTI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 9 Our Environment ' onPress={() =>
                        navigation.navigate('environment')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='10 Natural Resources ' onPress={() =>
                        navigation.navigate('natural')}>
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

export default Nsee;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});