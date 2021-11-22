import React, { Component } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, LogBox } from "react-native";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";
import { Feather } from '@expo/vector-icons'; 

class ShowInfoVacUser extends Component {
    constructor() {
        super();
    
        this.infoVaccineUserCollection = firebase.firestore().collection("infoVaccineUser")
    
        this.state = {
            infoVaccine: [],
        };
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
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
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
                                        <Text style={ styles.showText }>ชื่อ : {item.name}</Text>
                                        <Text style={ styles.showText }>อายุ : {item.age}</Text>
                                        <Text style={ styles.showText }>เพศ : {item.gender}</Text>
                                        <Text style={ styles.showText }>จำนวนโดส : {item.quantity}</Text>
                                        <Text style={ styles.showText }>เข็มที่ 1 : {item.vaccineBrandFirstDose}</Text>
                                        <Text style={ styles.showText }>เข็มที่ 2 : {item.vaccineBrandSecondDose}</Text>
                                        <Text style={ styles.showText }>เข็มที่ 3 : {item.vaccineBrandThirdDose}</Text>
                                        <Text style={ styles.showText }>สถานที่ฉีดวัคซีน : {item.vaccinationPlace}</Text>
                                    </View>
                                )
                            }
                            // return (
                            //     <TouchableOpacity>
                            //         <ListItem key={ index } bottomDivider>
                            //             <ListItem.Content>
                            //                 <ListItem.Title>{ item.id }</ListItem.Title>
                            //                 <ListItem.Title>{ item.name }</ListItem.Title>
                            //                 <ListItem.Title>{ item.gpa }</ListItem.Title>
                            //             </ListItem.Content>
                            //         </ListItem>
                            //     </TouchableOpacity>
                            // )
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
        // fontFamily: "Kanit_400Regular",
        fontSize: 18
    }
});

export default ShowInfoVacUser;