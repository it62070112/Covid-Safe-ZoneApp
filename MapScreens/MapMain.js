// import React, { Component } from 'react';
// import { View, StyleSheet, Text, Dimensions, Platform, Alert, SafeAreaView, LogBox } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import firebase from "../database/firebase";
// import * as Location from 'expo-location';

// class Map extends Component {
//     constructor() {
//         super();
    
//         this.infoVaccineUserCollection = firebase.firestore().collection("infoVaccineUser")
    
//         this.state = {
//             infoVaccine: [],
//             latitude: 0,
//             longitude: 0,
//             quantity: 0,
//             loadComplete: false,
//             myLatitude: 0,
//             myLongitude: 0,
//         };
//     }

//     getCollection = (querySnapshot) => {
//         const all_data = [];
//         querySnapshot.forEach((res) => {
//             const { age, gender, latitude, longitude, name, quantity, vaccinationPlace, vaccineBrandFirstDose, vaccineBrandSecondDose, vaccineBrandThirdDose } = res.data();
//             all_data.push({
//                 key: res.id,
//                 age,
//                 gender,
//                 latitude,
//                 longitude,
//                 name,
//                 quantity,
//                 vaccinationPlace,
//                 vaccineBrandFirstDose,
//                 vaccineBrandSecondDose,
//                 vaccineBrandThirdDose,
//             });
//         });
//         console.log("all_data_Map : ", all_data);
//         all_data.map((item, index) => {
//             this.setState({
//                 latitude: item.latitude,
//                 longitude: item.longitude,
//                 quantity: item.quantity,
//                 gender: item.gender,
//                 vaccineBrandFirstDose: item.vaccineBrandFirstDose,
//                 vaccineBrandSecondDose: item.vaccineBrandSecondDose,
//                 vaccineBrandThirdDose: item.vaccineBrandThirdDose,
//             })
//         })
//         this.setState({
//             infoVaccine: all_data,
//             loadComplete: true,
//         })
//         console.log(this.state.latitude)
//         console.log(this.state.longitude)
//         console.log(this.state.loadComplete)
//         LogBox.ignoreAllLogs();
//     }

//     async componentDidMount() {
//         this.unsubscribe = this.infoVaccineUserCollection.onSnapshot(this.getCollection);
//             let { status } = await Location.requestForegroundPermissionsAsync();
//             if (status !== 'granted') {
//                 console.log('Permission to access location was denied')
//                 return;
//             }
//             let location = await Location.getCurrentPositionAsync({});
//             this.setState({
//                 myLatitude: location.coords.latitude,
//                 myLongitude: location.coords.longitude,
//             })
//             console.log(this.state.myLatitude)
//             console.log(this.state.myLongitude)
//     }

//     componentWillUnmount() {
//         this.unsubscribe();
//     }
//     render() {
//         return (
//             <View style={styles.container}>
//                 {
//                     this.state.loadComplete == true ?
//                         <MapView style={styles.map}
//                             initialRegion={{
//                                 latitude: this.state.latitude,
//                                 longitude: this.state.longitude,
//                                 latitudeDelta: 1,
//                                 longitudeDelta: 1,
//                             }}
//                             provider={PROVIDER_GOOGLE}
//                         >
//                             <Marker coordinate={{ latitude: this.state.myLatitude, longitude: this.state.myLongitude }} pinColor="blue">

//                                 {/* <Callout>
//                                     <Text>{ this.state.gender }</Text>
//                                     <Text>รับวัควีนแล้ว : { this.state.quantity } เข็ม</Text>
//                                     <Text>เข็มที่ 1 : { this.state.vaccineBrandFirstDose }</Text>
//                                     <Text>เข็มที่ 2 : { this.state.vaccineBrandSecondDose }</Text>
//                                     <Text>เข็มที่ 3 : { this.state.vaccineBrandThirdDose }</Text>
//                                 </Callout>                                 */}
                            
//                             </Marker>
//                         {
//                             this.state.infoVaccine.map((item, index) => {
//                                 return (
//                                     <Marker coordinate={{ latitude: item.latitude, longitude: item.longitude }}>
//                                         <MaterialCommunityIcons name="human-handsdown" size={35} color="#229954" />
//                                     </Marker> 
//                                 )
//                                 // return (
//                                 //     <Circle
//                                 //         center={{ latitude: item.latitude, longitude: item.longitude }}
//                                 //         radius={5000}
//                                 //         fillColor="#52BE80"ห
//                                 //     />
//                                 // )
//                             })
//                         }
//                         {/* <Marker coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}></Marker> */}
//                         </MapView>
//                     :
//                     null
//                 }
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff'
//     },
//     map: {
//         width: Dimensions.get('window').width,
//         height: Dimensions.get('window').height,
//     }
// });

// export default Map;

import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, Alert, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LatLong } from './LatLong';
import { useSelector } from "react-redux";

class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            test_props : {
              lat: 13,
              long: 100,
            },
        }
    }
    
    setProps = () => {
        //useSelector section
        const latitude = useSelector((state) => state.LatLong.lat)
        const longitude = useSelector((state) => state.LatLong.long)
        useEffect(() => {
            this.setState({
                test_props : {
                  lat: latitude,
                  long: longitude,
                },
            })
        }, [])
        return null;
    }

    render() {
        return (
            <View style={styles.container}>
                <this.setProps />
                {/* <Text>geo.lat {this.state.test_props.lat}</Text>
                <Text>geo.long {this.state.test_props.long}</Text> */}
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.test_props.lat,
                        longitude: this.state.test_props.long,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={{
                        latitude: this.state.test_props.lat,
                        longitude: this.state.test_props.long
                    }}>
                        {/* <MaterialCommunityIcons name="home" size={45} color="#2958D1" /> */}
                        {/* <Callout>
                            <Text>Female</Text>
                            <Text>Callout TEXT</Text>
                            <Text>Callout TEXT</Text>
                        </Callout> */}
                    </Marker>

                    {/* <Circle
                        center={{ latitude: 14.0208391, longitude: 100.52502759999993 }}
                        radius={500}
                        fillColor="rgb(169, 223, 191)"
                    /> */}
                    
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * (8 / 10),
    }
});

export default Map;