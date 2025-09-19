import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Twve = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' త్రికోణమితి అనువర్తనాలు | ఊర్థ్వ మరియు నిమ్న కోణాలు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/dMrTryyTS18`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్  ' onPress={() =>
                        Linking.openURL(`త్రికోణమితి అనువర్తనాలు | అభ్యాసం 12.1 | మొత్తం ప్రాబ్లమ్స్`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Twve;
