import { View} from 'react-native';
import React from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";


const Mathep8 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1e8vigJfd0hB48-58TuZnFLgA46l2BvlK/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathep8;
