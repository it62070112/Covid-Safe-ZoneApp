import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, Alert } from 'react-native';
import MapView, { Marker, Circle, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import SplashPermission from '../components/SplashPermission';

export default function Map({ route }) {
    // console.log("route : ", route.params)
    return (
        <View style={styles.container}>
                {/* <SplashPermission /> */}
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 14.0208391,
                        longitude: 100.52502759999993,
                        latitudeDelta: 0.123,
                        longitudeDelta: 0.123,
                        // latitude: route.params.location_latitude,
                        // longitude: route.params.location_longitude,
                        // latitudeDelta: 0.123,
                        // longitudeDelta: 0.123,
                    }}
                >
                    {/* <Marker coordinate={{ latitude: route.params.location_latitude, longitude: route.params.location_longitude }}> */}
                    <Marker coordinate={{ latitude: 14.0208391, longitude: 100.52502759999993 }}>
                        <Callout>
                            <Text style={{ fontSize: 20 }}>Callout TEXT</Text>
                            <Text>Callout TEXT</Text>
                            <Text>Callout TEXT</Text>
                        </Callout>
                        {/* <MaterialCommunityIcons name="human" size={40} color="blue" /> */}
                        {/* <MaterialCommunityIcons name="human-greeting" size={35} color="blue" /> */}
                    </Marker>

                    {/* <Circle 
                        center={{latitude: route.params.location_latitude, longitude: route.params.location_longitude}}
                        radius={500}
                        fillColor="rgb(125, 206, 160)"
                    /> */}
                </MapView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});