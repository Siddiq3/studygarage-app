import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Envi = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="our environment -1"
                        onPress={() => Linking.openURL("https://youtu.be/tmt7pt7ALMo")}
                    />
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="our environment -2"
                        onPress={() => Linking.openURL("https://youtu.be/VjCI2eZSkxE")}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Envi;
