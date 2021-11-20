import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button, LogBox } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { Picker } from '@react-native-picker/picker';
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import firebase from "../database/firebase";
const AddInfoVaccine = () => {
    const latitude = useSelector((state) => state.LatLong.lat)
    const longitude = useSelector((state) => state.LatLong.long)

    const [nameFirstLast, setNameFirstLast] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [brandVaccine, setBrandVaccine] = useState("")
    const [numVaccine, setNumVaccine] = useState("")
    const [vaccinationPlace, setVaccinationPlace] = useState("")

    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_600SemiBold,
        Kanit_700Bold,
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }

    var db = firebase.firestore();
    const createInfoVaccineUser = () => {
        if (age == "" || gender == "" || nameFirstLast == "" || numVaccine == "" || vaccinationPlace == "" || vaccineBrand == "" ) {
            Alert.alert("กรุณากรอกข้อมูลก่อนกดปุ่มบันทึก")
        } else {
            return db.collection('infoVaccineUser')
            .add({
                age: age,
                gender: gender,
                latitude: latitude,
                longitude: longitude,
                name: nameFirstLast,
                quantity: numVaccine,
                vaccinationPlace: vaccinationPlace,
                vaccineBrand: brandVaccine
            })
            .then((res) => {
                LogBox.ignoreLogs(['Setting a timer for a long period of time'])
                Alert.alert("บันทึกข้อมูลสำเร็จ")
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleLogin}>กรอกข้อมูลการฉีดวัคซีน</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='ชื่อ - นามสกุล'
                    placeholderTextColor='black'
                    onChangeText={(text) => setNameFirstLast(text)}
                    value={nameFirstLast}
                />

                <View style={styles.column2}>
                    <TextInput
                        style={styles.input2}
                        placeholder='อายุ'
                        placeholderTextColor='black'
                        onChangeText={(text) => setAge(text)}
                        value={age}
                        keyboardType="numeric"
                        autoCompleteType='off'
                    />
                    <Picker
                        selectedValue={gender}
                        onValueChange={(val) => setGender(val)}
                        style={styles.input2}
                    >
                        <Picker.Item label='เพศ' value='0' />
                        <Picker.Item label="ชาย" value="ชาย" />
                        <Picker.Item label="หญิง" value="หญิง" />
                    </Picker>
                </View>

                <View style={styles.column2}>
                    <Picker
                        selectedValue={brandVaccine}
                        onValueChange={(val) => setBrandVaccine(val)}
                        style={styles.input2}
                    >
                        <Picker.Item label='ยี่ห้อวัคซีน' value='0' />
                        <Picker.Item label="Pfizer" value="Pfizer" />
                        <Picker.Item label="Moderna" value="Moderna" />
                        <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                        <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                        <Picker.Item label="Novavax" value="Novavax" />
                        <Picker.Item label="Sinovac" value="Sinovac" />
                        <Picker.Item label="Sinopharm" value="Sinopharm" />
                    </Picker>
                    <Picker
                        style={styles.input2}
                        selectedValue={numVaccine}
                        onValueChange={(val) => setNumVaccine(val)}
                    >
                        <Picker.Item label='จำนวนโดส' value='0' />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="มากกว่า 3" value="มากกว่า 3" />
                    </Picker>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder='สถานที่ฉีดวัคซีน'
                    placeholderTextColor='black'
                    onChangeText={(text) => setVaccinationPlace(text)}
                    value={vaccinationPlace}
                    autoCompleteType='off'
                />
                <Button title='บันทึก' color='green' onPress={() => createInfoVaccineUser()}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: "#ECCEF5",
    },
    column2: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    containerBtn: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    titleLogin: {
        fontSize: 22,
        textAlign: 'center',
        color: 'black',
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 30,
        fontFamily: 'Kanit_600SemiBold'
    },
    form: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: 30,
    },
    input: {
        width: 320,
        height: 50,
        padding: 15,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontFamily: "Kanit_400Regular"
    },
    input2: {
        width: 155,
        height: 40,
        padding: 8,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontFamily: 'Kanit_400Regular'
        // backgroundColor: "#ECCEF5",
    },
    button: {
        width: 325,
        height: 40,
        padding: 5,
        margin: 5,
        marginTop: 30,
        borderRadius: 4,
    },
    containerCheckbox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingLeft: 8,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    titleCheckbox: {
        margin: 8,
    },
    titleCheckbox2: {
        marginTop: 30,
        margin: 8,
    },

});

export default AddInfoVaccine;
