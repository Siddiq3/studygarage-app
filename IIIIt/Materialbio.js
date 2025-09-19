import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Materialbio = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1lx8NkLDo2-GnzuYNRqDDWq4bGr59xleM/view?usp=sharing`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Materialbio;
