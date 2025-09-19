import { View} from 'react-native';
import WebView from 'react-native-webview';
import MrecAdComponent from "../MrecAdComponent";



const Telp2 = () => {

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{
                    uri: `https://drive.google.com/file/d/1HhCODYQ6M8i6xLPhmljvc12NkB9uwcbp/view?usp=share_link`,
                }}
        />
        <MrecAdComponent/>
        </View>
    );
}

export default Telp2;
