import { Button, Linking, ScrollView, View} from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";


const Coordination = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Coordination"
                        onPress={() => Linking.openURL("https://youtu.be/ccG5cRzrBnc")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Responding in Stimuli"
                        onPress={() => Linking.openURL("https://youtu.be/P22FyYg432E")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Integrating pathways-Nervous"
                        onPress={() => Linking.openURL("https://youtu.be/iNAlZZhL96o")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Central Nervous System(CNS)"
                        onPress={() => Linking.openURL("https://youtu.be/VReqS33NE6Y")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Coordination without Nerves"
                        onPress={() => Linking.openURL("https://youtu.be/7B11Bhh3Brg")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Other Chemical Coordinators"
                        onPress={() => Linking.openURL("https://youtu.be/xfUEGZ2ebog")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Endocrine Glands"
                        onPress={() => Linking.openURL("https://youtu.be/0YdB0zCS5l4")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Autonomous Nervous System"
                        onPress={() => Linking.openURL("https://youtu.be/-4zv2eyyDf8")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Control Mechanisms in Plants"
                        onPress={() => Linking.openURL("https://youtu.be/gt4P1DPjIU8")}
                    />
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color="#5F939A"
                        title="Tropic and Nastic Movements in Plants"
                        onPress={() => Linking.openURL("https://youtu.be/WPmh9jnCvVw")}
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Coordination;
