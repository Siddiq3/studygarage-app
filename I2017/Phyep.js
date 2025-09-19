import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Phyp8 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/16YJseWvXbmvS-07bGviqO11KB3szfGuC/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Phyp8;
