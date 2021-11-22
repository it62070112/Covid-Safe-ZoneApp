// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// //fonts
// import {
//     Kanit_400Regular,
//     Kanit_500Medium,
//     Kanit_600SemiBold,
//     Kanit_700Bold,
// } from '@expo-google-fonts/kanit'
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// const SplashScreen = () => {
//     let [fontsLoaded] = useFonts({
//         Kanit_400Regular,
//         Kanit_500Medium,
//         Kanit_600SemiBold,
//         Kanit_700Bold,
//     })
//     if (!fontsLoaded) {
//         return <AppLoading />
//     }

//     return (
//         <View style={styles.container}>
//             <Text style={styles.titleText}>COVID-19</Text>
//             <Text style={styles.titleText}>SAFE-ZONE</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         // backgroundColor: "#27AE60",
//         // backgroundColor: '#47BAEA',
//         backgroundColor: '#48C9B0',
//         // backgroundColor: '#574EDA',
//         // backgroundColor: '#2E86C1'
//     },
//     titleText: {
//         fontSize: 50,
//         fontFamily: 'Kanit_700Bold',
//         color: '#fff'
//     },
// });

// export default SplashScreen;

import React, {useEffect, useRef} from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

const SplashScreen = (
    // {my_var}
) => {

    const progress = useSharedValue(0);
    const upperText = useSharedValue(0);
    const lowerText = useSharedValue(0);
    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value
        };
    }, [])
    const upperTextAnimation = useAnimatedStyle(() => { return {
        left: 200 * (1 - upperText.value)
    }; }, [])
    const lowerTextAnimation = useAnimatedStyle(() => { return {
        left: (200 * upperText.value) - 200
    }; }, [])

    useEffect(() => {
        console.log('splash welcoming screen created');
        progress.value = withTiming(1, { duration: 2000 });
        upperText.value = withTiming(1, { duration: 2000 });
        lowerText.value = withTiming(1, { duration: 2000});
        }, []);

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
            <Animated.View style={[
                {
                    // borderWidth: 1,
                    alignItems: "center",
                },
                reanimatedStyle
            ]}>
                <Animated.View style={[
                    {
                        // borderWidth: 1,
                    },
                    upperTextAnimation
                ]}>
                    <Text style={styles.titleText}>COVID-19</Text>
                </Animated.View>
                <Animated.View style={[
                    {
                        // borderWidth: 1,
                    },
                    lowerTextAnimation
                ]}>
                    <Text style={styles.titleText}>SAFE-ZONE</Text>
                </Animated.View>
            </Animated.View>
            {/* <Button title='proceed' onPress={() => {my_var()}} /> */}
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