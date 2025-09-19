import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Telp12 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1AToJC5JKGfHXkVPvtMfpINroA_takqLz/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Telp12;
