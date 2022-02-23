import React from "react";
import { View, StyleSheet } from "react-native";
//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import DailyReport from "./DailyReport";
import SplashPermission from "../components/SplashPermission";

const Home = ({ navigation }) => {
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
    viewContainer: {
        flex: 5,
        
    }
});

export default Home;
