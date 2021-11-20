import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button, LogBox, TouchableOpacity } from 'react-native';
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
// import { Input } from 'react-native-elements';
import { addIcon } from "../store/actions/changeIconAction";

const AddInfoVaccine = () => {
    const latitude = useSelector((state) => state.LatLong.lat)
    const longitude = useSelector((state) => state.LatLong.long)

    const [nameFirstLast, setNameFirstLast] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [brandVaccine, setBrandVaccine] = useState("")
    const [numVaccine, setNumVaccine] = useState("")
    const [vaccinationPlace, setVaccinationPlace] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(null)
    const [disable, setDisable] = useState(true)

    const dispatch = useDispatch();

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
        if (age == "" || gender == "" || nameFirstLast == "" || numVaccine == "" || vaccinationPlace == "" || brandVaccine == "" ) {
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
                setSaveSuccess(true)
                setDisable(false)
                // dispatch(addIcon(saveSuccess))
            });
        }
    };

    dispatch(addIcon(saveSuccess))

    console.log("saveSuccess : ", saveSuccess)
    console.log("disable : ", disable)

    return (
        <View style={styles.container}>
            <Text style={styles.titleLogin}>กรอกข้อมูลการฉีดวัคซีน</Text>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='ชื่อ - นามสกุล'
                    placeholderTextColor='#566573'
                    onChangeText={(text) => setNameFirstLast(text)}
                    value={nameFirstLast}
                    editable={ disable }
                />

                <View style={styles.column2}>
                    <TextInput
                        style={styles.input2}
                        placeholder='อายุ'
                        placeholderTextColor='#566573'
                        onChangeText={(text) => setAge(text)}
                        value={age}
                        keyboardType="numeric"
                        autoCompleteType='off'
                        editable={ disable }
                    />
                    <Picker
                        selectedValue={gender}
                        onValueChange={(val) => setGender(val)}
                        style={styles.input2}
                        enabled={ disable }
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
                        enabled={ disable }
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
                        enabled={ disable }
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
                    placeholderTextColor='#566573'
                    onChangeText={(text) => setVaccinationPlace(text)}
                    value={vaccinationPlace}
                    autoCompleteType='off'
                    editable={ disable }
                />
                {
                    !saveSuccess ?
                    <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#52BE80', borderRadius: 10, justifyContent: 'center' }} onPress={() => createInfoVaccineUser()}>
                        <Text style={{ fontFamily: 'Kanit_600SemiBold', fontSize: 17, textAlign: 'center', color: '#fff' }}>บันทึก</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#E74C3C', borderRadius: 10, justifyContent: 'center', marginTop: 5 }} onPress={() => setDisable(true)}>
                        <Text style={{ fontFamily: 'Kanit_600SemiBold', fontSize: 17, textAlign: 'center', color: '#fff' }}>แก้ไข</Text>
                    </TouchableOpacity>
                    ? disable == true ?
                        <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#52BE80', borderRadius: 10, justifyContent: 'center' }} onPress={() => setDisable(false)}>
                            <Text style={{ fontFamily: 'Kanit_600SemiBold', fontSize: 17, textAlign: 'center', color: '#fff' }}>อัพเดตข้อมูล</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#E74C3C', borderRadius: 10, justifyContent: 'center', marginTop: 5 }} onPress={() => setDisable(true)}>
                            <Text style={{ fontFamily: 'Kanit_600SemiBold', fontSize: 17, textAlign: 'center', color: '#fff' }}>แก้ไข</Text>
                        </TouchableOpacity>
                    :
                    null
                }
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
        color: '#48586f',
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
        width: "100%",
        height: 50,
        padding: 15,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontFamily: "Kanit_400Regular",
        fontSize: 16
    },
    input2: {
        width: 185,
        height: 40,
        padding: 8,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontFamily: 'Kanit_400Regular',
        fontSize: 16
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
