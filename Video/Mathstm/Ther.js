import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Thre = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సంభావ్యత (Probability) | Introduction ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ji67SexJ_jo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సంభావ్యత(PROBABILITY) | అభ్యాసం 13.1 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/z8dYahQGkns`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  సంభావ్యత(PROBABILITY) | అభ్యాసం 13.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/fRrhHGyOht8`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Thre;
