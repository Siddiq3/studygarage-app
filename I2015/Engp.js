import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Engp11 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1peNplugndm46N90A4tT8Hjm22XQGtMwn/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
            );
}

export default Engp11;
