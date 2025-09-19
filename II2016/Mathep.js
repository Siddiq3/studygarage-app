import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Mathep12 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1aVl5qCSmiy3yztk00V63vgbSiYvU8xkM/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathep12;
