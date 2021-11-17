import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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

const NewRecoverLineChart = () => {
    const [resData, setResData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all")
        .then((response) => {
            setResData(response.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
        return () => {}
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
    
    const SliceData = resData.slice(214)
    const dataChart = []
    // console.log("SliceData : ", SliceData)
    SliceData.map((item, index) => {
        return dataChart.push(item.new_recovered)
    })
    
    const date = []
    for (let i = 1; SliceData.length >= i; i++) {
        date.push(i.toString())
        // console.log(date)
    }
    return (
        <View style={styles.container}>
            {
                !loading ?         
                <View style={styles.container}>
                    <Text style={styles.header}>รักษาหาย</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <LineChart
                            data={{
                                labels: date,
                                datasets: [
                                    {
                                        data: dataChart,
                                        strokeWidth: 2,
                                    },
                                ],
                            }}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={{
                                backgroundGradientFrom: '#fff',
                                backgroundGradientTo: '#fff',
                                color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
                                style: {
                                    borderRadius: 5,
                                },
                                    
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                        />
                    </View>
                </View>
                : null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#48C9B0',
    },
    header: {
        // color: "#fff",
        color: "#48C9B0",
        fontFamily: "Kanit_600SemiBold",
        fontSize: 25,
        marginLeft: 10
    }
});
export default NewRecoverLineChart;