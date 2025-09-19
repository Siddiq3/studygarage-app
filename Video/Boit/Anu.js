import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Anu = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Part-1' onPress={() =>
                        Linking.openURL(`https://youtu.be/bfm_WKn9wg0`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Part-2' onPress={() =>
                        Linking.openURL(`https://youtu.be/JgdIsQz3ZHM`)}>
                    </Button>
                </Card>
            </ScrollView>
            </View>
    );
}

export default Anu;
