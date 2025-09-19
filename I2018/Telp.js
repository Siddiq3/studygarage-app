import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Telp6 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1Svh7q4e9L122wsltVwpOjcLXraLbZpaX/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Telp6;
