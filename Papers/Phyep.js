import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Phyep = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1xWGyyJmzLcKPikUEOPzEz9ACxjexp4_B/view?usp=sharing`,
                }}
        />
            <MrecAdComponent />
        </View>
    );
}

export default Phyep;
