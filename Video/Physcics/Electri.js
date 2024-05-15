import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";
import { View, ScrollView, Text, Linking, Button } from "react-native";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

//const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-2818388282601075/5259157113';
const adUnitId2 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/8642173042';

const Electri = () => {

    return (
        <View>

            <ScrollView>


                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 1 [ INTRODUCTION ] ' onPress={() =>
                        Linking.openURL(`https://youtu.be/qEzjCdLcVDg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 2 [ potential difference ] ' onPress={() =>
                        Linking.openURL(`https://youtu.be/mYTWcyXc5f8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 3 { బ్యాటరీ ఎలా పనిచేస్తుంది} ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZBpO9LQ6NGk`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  Electricity - 4 [ ohms law ](TM) ' onPress={() =>
                        Linking.openURL(`https://youtu.be/lyejdKoQTiE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  Electricity - 5 [ Limitations of ohms law ](TM)  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/4e0knmGySW0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  Electricity - 6 [ factors effecting resistance ](TM)' onPress={() =>
                        Linking.openURL(`https://youtu.be/o0DLpW8Z6o4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Electricity - 7 [ factors effecting resistance - 2 (TM)   ' onPress={() =>
                        Linking.openURL(`https://youtu.be/oE1RRquw0m0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Electricity - 8 [ series connection of resistances (TM)  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/UUVF2i_0my8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Electricity - 9 (TM)| parallel connections of resistances  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/TEXCkKfn-j8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 10 |10th PS(TM) | Kirchhoffs circuit Laws in  telugu ' onPress={() =>
                        Linking.openURL(`https://youtu.be/uzesYd7r_vg`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 11 (TM)  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/bT_hqQYJyG8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 12 (TM) | Electric power ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ht2ONhcktaE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electricity - 13 (TM) | Over lode ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QKnTDBCvQKw`)}>
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
export default Electri;