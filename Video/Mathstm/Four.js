import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Four = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' రెండు చరరాశులలో రెఖీయ సమీకరణాల జత | Introduction  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/gF1W6juT4hQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' రరెండు చరరాశులలో రెఖీయ సమీకరణాల జత | అభ్యాసం 4.1   ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Xp8pOFeCQO0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' రెండు చరరాశులలో రెఖీయ సమీకరణాల జత | అభ్యాసం 4.1 | Q.No.3 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ASIjnluKk8A`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Four;
