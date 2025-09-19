import { Button, Linking, ScrollView, View} from 'react-native';
import React, { useEffect } from "react";
import { Card } from "react-native-shadow-cards";


const Heet = () => {

    return (
        <View>

            <ScrollView>

                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Thermal Equilibrium-heat and Temperature' onPress={() =>
                        Linking.openURL(`https://youtu.be/sxhkJPtWwoE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Temperature and Kinetic Energy' onPress={() =>
                        Linking.openURL(`https://youtu.be/xNZrSRy27f8`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title=' Applications of Specific Heat Capacity' onPress={() =>
                        Linking.openURL(`https://youtu.be/XWRgFtqkUrE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Principle of Calorimeter' onPress={() =>
                        Linking.openURL(`https://youtu.be/TXDzfauOLNc`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Evaporation' onPress={() =>
                        Linking.openURL(`https://youtu.be/ZtShL8kNWfE`)}>
                    </Button>
                </Card>
                <Card style={{ padding: 30, margin: 20 }}>
                    <Button color='#5F939A' title='Evaporation Condensation' onPress={() =>
                        Linking.openURL(`https://youtu.be/cjSXiHIoibI`)}>
                    </Button>
                </Card>

            </ScrollView>
            </View>
    );
}

export default Heet;
