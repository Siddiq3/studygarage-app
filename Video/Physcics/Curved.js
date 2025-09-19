import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Curved = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 1. refraction of light through curved surfaces–1(TM) ' onPress={() =>
                        Linking.openURL(`https://youtu.be/2_6MbwmOBmc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  2. refraction of light through curved surfaces –2 (TM)' onPress={() =>
                        Linking.openURL(`https://youtu.be/gM4_ajvCBIU`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' 2. refraction of light through curved surfaces – 3 (TM) ' onPress={() =>
                        Linking.openURL(`https://youtu.be/9uuTKHH_270`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  కటకాలపై కాంతి కిరణాల ప్రవర్తన  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/L0RjcZiGExw`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='  Types of lenses' onPress={() =>
                        Linking.openURL(`https://youtu.be/k7B4VhuITuA`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Image by curved surfaces - refraction formula for curved surfaces (TM )R ' onPress={() =>
                        Linking.openURL(`https://youtu.be/dqI6degWm2U`)}>
                    </Button>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Ray diagrams of lenses కటకాల కిరణ చిత్రాలు  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5jAuz71E9p4`)}>
                    </Button>
                </Card>

            </ScrollView>        </View>
    );
}

export default Curved;
