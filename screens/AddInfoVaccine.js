import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert, TextInput, LogBox, TouchableOpacity, ScrollView, Platform, Linking, SafeAreaView } from 'react-native';
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
import { addIcon } from "../store/actions/changeIconAction";

const AddInfoVaccine = ({ navigation, route }) => {
    const latitude = useSelector((state) => state.LatLong.lat)
    const longitude = useSelector((state) => state.LatLong.long)

    const [nameFirstLast, setNameFirstLast] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [brandVaccine, setBrandVaccine] = useState("")
    const [vaccineBrandFirstDose, setVaccineBrandFirstDose] = useState("")
    const [vaccineBrandSecondDose, setVaccineBrandSecondDose] = useState("")
    const [vaccineBrandThirdDose, setVaccineBrandThirdDose] = useState("")
    const [numVaccine, setNumVaccine] = useState("")
    const [vaccinationPlace, setVaccinationPlace] = useState("")
    const [saveSuccess, setSaveSuccess] = useState(null)
    const [disable, setDisable] = useState(true)
    const [allData, setAllData] = useState([])
    const [CertificateCode, setCertificateCode] = useState('')
    const [CertificateNo, setCertificateNo] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        getData()
        setCertificateCode(route.params.Certificate_Code.slice(52))
        console.log('CertificateCode : ', route.params.Certificate_Code.slice(52))
    }, [])

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
        if (CertificateNo == "" || age == "" || gender == "0" || nameFirstLast == "" || numVaccine == '0' || vaccinationPlace == "" || vaccineBrandFirstDose == "" || vaccineBrandSecondDose == "" || vaccineBrandThirdDose == "") {
            Alert.alert("กรุณากรอกข้อมูลก่อนกดปุ่มบันทึก")
        } else {
            return db.collection('infoVaccineUser')
            // return db.collection('infoVaccineUserAuthen')
                .add({
                    age: age,
                    gender: gender,
                    latitude: latitude,
                    longitude: longitude,
                    name: nameFirstLast,
                    quantity: numVaccine,
                    vaccinationPlace: vaccinationPlace,
                    vaccineBrandFirstDose: vaccineBrandFirstDose,
                    vaccineBrandSecondDose: vaccineBrandSecondDose,
                    vaccineBrandThirdDose: vaccineBrandThirdDose,
                    CertificateCode: CertificateCode,
                    CertificateNo: CertificateNo
                })
                .then((res) => {
                    // Alert.alert("บันทึกข้อมูลสำเร็จ")
                    navigation.navigate("ShowInfoVacUser", { nameUser: nameFirstLast })
                    setSaveSuccess(true)
                });
        }
        setDisable(true)
    };

    function getData() {
        const all_data = [];
        firebase.firestore().collection('infoVaccineUser').get().then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                const { age, gender, latitude, longitude, name, quantity, vaccinationPlace, vaccineBrand } = snapshot.data();
                all_data.push({
                    key: snapshot.id,
                    age,
                    gender,
                    latitude,
                    longitude,
                    name,
                    quantity,
                    vaccinationPlace,
                    vaccineBrand,
                    CertificateNo,
                    CertificateCode
                })
                setAllData(all_data)
            })
            // console.log(all_data)
            // console.log(all_data.length)
            // all_data.map((item, index) => {
            //     console.log(item.CertificateNo)
            // })
        })
    }

    LogBox.ignoreLogs(['Setting a timer for a long period of time'])
    dispatch(addIcon(saveSuccess))

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text style={styles.titleLogin}>กรอกข้อมูลการฉีดวัคซีน</Text>
                <Text
                        style={styles.hyperlinkStyle}
                            onPress={() => {
                                Linking.openURL(route.params.Certificate_Code);
                        }}>
                        See your Certificate Serial No.
                </Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='Certificate Serial No. 10 หลัก'
                        placeholderTextColor='#566573'
                        onChangeText={(text) => setCertificateNo(text)}
                        value={CertificateNo}
                        editable={disable}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='ชื่อ - นามสกุล'
                        placeholderTextColor='#566573'
                        onChangeText={(text) => setNameFirstLast(text)}
                        value={nameFirstLast}
                        editable={disable}
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
                            editable={disable}
                        />
                        <Picker
                            selectedValue={gender}
                            onValueChange={(val) => setGender(val)}
                            style={styles.input2}
                            enabled={disable}
                        >
                            <Picker.Item label='เพศ' value='-' />
                            <Picker.Item label="ชาย" value="ชาย" />
                            <Picker.Item label="หญิง" value="หญิง" />
                        </Picker>
                    </View>

                    <View style={styles.column2}>
                        <Picker
                            style={styles.input2}
                            selectedValue={numVaccine}
                            onValueChange={(itemValue, itemIndex) => setNumVaccine(itemValue)}
                        >
                            <Picker.Item label='จำนวนโดส' value='-' />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            {/* <Picker.Item label="มากกว่า 3" value="มากกว่า 3" /> */}
                        </Picker>
                        <Picker
                            selectedValue={vaccineBrandFirstDose}
                            onValueChange={(itemValue, itemIndex) => setVaccineBrandFirstDose(itemValue)}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 1' value='-' />
                            <Picker.Item label="Pfizer" value="Pfizer" />
                            <Picker.Item label="Moderna" value="Moderna" />
                            <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                            <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                            <Picker.Item label="Novavax" value="Novavax" />
                            <Picker.Item label="Sinovac" value="Sinovac" />
                            <Picker.Item label="Sinopharm" value="Sinopharm" />
                            <Picker.Item label="-" value="-" />
                        </Picker>
                    </View>

                    <View style={styles.column2}>
                        <Picker
                            selectedValue={vaccineBrandSecondDose}
                            onValueChange={(itemValue, itemIndex) => setVaccineBrandSecondDose(itemValue)}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 2' value='-' />
                            <Picker.Item label="Pfizer" value="Pfizer" />
                            <Picker.Item label="Moderna" value="Moderna" />
                            <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                            <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                            <Picker.Item label="Novavax" value="Novavax" />
                            <Picker.Item label="Sinovac" value="Sinovac" />
                            <Picker.Item label="Sinopharm" value="Sinopharm" />
                            <Picker.Item label="-" value="-" />
                        </Picker>
                        <Picker
                            selectedValue={vaccineBrandThirdDose}
                            onValueChange={(itemValue, itemIndex) => setVaccineBrandThirdDose(itemValue)}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 3' value='-' />
                            <Picker.Item label="Pfizer" value="Pfizer" />
                            <Picker.Item label="Moderna" value="Moderna" />
                            <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                            <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                            <Picker.Item label="Novavax" value="Novavax" />
                            <Picker.Item label="Sinovac" value="Sinovac" />
                            <Picker.Item label="Sinopharm" value="Sinopharm" />
                            <Picker.Item label="-" value="-" />
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='สถานที่ฉีดวัคซีน'
                        placeholderTextColor='#566573'
                        onChangeText={(text) => setVaccinationPlace(text)}
                        value={vaccinationPlace}
                        autoCompleteType='off'
                        editable={disable}
                    />
                        <TouchableOpacity style={{ width: '100%', height: 30, backgroundColor: '#52BE80', borderRadius: 10, justifyContent: 'center', marginBottom: 70, marginTop: -10 }} onPress={() => createInfoVaccineUser()}>
                            <Text style={{ fontFamily: 'Kanit_600SemiBold', fontSize: 17, textAlign: 'center', color: '#fff' }}>บันทึก</Text>
                        </TouchableOpacity> 
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingBottom: Platform.OS == 'android' ? 10 : 150,
        backgroundColor: '#fff',
    },
    column2: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: -10,
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
        marginTop: 10,
        fontFamily: 'Kanit_600SemiBold'
    },
    form: {
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginTop: -5,
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
        height: Platform.OS == 'android' ? 40 : 150,
        padding: 8,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontFamily: 'Kanit_400Regular',
        fontSize: 16,
    },
    showText: {
        fontFamily: "Kanit_400Regular",
        fontSize: 18
    },
    hyperlinkStyle: {
        color: 'blue',
        fontSize: 16,
        margin: 5,
        textDecorationLine: 'underline',
        fontFamily: "Kanit_400Regular",
    }
});

export default AddInfoVaccine;
