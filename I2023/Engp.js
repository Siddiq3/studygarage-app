import { View} from 'react-native';
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";


const Engp1 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1gt-P7Pa5tSZTYq5f7Uqvo6YXyGUTJXIq/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Engp1;
