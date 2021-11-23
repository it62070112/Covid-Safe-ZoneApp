import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import axios from "axios";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { color } from "react-native-reanimated";
class VaccinationRates extends Component {

    state = {
        masterData: [],
        vaccineRateData: [],
        fontLoaded: false
    }

    // MyBarChart = () => {
    //     const SliceData = this.state.masterData.slice(250)
    //     const dataChart = []

    //     SliceData.map((item, index) => {
    //         return dataChart.push(item.daily_vaccinations)
    //     })
    //     console.log('dataChart: ', dataChart);
    // }

    async componentDidMount() {
        // console.log("render DidMount")
        this.loadAssetsAsync()
        await axios.get('https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/national-vaccination-timeseries.json')
        .then((response) => {
            var testData = response.data
            var test = [testData[testData.length - 1]]
            this.setState({
                masterData: testData,
                vaccineRateData: test
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
          'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
          'Kanit-bold': require('../assets/fonts/Kanit-Bold.ttf'),
          'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
        })
        this.setState({ fontLoaded: true })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log("shouldComponentUpdate")
        if (nextState.vaccineRateData != this.state.vaccineRateData) {
            return true
        }
        return false
    }

    MyLineChart = () => {
        const SliceData = this.state.masterData.slice(250)
        const dataChart = []
        SliceData.map((item, index) => {
            return dataChart.push(item.daily_vaccinations)
        })
        // console.log('dataChart: ', dataChart);
        
        const labelDate = []
        for (let i = 1; SliceData.length >= i; i++) {
            labelDate.push(i.toString())
            // console.log(date)
        }
        return (
            <View style={styles.containerChart}>
            <Text style={styles.header}>ฉีดวัคซีนวันนี้</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <LineChart
                    data={{
                        labels: labelDate,
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
                        color: (opacity = 1) => `rgba(55, 94, 218, ${opacity})`,
                        style: {
                            borderRadius: 5,
                        },
                            
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
        </View>
        //     <View style={styles.containerChart}>
        //     <BarChart
        //         data={{
        //             labels: labelDate,
        //             datasets: [
        //                 {
        //                     data: dataChart,
        //                     // colors: (opacity = 1) => '#F4D03F'
        //                     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        //                 },
        //             ],
        //         }}
        //         width={Dimensions.get('window').width - 5}
        //         height={220}
        //         chartConfig={{
        //             backgroundColor: 'transparent',
        //             backgroundGradientFrom: '#fff',
        //             backgroundGradientTo: '#fff',
        //             // backgroundGradientFromOpacity: 0,
        //             // backgroundGradientFrom: '#E74C3C',
        //             // backgroundGradientToOpacity: 0,
        //             color: (opacity = 1) => `rgba(86, 101, 115, ${opacity})`,
        //             barRadius: 5,
        //             barPercentage: 0.3,
        //             propsForLabels: {
        //                 fontSize: 12,
        //                 fontFamily: "Kanit_500Medium",
        //             }
                    
        //         }}
        //         withCustomBarColorFromData={true}
        //         flatColor={true}
        //         // showValuesOnTopOfBars={true}
        //         withHorizontalLabels={false}
        //         // fromZero={true}
        //         showBarTops={false}
        //         style={{
        //             marginVertical: 8,
        //             borderRadius: 5,
        //             marginLeft: -20
        //         }}
        //     />
        // </View>
        );
    };

    renderDailyReportData = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={{ fontFamily: 'Kanit-Medium', fontSize: 16, alignSelf: 'flex-end', marginRight: 10, color: 'black' }}>อัพเดต : { item.date }</Text>
                <View style={styles.dailyReportContainer}>
                    <View style={styles.newCaseBox}>
                        <Text style={styles.titleText}>ฉีดวัคซีนวันนี้</Text>
                        <Text style={styles.valueText}>{ item.daily_vaccinations } โดส</Text>
                    </View>
                    <View style={styles.deathCase}>
                        <Text style={styles.titleText}>ฉีดแล้วมั้งหมด</Text>
                        <Text style={styles.valueText}>{ item.total_doses } โดส</Text>
                    </View>
                    <View style={styles.recovered}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.titleText}>1st</Text>
                            <Text style={styles.valueText}>{ item.first_dose } โดส</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.titleText}>2nd</Text>
                            <Text style={styles.valueText}>{ item.second_dose } โดส</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.titleText}>3rd</Text>
                            <Text style={styles.valueText}>{ item.third_dose } โดส</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.chartView}>
                        { this.MyLineChart() }
                    </View>
                </View>
            </View>
        )
    }
    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <SafeAreaView style={styles.container}>
                <FlatList nestedScrollEnabled
                    data={ this.state.vaccineRateData }
                    renderItem={ this.renderDailyReportData }
                    keyExtractor={item => item.date}
                />
                 <StatusBar style="auto" />
            </SafeAreaView>
        )
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#17A589',
        backgroundColor: '#fff'
    },
    containerChart: {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff'
    },
    dailyReportContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    newCaseBox: {
        flexDirection: 'row',
        width: "95%",
        height: 55,
        padding: 10,
        backgroundColor: '#41b59e',
        borderRadius: 10,
        margin: 5,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    deathCase: {
        flexDirection: 'row',
        width: "95%",
        height: 55,
        padding: 10,
        backgroundColor: '#41b59e',
        borderRadius: 10,
        margin: 5,
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    recovered: {
        width: "95%",
        height: 120,
        padding: 10,
        backgroundColor: '#41b59e',
        borderRadius: 10,
        margin: 5,
        marginTop: 10,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
    },
    header: {
        color: "#6dd4c0",
        fontFamily: "Kanit_600SemiBold",
        fontSize: 25,
        marginLeft: 10
    },
    titleText: {
        fontFamily: 'Kanit-bold',
        fontSize: 20,
        color: "#fff",
    },
    valueText: {
        fontFamily: 'Kanit-Regular', 
        fontSize: 25,
        color: "#fff"
        
    },
    chartView: {
        flex: 1,
        marginBottom: 60,
    },
})

export default VaccinationRates;