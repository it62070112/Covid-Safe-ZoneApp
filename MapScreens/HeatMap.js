import React from 'react';
import { View, StyleSheet, Text, Dimensions, FlatList } from 'react-native';
import MapView, { Circle, Marker, Callout } from 'react-native-maps';
// import MapView from 'react-native-map-clustering';
// import { LocationProvince } from '../Data/mockData';
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { GreenZone } from '../Data/mockData';

const HeatMap = () => {
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
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 14.887356614089544,
                    longitude: 100.83867581086284,
                    latitudeDelta: 15,
                    longitudeDelta: 14,
                }}
            >
                {GreenZone.map((val, index) => {
                    return (
                        <Marker
                            coordinate={{
                                latitude: val.latitude,
                                longitude: val.longitude
                        }}
                            key={index}
                            title={val.province}
                            pinColor={val.color}
                            // description={"HI FROM " + val.province}
                        >
                            <Callout>
                                <Text style={{ fontSize: 18, fontFamily: 'Kanit_600SemiBold' }}>{ val.province }</Text>
                                <Text style={styles.textDetail}>จำนวนประชากร : { val.population }</Text>
                                <Text style={styles.textDetail}>ฉีดวัคซีนไปแล้ว : { val.vaccination_percentage }</Text>
                            </Callout>
                        </Marker>
                        // <Circle 
                        //     center={{latitude: val.latitude, longitude: val.longitude}}
                        //     key={index}
                        //     title={val.province}
                        //     radius={30000}
                        //     fillColor={val.color}
                        //     description={"HI FROM " + val.province}
                        // />
                    )
                })}
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
    },
    textDetail: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 16
    }
});

export default HeatMap;