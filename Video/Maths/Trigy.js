import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Trigy = () => {

    return (
        <View>

            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/523pD5Yl-sc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/pWubM5nGpxw`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-3' onPress={() =>
                        Linking.openURL(`https://youtu.be/FNc4ol3mQro`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Trigonometry Part-4' onPress={() =>
                        Linking.openURL(`https://youtu.be/kTq7bWJNx_8`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Trigy;
