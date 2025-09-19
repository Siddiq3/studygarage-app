import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Socep10 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1GH9WFdXJkvFgKt4hYs3wu3_FH2JWCExJ/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Socep10;
