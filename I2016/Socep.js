import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from "react-native-webview";
import MrecAdComponent from "../MrecAdComponent";



const Socep11 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/15QUZHZTCeyZIOJneak-afO1KnvV7BFH6/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Socep11;
