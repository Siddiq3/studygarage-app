import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Eye = () => {

    return (
        <View>
            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='LEAST DISTANCE OF DISTINCT VISION ' onPress={() =>
                        Linking.openURL(`https://youtu.be/3YqtlNgYGZI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' STRUCTURE OF HUMAN EYE' onPress={() =>
                        Linking.openURL(`https://youtu.be/PjmFFEBuP6Y`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' MYOPIA - EYE DEFECT ' onPress={() =>
                        Linking.openURL(`https://youtu.be/C1Kv2eXEVZI`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' HYPERMETROPIA - PRESBYOPIA' onPress={() =>
                        Linking.openURL(`https://youtu.be/Srtj5n4ykO4`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='REFRACTIVE INDEX OF A PRISM ' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZrsmNiLBcyE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='DISPERSION OF LIGHT THROUGH A PRISM ' onPress={() =>
                        Linking.openURL(`https://youtu.be/5ROQXdAvv_I`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='RAINBOW FORMATION ' onPress={() =>
                        Linking.openURL(`https://youtu.be/NHY6HvUh120`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' SCATTERING OF LIGHT' onPress={() =>
                        Linking.openURL(`https://youtu.be/wvxqh0imjuA`)}>
                    </Button>
                </Card>
            </ScrollView>
            </View>
    );
}

export default Eye;
