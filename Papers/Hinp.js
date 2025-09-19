import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Hinp = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/18Ri6hvuOPYQckpKQsbf43UMBGUjskZC5/view?usp=sharing`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Hinp;
