import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const PreAddInfoVaccine = ({ navigation }) => {
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
            {/* <Text style={{ fontFamily: 'Kanit_500Medium', fontSize: 20 }}>เพิ่มข้อมูลการฉีดวัคซีนของคุณ</Text> */}
            {/* <View style={{ backgroundColor: 'red', padding: 10, margin: 5, borderRadius: 10 }}>
                <Text style={{ fontFamily: 'Kanit_500Medium', fontSize: 18, color: '#fff' }}>หากคุณยังไม่ได้รับวัคซีนใดๆ สามารถดูแผนที่ศุนย์ฉีดวัคซีนได้ และในแผลที่ SafeZone จุดของคุณจะเป็นสีแดงเนื่องจากคุณยังไม่รับวัคซีน</Text>
            </View> */}

            {/* <Text style={{ fontFamily: 'Kanit_500Medium', fontSize: 20, marginTop: 10 }}>หากคุณได้รับวัคซีนแล้วให้กดปุ่ม Scan QR code</Text> */}
            <Text style={{ fontFamily: 'Kanit_500Medium', fontSize: 20 }}>โปรด Scan QR code ที่ได้รับจากหมอพร้อม</Text>
            <Text style={{ fontFamily: 'Kanit_500Medium', fontSize: 20 }}>เพื่อเป็นการยืนยัน ว่าคุณได้รับวัคซีนแล้ว</Text>
            <View style={{ alignSelf: 'flex-start', marginLeft: 30, marginTop: 10, marginBottom: 15}}>
                <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginTop: 10 }}>ขั้นตอนที่</Text>
                <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="numeric-1-circle" size={28} color="#48C9B0"/>
                    <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginLeft: 30 }}>เปิดแอปพลิเคชัน หมอพร้อม</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="numeric-2-circle" size={28} color="#48C9B0"/>
                    <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginLeft: 30 }}>เลือกเมนู Vaccine Covid-19 Certificate</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="numeric-3-circle" size={28} color="#48C9B0"/>
                    <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginLeft: 30 }}>กดปุ่ม Scan QR CODE</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="numeric-4-circle" size={28} color="#48C9B0"/>
                    <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginLeft: 30 }}>กรอก Certificate Serial No.</Text>
                </View>
                <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="numeric-5-circle" size={28} color="#48C9B0"/>
                    <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 17, marginLeft: 30 }}>กรอกข้อมูลการรับวัคซีนของคุณ</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.scanBtn}
                onPress={() => navigation.navigate('SplashScan')}
            >
                <Text style={{ color: '#fff', fontFamily: 'Kanit_500Medium', fontSize: 16 }}>SCAN QR CODE</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: "#fff"
    },
    scanBtn: {
        backgroundColor: '#48C9B0',
        borderRadius: 10,
        padding: 10
    }
})
export default PreAddInfoVaccine;