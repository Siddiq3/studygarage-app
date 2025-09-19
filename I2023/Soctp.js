import { View} from 'react-native';
import React, { useEffect } from "react";
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Soctp1 = () => {

    return (

        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: ` https://drive.google.com/file/d/1QBjzF5Yk_FZL4e7f5X_H5H6-J3u0A9vK/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Soctp1;
