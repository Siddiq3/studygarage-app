import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Soctp2 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `https://drive.google.com/file/d/1FKD8APXU5DHdxYgwVTYl7RVwP0tHQ6I7/view?usp=share_link`, }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Soctp2;
