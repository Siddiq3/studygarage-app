import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Mathtp1 = () => {

    return (

        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: ` https://drive.google.com/file/d/1W2T9qB4dTAV0eU3AC6CwMZcibzCCL5nk/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Mathtp1;
