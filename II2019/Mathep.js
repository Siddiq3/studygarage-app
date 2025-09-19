import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Mathep5 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1Q-RceEnjFgZCFNHeovyOOTTW4m1LcK0l/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathep5;
