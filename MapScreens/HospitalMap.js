import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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

const HospitalMap = () =>  {
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
            {/* <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 18 }}>Hello HospitalMap Page</Text> */}
            <MapView style={styles.map}
                initialRegion={{
                    latitude: 14.0208391,
                    longitude: 100.52502759999993,
                    latitudeDelta: 0.123,
                    longitudeDelta: 0.123,
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
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        fontFamily: 'Kanit_600SemiBold'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default HospitalMap;