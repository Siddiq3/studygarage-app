import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Five = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.1 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Zr4QqzQdKnc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/urh52q5xMtQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వర్గ సమీకరణాలు | అభ్యాసం 5.3 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QMESznH2NSY`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వర్గ సమీకరణాలు | అభ్యాసం 5.4 | మొత్తం ప్రాబ్లమ్స్  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/on3NofiI6cw`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Five;
