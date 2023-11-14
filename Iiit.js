import React from "react";
import { View, Button, ScrollView, TouchableOpacity, Text } from "react-native";
import { Card } from "react-native-shadow-cards";




import { BannerAdSize, TestIds, BannerAd, } from 'react-native-google-mobile-ads';


const adUnitId1 = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2818388282601075/5259157113';








const Iiit = ({ navigation }) => {



    return (

        <View style={{ flex: 1 }} horizontal={false}>
            <ScrollView>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT SYLLABUS' onPress={() =>
                        navigation.navigate('syllabus')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT SYLLABUS</Text>
                    </TouchableOpacity>
                </Card>


                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT -Maths' onPress={() =>
                        navigation.navigate('im')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT-MATHAMATICS</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT Physics ' onPress={() =>
                        navigation.navigate('ip')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT Phyics</Text>
                    </TouchableOpacity>
                </Card>

                <Card style={{ padding: 5, margin: 15 }}>
                    <TouchableOpacity activeOpacity={1} color='#5F939A' title='IIIT Biology' onPress={() =>
                        navigation.navigate('ib')}
                    >
                        <Text style={{ textAlign: 'center', fontSize: 20 }}> IIIT Biology</Text>
                    </TouchableOpacity>
                </Card>





            </ScrollView>


            <BannerAd
                unitId={adUnitId1}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
}
export default Iiit;