import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import * as Location from 'expo-location';
//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const SplashPermission = () => {
    // const [location, setLocation] = useState([]);
    useEffect(() => {
        Alert.alert('Safe-ZoneApp Permission', 'Safe-ZoneApp ขออนุญาตใช้ GPS', [
            {
                text: 'Ask me later',
                onPress: (() => {
                    console.log('Ask me later location denied')
                }),
            },
            {
                text: 'Cancel',
                onPress: (() => {
                    console.log('Cancel location denied')
                }),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: (() => {
                    getLocation()
                }),
            }
        ])
    }, []);

    async function getLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log("status : " + status)
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        // setLocation(location);
        // console.log("status : " + status)
        console.log(location.coords.latitude)
        console.log(location.coords.longitude)
    }

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
            
            {/* <Text style={styles.titleText}>COVID-19</Text>
            <Text style={styles.titleText}>SAFE-ZONE</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#27AE60"
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'Kanit_700Bold',
        color: '#fff'
    },
});

export default SplashPermission;
