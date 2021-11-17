import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, FlatList } from "react-native";
import MapView, { Circle, Marker, Callout } from 'react-native-maps';
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { HospitalLocation } from "../Data/mockData";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from "react-native-elements/dist/buttons/Button";
import * as Location from 'expo-location';

const HospitalMap = () =>  {
    let lat_geo = 13;
    let long_geo = 100;

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
        // fetch(movie_url)
        //     .then((response) => response.json())
        //     .then((json) => setData(json.movies))
        //     .catch((error => console.log(error)))
        setData([])
        for (let i=0; i<HospitalLocation.length; i++) {
            // let movie_url = (
            //     'https://reactnative.dev/movies.json'
            // );
            let routes_url = (
                'https://maps.googleapis.com/maps/api/'
                + 'directions/json?'
                + 'origin='
                + HospitalLocation[i].latitude
                + ','
                + HospitalLocation[i].longitude
                + '&destination=13.725816541961574,100.64163781801308'
                + '&key=AIzaSyBDAbqYFsZYkYVPkja-T6YCDFHkgR-YJtc'
            );
            // let movie_item = ''
            fetch(routes_url)
                .then((response) => response.json())
                .then((json) => {
                    setData(prevItems => {
                        return [
                            ...prevItems,
                            {
                                id: HospitalLocation[i].id,
                                title: HospitalLocation[i].hospitalName,
                                distance: json.routes[0].legs[0].distance.value / 1000
                            },
                        ];
                    })
                })
                .catch((error => console.log(error)))
            // setData(prevItems => {
            //     return [
            //         ...prevItems,
            //         {
            //             id: HospitalLocation[i].id,
            //             lat: HospitalLocation[i].latitude,
            //             lng: HospitalLocation[i].longitude,
            //             title: HospitalLocation[i].hospitalName
            //         },
            //     ];
            // })
        }
        console.log(data.length, '=', HospitalLocation.length)
        if (data.length == HospitalLocation.length) {
            let current_min = null;
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (i == 0) {
                    current_min = element.distance;
                }
                if (i != 0) {
                    if (current_min > element.distance) {
                        current_min = element.distance;
                    }
                }
                // console.log(JSON.stringify(element));
            }
            console.log('current_min: ' + current_min);
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                if (element.distance != current_min) {
                    // console.log(JSON.stringify(element));
                }
            }
            console.log('###');
        }
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = location.coords;
        lat_geo = text.latitude;
        long_geo = text.longitude;
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
            {/* <Text>{text.latitude}</Text>
            <Text>{text.longitude}</Text>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 18 }}>Hello HospitalMap Page</Text> */}
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 14.0208391,
                    longitude: 100.52502759999993,
                    latitudeDelta: 0.8,
                    longitudeDelta: 0.8,
                }}
            >
                {
                    HospitalLocation.map((val, index) => {
                        return (
                            <Marker
                                coordinate={{ latitude: val.latitude, longitude: val.longitude }}
                                key={index}
                                title={val.hospitalName}
                                >
                                <MaterialCommunityIcons name="hospital-marker" size={35} color="red" />
                            </Marker>
                        )
                    })
                }
                <Marker
                    coordinate={{
                        latitude: lat_geo,
                        longitude: long_geo
                    }}
                    title="home"
                    >
                    <MaterialCommunityIcons name="home" size={35} color="blue" />
                </Marker>
            </MapView>
            {/* <Text>
                Lat: {lat_geo}
            </Text>
            <Text>
                Long: {long_geo}
            </Text> */}
            {/* <Text>
                {data.length}: {JSON.stringify(data)}
            </Text> */}
            <FlatList
                data={data}
                renderItem={
                    ({item}) => (
                        <TouchableOpacity style={styles.listItem}>
                            <View style={styles.listItemView}>
                                <Text styles={styles.listItemText}>
                                    "{item.title}":
                                    ระยะทาง {item.distance} กม.
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * (3 / 5),
    },
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
        width: 500
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemText: {
        fontSize: 18,
    },
});

export default HospitalMap;