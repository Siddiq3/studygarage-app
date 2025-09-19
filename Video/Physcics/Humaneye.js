import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Human = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='మానవుని కన్ను రంగుల ప్రపంచం -1  ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Q34ESPAJpWo`)}>
                    </Button>

                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం -2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/z6Y3PmITH8U`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం -3 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/StMfJHw1bfE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం -4 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/QfTz0QmVFz8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం -5 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/AdHNlgylk4E`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం Problmes-1 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/Rwz-ICUWScQ`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' మానవుని కన్ను రంగుల ప్రపంచం Problmes-2 ' onPress={() =>
                        Linking.openURL(`https://youtu.be/3Q9TIXViqi4`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Human;
