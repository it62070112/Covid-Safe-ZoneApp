import React from "react";
import { View, Text, StyleSheet } from "react-native";
//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const SplashScreen = () => {
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
            <Text style={styles.titleText}>COVID-19</Text>
            <Text style={styles.titleText}>SAFE-ZONE</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#27AE60",
        // backgroundColor: '#47BAEA',
        backgroundColor: '#48C9B0',
        // backgroundColor: '#574EDA',
        // backgroundColor: '#2E86C1'
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'Kanit_700Bold',
        color: '#fff'
    },
});

export default SplashScreen;
