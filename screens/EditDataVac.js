import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import firebase from "../database/firebase";
import { Picker } from '@react-native-picker/picker';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";

class EditDataVac extends Component {
    constructor() {
        super();

        this.state = {
            newGender: '',
            key: "",
            age: "",
            gender: "",
            name: "",
            quantity: "",
            vaccinationPlace: "",
            vaccineBrandFirstDose: "",
            vaccineBrandSecondDose: "",
            vaccineBrandThirdDose: "",
            latitude: 0,
            longitude: 0,
            CertificateCode: "",
            CertificateNo: ""
        };
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
          'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
          'Kanit-bold': require('../assets/fonts/Kanit-Bold.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    componentDidMount() {
        this.loadAssetsAsync()
        const VaccineDoc = firebase
            .firestore()
            .collection("infoVaccineUser")
            .doc(this.props.route.params.key);
        VaccineDoc.get().then((res) => {
            if (res.exists) {
                const Vaccine = res.data();
                this.setState({
                    key: res.id,
                    age: Vaccine.age,
                    gender: Vaccine.gender,
                    name: Vaccine.name,
                    quantity: Vaccine.quantity,
                    vaccinationPlace: Vaccine.vaccinationPlace,
                    vaccineBrandFirstDose: Vaccine.vaccineBrandFirstDose,
                    vaccineBrandSecondDose: Vaccine.vaccineBrandSecondDose,
                    vaccineBrandThirdDose: Vaccine.vaccineBrandThirdDose,
                    latitude: Vaccine.latitude,
                    longitude: Vaccine.longitude,
                    CertificateCode: Vaccine.CertificateCode,
                    CertificateNo: Vaccine.CertificateNo
                });
            } else {
                console.log("Document does not exist!!");
            }
        })
    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    updateVaccine() {
        const updateInfoVaccineUserDoc = firebase
        .firestore()
        .collection("infoVaccineUser")
        .doc(this.state.key);
    updateInfoVaccineUserDoc
        .set({
            age: this.state.age,
            gender: this.state.gender,
            name: this.state.name,
            quantity: this.state.quantity,
            vaccinationPlace: this.state.vaccinationPlace,
            vaccineBrandFirstDose: this.state.vaccineBrandFirstDose,
            vaccineBrandSecondDose: this.state.vaccineBrandSecondDose,
            vaccineBrandThirdDose: this.state.vaccineBrandThirdDose,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            CertificateCode: this.state.CertificateCode,
            CertificateNo: this.state.CertificateNo
        })
        .then(() => {
            this.props.navigation.pop();
        })
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder='ชื่อ - นามสกุล'
                        placeholderTextColor='#566573'
                        onChangeText={(val) => this.inputValueUpdate(val, "name")}
                        value={this.state.name}
                    />
                    <View style={styles.column2}>
                        <TextInput
                            style={styles.input2}
                            placeholder='อายุ'
                            placeholderTextColor='#566573'
                            onChangeText={(val) => this.inputValueUpdate(val, "age")}
                            value={this.state.age}
                            keyboardType="numeric"
                        />
                        <Picker
                            selectedValue={this.state.gender}
                            onChangeText={(val) => this.inputValueUpdate(val, "gender")}
                            // onValueChange={(val) => setNumVaccine(val)}
                            style={styles.input2}
                        >
                            <Picker.Item label='เพศ' value='เพศ' />
                            <Picker.Item label="ชาย" value="ชาย" />
                            <Picker.Item label="หญิง" value="หญิง" />
                        </Picker>
                    </View>

                    <View style={styles.column2}>
                        <Picker
                            style={styles.input2}
                            selectedValue={this.state.quantity}
                            onValueChange={(itemValue, itemIndex) => this.setState({quantity: itemValue})}
                        >
                            <Picker.Item label='จำนวนโดส' value='0' />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            {/* <Picker.Item label="มากกว่า 3" value="มากกว่า 3" /> */}
                        </Picker>
                        <Picker
                            selectedValue={this.state.vaccineBrandFirstDose}
                            onValueChange={(itemValue, itemIndex) => this.setState({vaccineBrandFirstDose: itemValue})}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 1' value='0' />
                            <Picker.Item label="Pfizer" value="Pfizer" />
                            <Picker.Item label="Moderna" value="Moderna" />
                            <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                            <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                            <Picker.Item label="Novavax" value="Novavax" />
                            <Picker.Item label="Sinovac" value="Sinovac" />
                            <Picker.Item label="Sinopharm" value="Sinopharm" />
                        </Picker>
                    </View>

                    <View style={styles.column2}>
                        <Picker
                            selectedValue={this.state.vaccineBrandSecondDose}
                            onValueChange={(itemValue, itemIndex) => this.setState({vaccineBrandSecondDose: itemValue})}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 2' value='0' />
                            <Picker.Item label="Pfizer" value="Pfizer" />
                            <Picker.Item label="Moderna" value="Moderna" />
                            <Picker.Item label="Johnson & Johnson" value="Johnson & Johnson" />
                            <Picker.Item label="AstraZeneca" value="AstraZeneca" />
                            <Picker.Item label="Novavax" value="Novavax" />
                            <Picker.Item label="Sinovac" value="Sinovac" />
                            <Picker.Item label="Sinopharm" value="Sinopharm" />
                        </Picker>
                        <Picker
                            selectedValue={this.state.vaccineBrandThirdDose}
                            onValueChange={(itemValue, itemIndex) => this.setState({vaccineBrandThirdDose: itemValue})}
                            style={styles.input2}
                        >
                            <Picker.Item label='เข็มที่ 3' value='0' />
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
                        onChangeText={(val) => this.inputValueUpdate(val, "vaccinationPlace")}
                        value={this.state.vaccinationPlace}
                        autoCompleteType='off'
                    />
                <View style={{ width: "100%", margin: 10, }}>
                    <TouchableOpacity onPress={() => this.updateVaccine()} style={{ padding: 10, backgroundColor: "#52BE80", borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Kanit_600SemiBold', fontSize: 15 }}>อัพเดตข้อมูล</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.pop()} style={{ marginTop: 5, padding: 10, backgroundColor: "#34CCF3", borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontFamily: 'Kanit_600SemiBold', fontSize: 15 }}>กลับหน้าแสดงข้อมูล</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: Platform.OS == 'android' ? 10 : 150,
        backgroundColor: '#fff'
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
        fontFamily: 'Kanit-Regular',
        width: "100%",
        height: 50,
        padding: 15,
        margin: 5,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontSize: 16
    },
    input2: {
        fontFamily: 'Kanit-Regular',
        width: 185,
        height: Platform.OS == 'android' ? 40 : 150,
        padding: 8,
        margin: 5,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'grey',
        borderStyle: 'solid',
        borderRadius: 4,
        fontSize: 16,
    },
    showText: {
        fontSize: 18
    }

});

export default EditDataVac;