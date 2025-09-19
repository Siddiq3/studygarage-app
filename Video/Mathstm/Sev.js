import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Sev = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='నిరూపక రేఖా గణితం | అభ్యాసం 7.1  మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/vIxGwT8l4cI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' నిరూపక రేఖా గణితం | అభ్యాసం 7.2 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/MiBBBMNcNgY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' నిరూపక రేఖా గణితం | అభ్యాసం 7.3 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/NjB1bpRZOPw`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Sev;
