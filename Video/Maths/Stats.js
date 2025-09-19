import { Button, Linking, ScrollView, View } from 'react-native';
import React from "react";
import { Card } from "react-native-shadow-cards";

const Stats = () => {
    return (
        <View>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Statistics Part-1'
                        onPress={() =>
                            Linking.openURL(`https://youtu.be/0PFQw9-qvZU`)
                        }
                    />
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button
                        color='#5F939A'
                        title='Statistics Part-2'
                        onPress={() =>
                            Linking.openURL(`https://youtu.be/sFFRHSGoCWo`)
                        }
                    />
                </Card>
            </ScrollView>
        </View>
    );
};

export default Stats;
