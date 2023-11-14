import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";



import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MainStackNavigator1, ContactStackNavigator, MainStackNavigator2, } from "./StackNavigation";


const homeName = "10th class";

const videos = "Videos";
const share = "Latest Updates";


const Tab = createBottomTabNavigator();




function MyTabs() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        if (rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline';

                        }
                        else if (rn === share) {
                            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses';
                        }


                        else if (rn === videos) {
                            iconName = focused ? 'videocam' : 'videocam-outline';
                        }



                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'black',
                    inactiveTintColor: 'black',

                    labelStyle: { paddingBottom: 10, fontSize: 10 },
                    style: { padding: 10, height: 70, backgroundColor: '#ADA2FF' }
                }}>

                <Tab.Screen name={homeName} component={MainStackNavigator1} options={{ headerShown: false }} />

                <Tab.Screen name={videos} component={ContactStackNavigator} options={{ headerShown: false }} />
                <Tab.Screen name={share} component={MainStackNavigator2} options={{ headerShown: false }} />


            </Tab.Navigator>
        </SafeAreaView>

    );
}
const ToabNavigation = () => {


    

        return (
            <SafeAreaProvider style={{ flex: 1 }}>
                <NavigationContainer independent={true}>
                    <MyTabs />

                </NavigationContainer>



            </SafeAreaProvider>


        );
     
}
export default ToabNavigation;