import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Two = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు ' onPress={() =>
                        Linking.openURL(`https://youtu.be/VEh9d5AwxSQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు అభ్యాసం 2.1 | Q.No. 1 to 4  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Y4lzAcdcBos`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు  అభ్యాసం 2.1 | Q.No. 5 to 8 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/uChF5W2nOrQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు అభ్యాసం 2.2 | మొత్తం ప్రాబ్లమ్స్' onPress={() =>
                        Linking.openURL(`https://youtu.be/Uo7f7bHAay0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు వెన్ చిత్రాలు' onPress={() =>
                        Linking.openURL(`https://youtu.be/YkJpj6cHr24`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు అభ్యాసం 2.3 | మొత్తం ప్రాబ్లమ్స్ ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Hv1_6p6I9Qs`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' సమితులు అభ్యాసం 2.4 | మొత్తం ప్రాబ్లమ్స్  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Wp-KLodfQ8o`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Two;
