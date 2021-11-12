import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MyNavigator from "./navigation/MyNavigator";
import MyChart from "./screens/MyChart";
import PickerProvince from "./components/PickerProvince";
import SplashPermission from "./components/SplashPermission";
import MyNavigator2 from "./navigation/MyNavigator2";
import LineChartCovid from "./components/LineChartCovid";

export default function App() {
  return (
    // <MyNavigator />
    <MyNavigator2 />
    // <LineChartCovid />
    // <SplashPermission />
    // <MyChart />
    // <PickerProvince />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
/////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet, Alert, PermissionsAndroid } from 'react-native';
// // import * as Permissions from 'expo-permissions';
// import * as Location from 'expo-location';
// export default function App() {
//     const [location, setLocation] = useState({});
//     const [errorMsg, setErrorMsg] = useState("");
//     const [isText, setText] = useState("Waiting..")

//     useEffect(() => {
//         Alert.alert('Safe-ZoneApp Permission', 'Safe-ZoneApp ขออนุญาตใช้ GPS', [
//             {
//                 text: 'Ask me later',
//                 onPress: (() => {
//                     console.log('Ask me later pressed')
//                     setText("You pressed Ask me later location denied")
//                 }),
//             },
//             {
//                 text: 'Cancel',
//                 onPress: (() => {
//                     console.log('Cancel Pressed')
//                     setText("You pressed Cancel location denied")
//                 }),
//                 style: 'cancel',
//             },
//             {
//                 text: 'OK',
//                 onPress: (() => getLocation()),
//             }
//         ])
//     }, []);

//     async function getLocation() {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             setErrorMsg('Permission to access location was denied');
//             return;
//         }
//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//         setText(JSON.stringify(location));
//     }

//     // let text = 'Waiting..';
//     // if (errorMsg) {
//     //     text = errorMsg;
//     // } else if (location) {
//     //     text = JSON.stringify(location);
//     // }

//     return (
//         <View style={styles.container}>
//             <Text style={{ fontSize: 18 }}>{isText}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
// });