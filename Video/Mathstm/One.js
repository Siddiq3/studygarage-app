import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const One = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.1' onPress={() =>
                        Linking.openURL(`https://youtu.be/B48dmS6gIWQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.2' onPress={() =>
                        Linking.openURL(`https://youtu.be/gXa3Ua2kne4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.3' onPress={() =>
                        Linking.openURL(`https://youtu.be/ScIgeCvPgrY`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.4' onPress={() =>
                        Linking.openURL(`https://youtu.be/3tSWy34cdLU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='వాస్తవ సంఖ్యలు మొత్తం అభ్యాసం 1.5' onPress={() =>
                        Linking.openURL(`https://youtu.be/dyIzJfzymo8`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default One;
