import React, { Component, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, Alert, SafeAreaView, LogBox } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LatLong } from './LatLong';
import { useSelector } from "react-redux";
import firebase from "../database/firebase";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

class Map extends Component {
    constructor(props){
        super(props)
        
        this.infoVaccineUserCollection = firebase.firestore().collection("infoVaccineUser")

        this.state = {
            infoVaccine: [],
            latitude: 0,
            longitude: 0,
            // vaccineBrandFirstDose: '',
            // vaccineBrandSecondDose: '',
            // vaccineBrandThirdDose: '',
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

    loadAssetsAsync = async () => {
        await Font.loadAsync({
          'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
          'Kanit-bold': require('../assets/fonts/Kanit-Bold.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    getCollection = (querySnapshot) => {
        const all_data = [];
        querySnapshot.forEach((res) => {
            const { age, gender, latitude, longitude, name, quantity, vaccinationPlace, vaccineBrandFirstDose, vaccineBrandSecondDose, vaccineBrandThirdDose } = res.data();
            all_data.push({
                key: res.id,
                age,
                gender,
                latitude,
                longitude,
                name,
                quantity,
                vaccinationPlace,
                vaccineBrandFirstDose,
                vaccineBrandSecondDose,
                vaccineBrandThirdDose,
            });
        });
        // all_data.map((item, index) => {
        //     this.setState({
        //         latitude: item.latitude,
        //         longitude: item.longitude,
        //         quantity: item.quantity,
        //         gender: item.gender,
        //         vaccineBrandFirstDose: item.vaccineBrandFirstDose,
        //         vaccineBrandSecondDose: item.vaccineBrandSecondDose,
        //         vaccineBrandThirdDose: item.vaccineBrandThirdDose,
        //     })
        // })
        // console.log("all_data_Map : ", all_data);
        this.setState({
            infoVaccine: all_data,
        })
        LogBox.ignoreAllLogs();
    }

    componentDidMount() {
        this.unsubscribe = this.infoVaccineUserCollection.onSnapshot(this.getCollection);
        this.loadAssetsAsync()
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                <this.setProps />
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: this.state.test_props.lat,
                        longitude: this.state.test_props.long,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    provider={PROVIDER_GOOGLE}
                >
                    {/* <Marker coordinate={{
                        latitude: this.state.test_props.lat,
                        longitude: this.state.test_props.long
                    }}>
                        <MaterialCommunityIcons name="human-handsdown" size={45} color="red" />
                    </Marker> */}

                    {
                        this.state.infoVaccine.map((item, index) => {
                            if (this.state.test_props.lat == item.latitude && this.state.test_props.long == item.longitude) {
                                return(
                                    <Marker coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }}
                                    key={index}
                                    >
                                        <MaterialCommunityIcons name="human-handsdown" size={45} color="#F92D2D" />
                                        <Callout>
                                            <View style={{ width: 200, paddingLeft: 5 }}>
                                                <Text style={{ fontSize: 18, fontFamily: 'Kanit_600SemiBold'}}>เพศ : { item.gender }</Text>
                                                <Text style={styles.textDetail}>รับวัควีนแล้ว : { item.quantity } เข็ม</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 1 : { item.vaccineBrandFirstDose }</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 2 : { item.vaccineBrandSecondDose }</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 3 : { item.vaccineBrandThirdDose }</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                )
                            }
                            else {
                                return (
                                    <Marker coordinate={{
                                        latitude: item.latitude,
                                        longitude: item.longitude
                                    }}
                                    key={index}
                                    >
                                        <MaterialCommunityIcons name="human-handsdown" size={45} color="#27AE60" />
                                        <Callout>
                                            <View style={{ width: 200, paddingLeft: 5 }}>
                                                <Text style={{ fontSize: 18, fontFamily: 'Kanit_600SemiBold'}}>เพศ : { item.gender }</Text>
                                                <Text style={styles.textDetail}>รับวัควีนแล้ว : { item.quantity } เข็ม</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 1 : { item.vaccineBrandFirstDose }</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 2 : { item.vaccineBrandSecondDose }</Text>
                                                <Text style={styles.textDetail}>เข็มที่ 3 : { item.vaccineBrandThirdDose }</Text>
                                            </View>
                                        </Callout>
                                    </Marker>
                                )    
                            }
                            // return (
                            //     <Marker coordinate={{
                            //         latitude: item.latitude,
                            //         longitude: item.longitude
                            //     }}
                            //     >
                            //         <MaterialCommunityIcons name="human-handsdown" size={45} color="green" />
                            //         <Callout>
                            //             <View style={{ width: 200, paddingLeft: 5 }}>
                            //                 <Text>เพศ : { item.gender }</Text>
                            //                 <Text>รับวัควีนแล้ว : { item.quantity } เข็ม</Text>
                            //                 <Text>เข็มที่ 1 : { item.vaccineBrandFirstDose }</Text>
                            //                 <Text>เข็มที่ 2 : { item.vaccineBrandSecondDose }</Text>
                            //                 <Text>เข็มที่ 3 : { item.vaccineBrandThirdDose }</Text>
                            //             </View>
                            //         </Callout>
                            //     </Marker>
                            //     // <Circle
                            //     //     center={{ latitude: item.latitude, longitude: item.longitude }}
                            //     //     radius={500}
                            //     //     fillColor="rgb(169, 223, 191)"
                            //     // />
                            // )
                        })
                    } 
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
    },
    textDetail: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 16
    }
});

export default Map;