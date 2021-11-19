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
import { useSelector, useDispatch } from "react-redux";
import { addLocation } from "../store/actions/LatLongAction";

const SplashPermission = () => {
    const [MyLatitude, setMyLatitude] = useState(0);
    const [MyLongitude, setMyLongitude] = useState(0);

    // const latitude = useSelector((state) => state.LatLong.lat)
    // const longitude = useSelector((state) => state.LatLong.long)
    
    const dispatch = useDispatch();

    // const addLocationHandler = () => {
    //     dispatch(addLocation(latitude, longitude))
    // }

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
        if (status !== 'granted') {
            console.log('Permission to access location was denied')
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setMyLatitude(location.coords.latitude)
        setMyLongitude(location.coords.longitude)

        dispatch(addLocation(location.coords.latitude, location.coords.longitude))

    }

    console.log(MyLatitude, MyLongitude)

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
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'Kanit_700Bold',
        color: '#fff'
    },
});

export default SplashPermission;


// import React, { Component } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import * as Location from 'expo-location';

// class SplashPermission extends Component {

//     state = {
//         latitude: null,
//         longitude: null
//     }

//     componentDidMount() {
//         Alert.alert('Safe-ZoneApp Permission', 'Safe-ZoneApp ขออนุญาตใช้ GPS', [
//             {
//                 text: 'Ask me later',
//                 onPress: (() => {
//                     console.log('Ask me later location denied')
//                 }),
//             },
//             {
//                 text: 'Cancel',
//                 onPress: (() => {
//                     console.log('Cancel location denied')
//                 }),
//                 style: 'cancel',
//             },
//             {
//                 text: 'OK',
//                 onPress: (() => {
//                     this.getLocation()
//                 }),
//             }
//         ])
//     }

//     async getLocation () {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         console.log("status : " + status)
//         if (status !== 'granted') {
//             console.log('Permission to access location was denied')
//             return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         this.setState({
//             latitude: location.coords.latitude,
//             longitude: location.coords.longitude
//         })
//         console.log(this.state.latitude)
//         console.log(this.state.longitude)
//     }

//     render() {
//         return (
//             <View style={styles.container}>
//                 {/* <Text style={styles.titleText}>COVID-19</Text>
//                 <Text style={styles.titleText}>SAFE-ZONE</Text> */}
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     titleText: {
//         fontSize: 50,
//         fontFamily: 'Kanit_700Bold',
//         color: '#fff'
//     },
// });

// export default SplashPermission;