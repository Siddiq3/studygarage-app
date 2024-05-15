import React, { useEffect } from "react";
import { View, Text, Button, ScrollView, StyleSheet, Linking } from "react-native";
import { Card } from "react-native-shadow-cards";
import { TestIds, GAMBannerAd, BannerAdSize, } from 'react-native-google-mobile-ads';

const adUnitId1 = __DEV__ ? TestIds.GAM_BANNER : 'ca-app-pub-3251781230941397/7465549093';

const Nste = ({ navigation }) => {

    return (

        <View style={styles.container}>

            <ScrollView>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>     Chapter Wise Video Explanation</Text>





                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='1.పోషణ – ఆహార సరఫరా వ్యవస్థ' onPress={() =>
                        Linking.openURL(`https://youtu.be/EahhWsJU7uI`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='2. శ్వాసక్రియ –శక్తి ఉత్పాదక వ్యవస్థ' onPress={() =>
                        Linking.openURL(`https://youtu.be/WNq8teiva98`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='3. ప్రసరణ –పదార్థ రవాణా వ్యవస్థ' onPress={() =>
                        Linking.openURL(`https://youtu.be/L9RcaInYJxQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='4. విసర్జన –వ్యర్థాల తొలగింపు వ్యవస్థ' onPress={() =>
                        navigation.navigate('Chapter4')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='5. నియంత్రణ –సమన్వయ వ్యవస్థ' onPress={() =>
                        navigation.navigate('Chapter5')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='6. ప్రత్యుత్పత్తి –పునరుత్పాదక వ్యవస్థ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Arrg1wvXWgI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='7. జీవక్రియలలో సమన్వయం' onPress={() =>
                        navigation.navigate('Chapter7')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='8. అనువంశికత –తరతరాలలో వైవిధ్యాలు' onPress={() =>
                        navigation.navigate('Chapter8')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='9. మన పర్యావరణం –మన బాధ్యత' onPress={() =>
                        navigation.navigate('Chapter9')}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='10. సహజ వనరులు' onPress={() =>
                        navigation.navigate('Chapter10')}>
                    </Button>
                </Card>

            </ScrollView>
            <GAMBannerAd
                unitId={adUnitId1}
                sizes={[BannerAdSize.FULL_BANNER]}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    );
}

export default Nste;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F3E9',
    },

});