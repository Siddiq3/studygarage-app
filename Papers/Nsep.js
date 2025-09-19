import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Nsep = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1ruDQgWISEESpgUqUV31Az9ffZ2cK3gHj/view?usp=sharing`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Nsep;
