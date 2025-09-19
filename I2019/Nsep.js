import { View} from 'react-native';
import React from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Nsep4 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1WuHbqMOJhIEQVRu-U_99GzUy588UrLVE/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Nsep4;
