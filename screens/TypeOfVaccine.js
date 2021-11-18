import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import axios from "axios";
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";


const TypeOfVaccine = () => {
    const [loading, setLoading] = useState(true)
    const [selectProvince, setSelectProvince] = useState("")
    const [dailyProvinceData, setDailyProvinceData] = useState([])
    const [masterData, setMasterData] = useState([])

    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination-by-manufacturer.json")
            .then((response) => {
                setMasterData(response.data)
                setDailyProvinceData(response.data)
                setLoading(false)
            }).catch((error) => {
                console.log(error)
            })
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

    const searchFilter = (itemValue) => {
        console.log(itemValue)
        if (itemValue) {
            const newData = masterData.filter((item) => {
                const itemData = item.province
                return itemData.indexOf(itemValue) > -1
            });
            setDailyProvinceData(newData)
            setSelectProvince(itemValue)
        }
        if (itemValue == "ทั้งหมด") {
            setDailyProvinceData(masterData)
            setSelectProvince(itemValue)
        }
    }

    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
        // justifyContent: "center",
        // alignItems: "center",
    }
})

export default TypeOfVaccine;