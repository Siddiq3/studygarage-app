import { Text, Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Amlalu = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  ఆమ్లాలు -క్షారాలు - లవణాలు -1' onPress={() =>
                        Linking.openURL(`https://youtu.be/tOC5HCdmrBc`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/li7P9IaH5ZE`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -3 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/CKwHmTIXnpM`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='ఆమ్లాలు -క్షారాలు - లవణాలు -4' onPress={() =>
                        Linking.openURL(`https://youtu.be/JoMgwGmTIN8`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' ఆమ్లాలు -క్షారాలు - లవణాలు -5 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Mo1h1q6lGo8`)}>
                    </Button>

                </Card>

            </ScrollView>
            </View>
    );
}

export default Amlalu;
