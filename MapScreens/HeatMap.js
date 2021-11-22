import React, { useState } from 'react';
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
    const [color, setColor] = useState('')
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
                    latitudeDelta: 2,
                    longitudeDelta: 18,
                }}
            >
                {GreenZone.map((val, index) => {
                    // const percent = ((val.num_people_vaccinated / val.population) * 100).toFixed(2);
                    // if (percent > 50 && percent <= 70) {
                    //     setColor('#229954')
                    // } else if (percent >= 50 && percent <= 60) {
                    //     setColor('#F4D03F')
                    // } else if (percent < 40 && percent < 50) {
                    //     setColor('#E67E22')
                    // } else {
                    //     setColor('#5DADE2')
                    // }
                    return (
                        <Marker
                            coordinate={{
                                latitude: val.latitude,
                                longitude: val.longitude
                        }}
                            key={index}
                            title={val.province}
                            pinColor={val.color}
                        >
                            <Callout>
                                <Text style={{ fontSize: 18, fontFamily: 'Kanit_600SemiBold' }}>{ val.province }</Text>
                                <Text style={styles.textDetail}>จำนวนประชากร : { val.population }</Text>
                                <Text style={styles.textDetail}>ฉีดวัคซีนไปแล้ว : { ((val.num_people_vaccinated / val.population) * 100).toFixed(2) + '%' }</Text>
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