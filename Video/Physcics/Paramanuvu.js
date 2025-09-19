import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Param = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='పరమాణు నిర్మాణం -1  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Q34ESPAJpWo`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' పరమాణు నిర్మాణం -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/rEsLnVMM_CI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='పరమాణు నిర్మాణం -1  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/_pefWesqcbc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' పరమాణు నిర్మాణం -1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ToTY38tzMkc`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Param;
