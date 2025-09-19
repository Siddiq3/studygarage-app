import { View} from 'react-native';
import React, { useEffect } from "react";
import MrecAdComponent from "../MrecAdComponent";
import WebView from 'react-native-webview';


const Materialmaths = () => {

    return (

        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1TTLNhax5htw8VbKQgxvCvqoh4jO_ooZD/view?usp=sharing`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Materialmaths;
