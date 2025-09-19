import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Electro = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='1. Electromagnetism - 1 | Oersted experiment' onPress={() =>
                        Linking.openURL(`https://youtu.be/wai3u_KF8Mo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electromagnetism - 2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/R2ip2nfJzhc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electromagnetism - 3 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/C2hxqVy70XA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electromagnetism - 4 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/DdJLvTEpK18`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electromagnetism -5 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QsIyecP_980`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electromagnetism - 6 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5UyHDRN-iSo`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Electro;
