import React, { useState, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    View, 
    Button, 
    ScrollView, 
    Linking, 
    TouchableWithoutFeedback 
} from "react-native";
import { Card } from "react-native-shadow-cards";
import MrecAdComponent from "./MrecAdComponent";


const Ssc = ({ navigation }) => {
    const [questions, setQuestions] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getQuiz = async () => {
        try {
            setIsLoading(true);
            const url1 = 'https://siddiq3.github.io/Api/subject.json';
            const res = await fetch(url1);
            const data = await res.json();
            setQuestions(data.results[0]);
        } catch (error) {
            console.error("Error fetching data: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuiz();
    
        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('telugu ssc2023')}>
                        {isLoading 
                            ? <Text style={styles.loadingText}>Loading...</Text> 
                            : questions.sub1 && <Text style={styles.subjectText}>{decodeURIComponent(questions.sub1)}</Text>}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('hindi ssc2023')}>
                        {isLoading 
                            ? <Text style={styles.loadingText}>Loading...</Text> 
                            : questions.sub2 && <Text style={styles.subjectText}>{decodeURIComponent(questions.sub2)}</Text>}
                    </TouchableWithoutFeedback>
                </Card>

                <Card style={{ padding: 30, margin: 20 }}>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('english ssc2023')}>
                        {isLoading 
                            ? <Text style={styles.loadingText}>Loading...</Text> 
                            : questions.sub3 && <Text style={styles.subjectText}>{decodeURIComponent(questions.sub3)}</Text>}
                    </TouchableWithoutFeedback>
                </Card>
                      <MrecAdComponent />


                {/* Continue same structure for sub4, sub5, sub6, ... sub11 */}
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingText: {
        fontSize: 16,
        fontWeight: '500',
    },
    subjectText: {
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center',
    }
});

export default Ssc;
