import React from "react";
import { View, Text, StyleSheet, Button, LogBox, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import firebase from "../database/firebase";
const AddInfoVaccine = () => {
    const latitude = useSelector((state) => state.LatLong.lat)
    const longitude = useSelector((state) => state.LatLong.long)

    var db = firebase.firestore();
    const createLocation = () => {
        return db.collection('location')
            .add({
                latitude: latitude,
                longitude: longitude
            })
            .then((res) => {
                LogBox.ignoreLogs(['Setting a timer for a long period of time'])
                Alert.alert("Add Lat/Long Success")   
            });
    }; 

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>AddInfoVaccine</Text>
            <Text>latitude : {latitude}</Text>
            <Text>longitude : {longitude}</Text>
            <Button title="Save" onPress={() => createLocation()}></Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"
    },
    titleText: {
        fontSize: 50,
        fontFamily: 'Kanit-bold',
    },
});

export default AddInfoVaccine;
