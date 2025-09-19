import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Materialphy = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1ofKsZ8JwDuwlavRtOnMjlooPZvw4bP0O/view?usp=sharing`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Materialphy;
