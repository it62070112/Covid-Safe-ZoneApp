import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from "react-native";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";
import { Feather } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

class ShowInfoVacUser extends Component {
    constructor() {
        super();
    
        this.infoVaccineUserCollection = firebase.firestore().collection("infoVaccineUser")
    
        this.state = {
            infoVaccine: [],
        };
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
          'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
          'Kanit-bold': require('../assets/fonts/Kanit-Bold.ttf'),
          'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
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
        // console.log("all_data : ", all_data);
        this.setState({
            infoVaccine: all_data,
        })
        LogBox.ignoreAllLogs();
    }

    updateData = (MyKey) => {
        console.log("MyKey : ", MyKey)
        this.props.navigation.navigate("EditDataVac", { key: MyKey })
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
                <ScrollView>
                    {
                        this.state.infoVaccine.map(( item, index ) => {
                            if (this.props.route.params.nameUser == item.name) {
                                return (
                                    <View key={ index } style={{ width: '100%', backgroundColor: '#fff', borderRadius: 10, padding: 10 }}>
                                        <TouchableOpacity onPress={() => this.updateData(item.key)} style={{ alignItems: 'flex-end' }}>
                                            <Feather name="edit" size={24} color="black" />
                                        </TouchableOpacity>

                                        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Kanit-bold' }}>ชื่อ นามสกุล</Text>
                                        <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 5 }}>
                                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff', textAlign: 'center' }}>{item.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '49%' }}>
                                                <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Kanit-bold' }}>อายุ</Text>
                                                <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 5 }}>
                                                    <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff', textAlign: 'center' }}>{item.age}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '49%', marginLeft: 10 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Kanit-bold' }}>เพศ</Text>
                                                <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 5 }}>
                                                    <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff', textAlign: 'center' }}>{item.gender}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: 'Kanit-bold' }}>การับวัคซีน</Text>
                                        <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 10, marginBottom: 5 }}>
                                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff' }}>เข็มที่ 1 : {item.vaccineBrandFirstDose}</Text>
                                            {/* <Text style={{ fontSize: 18,color: '#fff' }}>{item.vaccineBrandFirstDose}</Text> */}
                                        </View>
                                        <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 10, marginBottom: 5 }}>
                                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff' }}>เข็มที่ 2 : {item.vaccineBrandSecondDose}</Text>
                                            {/* <Text style={{ fontSize: 18,color: '#fff' }}>{item.vaccineBrandFirstDose}</Text> */}
                                        </View>
                                        <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 10 }}>
                                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff' }}>เข็มที่ 3 : {item.vaccineBrandThirdDose}</Text>
                                            {/* <Text style={{ fontSize: 18,color: '#fff' }}>{item.vaccineBrandFirstDose}</Text> */}
                                        </View>

                                        <Text style={{ textAlign: 'center', fontSize: 18, fontSize: 18, fontFamily: 'Kanit-bold' }}>สถานที่ฉีดวัคซีน</Text>
                                        <View style={{ borderRadius: 10, backgroundColor: '#52BE80', padding: 5 }}>
                                            <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 18, color: '#Fff', textAlign: 'center' }}>{item.vaccinationPlace}</Text>
                                        </View>
                                    </View>
                                )
                            }
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    showText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff'
    }
});

export default ShowInfoVacUser;