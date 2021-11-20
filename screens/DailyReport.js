import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import axios from "axios";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
import NewCaseLineChart from "../components/NewCaseLineChart";
import SplashPermission from "../components/SplashPermission";

class DailyReport extends Component {

    state = {
        dailyReportData: [],
        fontLoaded: false
    }

    async componentDidMount() {
        console.log("render DidMount")
        this.loadAssetsAsync()
        await axios.get('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all')
        .then((response) => {
            this.setState({
                dailyReportData: response.data
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
        console.log("shouldComponentUpdate")
        if (nextState.dailyReportData != this.state.dailyReportData) {
            return true
        }
        return false
    }

    renderDailyReportData = ({ item }) => {
        return (
            <View style={{ backgroundColor: '#fff' }}>
                <Text style={{ fontFamily: 'Kanit-Medium', fontSize: 16, alignSelf: 'flex-end', marginRight: 10, color: 'black' }}>อัพเดต : { item.update_date }</Text>
                <View style={styles.dailyReportContainer}>
                    <View style={styles.newCaseBox}>
                        <Text style={styles.titleText}>ผู้ติดเชื้อรายใหม่</Text>
                        <Text style={styles.valueText}>{ item.new_case }</Text>
                        <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5, fontFamily: 'Kanit-Regular' }}>สะสม</Text>
                        <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-end', marginTop: -28, marginRight: 5, fontFamily: 'Kanit-Regular' }}>{ item.total_case }</Text>
                    </View>
                    <View style={styles.deathCase}>
                        <Text style={styles.titleText}>ผู้เสียชีวิตรายใหม่</Text>
                        <Text style={styles.valueText}>{ item.new_death }</Text>
                        <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5, fontFamily: 'Kanit-Regular' }}>สะสม</Text>
                        <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-end', marginTop: -28, marginRight: 5, fontFamily: 'Kanit-Regular' }}>{ item.total_death }</Text>
                    </View>
                    <View style={styles.recovered}>
                        <Text style={styles.titleText}>รักษาหาย</Text>
                        <Text style={styles.valueText}>{ item.new_recovered }</Text>
                    </View>
                    <View style={styles.active}>
                        <Text style={styles.titleText}>กำลังรักษา</Text>
                        <Text style={styles.valueText}>87885</Text>
                    </View>
                    <View style={styles.serious}>
                        <Text style={styles.titleText}>อาการหนัก</Text>
                        <Text style={styles.valueText}>389</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.chartView}>
                        <NewCaseLineChart />
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
                <SplashPermission />
                <FlatList nestedScrollEnabled
                    data={ this.state.dailyReportData }
                    renderItem={ this.renderDailyReportData }
                    keyExtractor={item => item.txn_date}
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
    dailyReportContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    newCaseBox: {
        width: 195,
        height: 150,
        padding: 10,
        backgroundColor: '#E74C3C',
        borderRadius: 20,
        margin: 5,
        marginTop: 10,
        justifyContent: 'center',
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
        width: 195,
        height: 150,
        padding: 10,
        backgroundColor: '#797D7F',
        borderRadius: 20,
        margin: 5,
        marginTop: 10,
        justifyContent: 'center',
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
        width: 125,
        height: 150,
        padding: 5,
        backgroundColor: '#27AE60',
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
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
    active: {
        width: 125,
        height: 150,
        padding: 5,
        backgroundColor: '#47BAEA',
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
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
    serious: {
        width: 125,
        height: 150,
        padding: 5,
        backgroundColor: '#AF7AC5',
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
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
    titleText: {
        fontFamily: 'Kanit-bold',
        fontSize: 21,
        color: "#fff",
    },
    valueText: {
        fontFamily: 'Kanit-Regular', 
        fontSize: 40,
        color: "#fff"
    },
    chartView: {
        flex: 1,
        marginBottom: 60,
        // backgroundColor: '#48C9B0'
    },
})

export default DailyReport;