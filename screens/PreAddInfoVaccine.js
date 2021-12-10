import React from "react";
import { StyleSheet, Text, View, Alert, TextInput, Button, LogBox, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const PreAddInfoVaccine = () => {
    return (
        <View style={styles.container}>
            <Text>เพิ่มข้อมูลการฉีดวัคซีนของคุณ</Text>
            <Text>หากคุณยังไม่ได้รับวัคซีนให้กดปุ่ม ยังไม่ได้รับวัคซีน</Text>
            <Text>หากคุณได้รับวัคซีนให้กดปุ่ม Scan QR code เพื่อยืนยัน</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#fff"
    }
})
export default PreAddInfoVaccine;