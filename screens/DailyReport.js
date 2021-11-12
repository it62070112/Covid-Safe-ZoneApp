import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, SafeAreaView, VirtualizedView } from "react-native";
import axios from "axios";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { StatusBar } from 'expo-status-bar';
// import MyChart from "./MyChart";
import LineChartCovid from "../components/LineChartCovid";

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
            <View style={{ backgroundColor: '#48C9B0' }}>
                <Text style={{ fontSize: 35, marginTop: 20, marginBottom: 5, color: '#fff', marginLeft: 10, fontFamily: "Kanit-Medium" }}>Covid 19</Text>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 16, alignSelf: 'flex-end', marginRight: 5, }}>ข้อมูลอัพเดตเมื่อ : { item.update_date }</Text>
                <View style={styles.dailyReportContainer}>
                    <View style={styles.newCaseBox}>
                        <Text style={styles.titleText}>ผู้ติดเชื้อรายใหม่</Text>
                        <Text style={styles.valueText}>{ item.new_case }</Text>
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5, fontFamily: 'Kanit-Regular' }}>สะสม</Text> */}
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-end', marginTop: -28, marginRight: 5, fontFamily: 'Kanit-Regular' }}>{ item.total_case }</Text> */}
                    </View>
                    <View style={styles.deathCase}>
                        <Text style={styles.titleText}>ผู้เสียชีวิตรายใหม่</Text>
                        <Text style={styles.valueText}>{ item.new_death }</Text>
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5, fontFamily: 'Kanit-Regular' }}>สะสม</Text> */}
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-end', marginTop: -28, marginRight: 5, fontFamily: 'Kanit-Regular' }}>19730</Text> */}
                    </View>
                    <View style={styles.recovered}>
                        <Text style={styles.titleText}>รักษาหาย</Text>
                        <Text style={styles.valueText}>{ item.new_recovered }</Text>
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-start', marginLeft: 5, fontFamily: 'Kanit-Regular' }}>สะสม</Text> */}
                        {/* <Text style={{ fontSize: 20, color: '#fff', alignSelf: 'flex-end', marginTop: -28, marginRight: 5, fontFamily: 'Kanit-Regular' }}>{ item.total_recovered }</Text> */}
                    </View>
                    <View style={styles.active}>
                        <Text style={styles.titleText}>กำลังรักษา</Text>
                        <Text style={styles.valueText}>98425</Text>
                    </View>
                    <View style={styles.serious}>
                        <Text style={styles.titleText}>อาการหนัก</Text>
                        <Text style={styles.valueText}>{ item.new_recovered }</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {/* <Text style={{ marginLeft: 5, fontSize: 16 }}>อัตราการติดเชื้อรายวัน</Text> */}
                    <View style={styles.chartView}>
                        <LineChartCovid />
                    </View>
                </View>
                <StatusBar style="dark"/>
            </View>
        )
    }
    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <SafeAreaView style={{ backgroundColor: "#fff", }}>
                <FlatList nestedScrollEnabled
                    data={ this.state.dailyReportData }
                    renderItem={ this.renderDailyReportData }
                    keyExtractor={item => item.txn_date}
                />
            </SafeAreaView>
        )
    }
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",

    },
    dailyReportContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    newCaseBox: {
        width: 185,
        height: 150,
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
        width: 185,
        height: 150,
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
        width: 120,
        height: 150,
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
        width: 120,
        height: 150,
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
        width: 120,
        height: 150,
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
        backgroundColor: '#48C9B0'
    }
})

export default DailyReport;
// import React, { useEffect, useState } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import axios from "axios";
// import { 
//     Kanit_400Regular,
//     Kanit_500Medium,
//     Kanit_600SemiBold,
//     Kanit_700Bold,
//   } from '@expo-google-fonts/kanit'
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// const DailyReport = () => {
//     const [dailyReportData, setDailyReportData] = useState([])

//     useEffect(() => {
//         axios.get('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all')
//         .then((response) => {
//             setDailyReportData(response.data)
//             console.log(response.data)
//         })
//         .catch((error) => {
//             console.log(error)
//         })
//     }, [])

//     let [fontsLoaded] = useFonts({
//         Kanit_400Regular,
//         Kanit_500Medium,
//         Kanit_600SemiBold,
//         Kanit_700Bold,
//     })
//     if (!fontsLoaded) {
//         return <AppLoading />
//     }

//     const renderDailyReportData = ({ item }) => {
//         return (
//             <View>
//                 <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20 }}>new case : { item.new_case }</Text>
//                 <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20 }}>update_date : { item.update_date }</Text>
//             </View>
//         )
//     }
//     return (
//         <View style={styles.container}>
//             <FlatList 
//                 data={ dailyReportData }
//                 renderItem={ renderDailyReportData }
//                 keyExtractor={item => item.txn_date}
//             />
//             {/* <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20 }}>Hello DailyReport Page</Text>
//             <Text>{ props.newCase }</Text> */}
//         </View>
//     )
// }

// const styles =StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     }
// })

// export default DailyReport;