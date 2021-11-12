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
import { NewCaseInMont } from "../Data/mockData";
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
const LineChartCovid = () => {
    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_600SemiBold,
        Kanit_700Bold,
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }
    const MyLineChart = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>New Case</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <LineChart
                        data={{
                            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
                            datasets: [
                                {
                                    data: [8165, 7574, 7679, 7982, 8148, 8467, 7960, 7592, 6904, 6978, 7496],
                                    strokeWidth: 2,
                                },
                            ],
                        }}
                        width={Dimensions.get('window').width - 16}
                        height={220}
                        chartConfig={{
                            backgroundGradientFrom: '#fff',
                            backgroundGradientTo: '#fff',
                            // backgroundGradientFrom: '#eff3ff',
                            // backgroundGradientTo: '#efefef',
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                            
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MyLineChart />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#48C9B0',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: 30
    },
    header: {
        color: "#fff",
        fontFamily: "Kanit_600SemiBold",
        fontSize: 25,
        marginLeft: 10
    }
});
export default LineChartCovid;