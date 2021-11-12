import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, VirtualizedList } from "react-native";
//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import LineChartCovid from "../components/LineChartCovid";
import DailyReport from "./DailyReport";
import SplashPermission from "../components/SplashPermission";

const Home = () => {
    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_600SemiBold,
        Kanit_700Bold,
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <SplashPermission />
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonDailyCovid}>
                    <Text style={styles.textButton}>DailyCovid</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDailyCovid}>
                    <Text style={styles.textButton}>Vaccine</Text>
                </TouchableOpacity>
            </View> */}
                <View style={styles.viewContainer}>
                    <DailyReport />
                </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: "#fff"
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'Kanit_700Bold',
    },
    buttonContainer: {
        // flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    buttonDailyCovid: {
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "#AF7AC5",
        padding: 10,
        width: 100,
        height: 50,
        margin: 5,
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
    },
    viewContainer: {
        flex: 5,
        
    }
});

export default Home;
