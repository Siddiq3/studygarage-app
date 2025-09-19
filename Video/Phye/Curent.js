import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Curent = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5pYJsiTA0xc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/sp7HKJnPCOc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/8J-VXT8z_Ic`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Electric Current -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/MjEePoBxjMM`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Curent;
