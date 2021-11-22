import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import axios from 'axios';
import { BarChart } from "react-native-chart-kit";

const TypeOfVaccine = ({ route }) => {
    const [selectProvince, setSelectProvince] = useState("")
    const [dailyProvinceData, setDailyProvinceData] = useState([])
    const [masterData, setMasterData] = useState([])
    const [dataForChart, setDataForChart] = useState([])
    const [dataTotalVac, setDataTotalVac] = useState([])
    const [label, setLabel] = useState([])
    const [colorChart, setColorChart] = useState([])
    useEffect(() => {
        axios.get("https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination-by-manufacturer.json")
            .then((response) => {
                setDailyProvinceData(response.data.data)
                setMasterData(response.data.data)
            }).catch((error) => {
                console.log(error)
            })

        axios.get("https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/vaccine-manufacturer-timeseries.json")
        .then((response) => {
            var testData = response.data
            var test = [testData[testData.length - 1]]
            setDataTotalVac([testData[testData.length - 1]])
            const dataVac = []
            test.map((item, index) => {
                return dataVac.push(item.AstraZeneca, item['Johnson & Johnson'], item.Pfizer, item.Sinopharm, item.Sinovac)
            })
            setDataForChart(dataVac)
        }).catch((error) => {
            console.log(error)
        })

        setLabel(['AstraZeneca', 'J&J', 'Pfizer', 'Sinopharm', 'Sinovac'])
        setColorChart(
            [
                (opacity = 1) => '#F4D03F',
                (opacity = 1) => '#854FFF',
                (opacity = 1) => '#00C7FF',
                (opacity = 1) => '#27AE60',
                (opacity = 1) => '#FC9604'
            ]
        )
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
            setLabel(['AstraZeneca', 'J&J', 'Moderna', 'Pfizer', 'Sinopharm', 'Sinovac'])
            const dataChart = []
            newData.map((item, index) => {
                return dataChart.push(item.AstraZeneca, item['Johnson & Johnson'], item.Moderna, item.Pfizer, item.Sinopharm, item.Sinovac)
            })
            setDataForChart(dataChart)
            setColorChart(
                [
                    (opacity = 1) => '#F4D03F',
                    (opacity = 1) => '#854FFF',
                    (opacity = 1) => '#FF4FA2',
                    (opacity = 1) => '#00C7FF',
                    (opacity = 1) => '#27AE60',
                    (opacity = 1) => '#FC9604'
                ]
            )
        }
        if (itemValue == "ทั้งหมด") {
            setDailyProvinceData(masterData)
            setSelectProvince(itemValue)
            setLabel(['AstraZeneca', 'J&J', 'Pfizer', 'Sinopharm', 'Sinovac'])
            const dataVac = []
            dataTotalVac.map((item, index) => {
                return dataVac.push(item.AstraZeneca, item['Johnson & Johnson'], item.Pfizer, item.Sinopharm, item.Sinovac)
            })
            setDataForChart(dataVac)
            setColorChart(
                [
                    (opacity = 1) => '#F4D03F',
                    (opacity = 1) => '#854FFF',
                    (opacity = 1) => '#00C7FF',
                    (opacity = 1) => '#27AE60',
                    (opacity = 1) => '#FC9604'
                ]
            )
        }
    }

    const MyBarChart = () => {
        return (
            <View style={styles.containerChart}>
                <BarChart
                    data={{
                        labels: label,
                        datasets: [
                            {
                                data: dataForChart,
                                colors: colorChart
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 5}
                    height={220}
                    chartConfig={{
                        backgroundColor: 'transparent',
                        // backgroundGradientFrom: '#fff',
                        // backgroundGradientTo: '#fff',
                        backgroundGradientFromOpacity: 0,
                        backgroundGradientFrom: 'white',
                        backgroundGradientToOpacity: 0,
                        color: (opacity = 1) => `rgba(86, 101, 115, ${opacity})`,
                        barRadius: 5,
                        barPercentage: 0.3,
                        propsForLabels: {
                            fontSize: 12,
                            fontFamily: "Kanit_500Medium",
                        }
                        
                    }}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                    showValuesOnTopOfBars={true}
                    withHorizontalLabels={false}
                    fromZero={true}
                    showBarTops={false}
                    style={{
                        marginVertical: 8,
                        borderRadius: 5,
                        marginLeft: -10
                    }}
                />
            </View>
        );
    };

    const renderReportProvinceData = ({ item }) => {
        return (
            <TouchableOpacity>
                <View>
                    <Text style={styles.provinceText}>{item.province}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>AstraZeneca</Text>
                        <View>
                            <Text style={styles.itemText}>{ item.AstraZeneca } โดส</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>Johnson & Johnson</Text>
                        <View>
                            <Text style={styles.itemText}>{ item['Johnson & Johnson'] } โดส</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>Moderna</Text>
                        <View>
                            <Text style={styles.itemText}>{ item.Moderna } โดส</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>Pfizer</Text>
                        <View>
                            <Text style={styles.itemText}>{ item.Pfizer } โดส</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>Sinopharm</Text>
                        <View>
                            <Text style={styles.itemText}>{ item.Sinopharm } โดส</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.brandText}>Sinovac</Text>
                        <View>
                            <Text style={styles.itemText}>{ item.Sinovac } โดส</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <MyBarChart />
                <View style={{ borderBottomColor: '#48586f', borderWidth: 0.7, width: '98%', borderRadius: 10 }}>
                    <Picker
                        selectedValue={selectProvince}
                        // style={{ width: "95%", fontSize: 20, fontFamily: "Kanit_400Regular", alignSelf: 'center', marginTop: 10, backgroundColor: '#fff' }}
                        onValueChange={(itemValue, itemIndex) => searchFilter(itemValue)}
                    >
                        <Picker.Item label="ทั้งหมด" value="ทั้งหมด" style={{ fontSize: 18, fontFamily: "Kanit_400Regular" }} />
                        {
                            masterData.map((item, index) => {
                                return (<Picker.Item label={item.province} value={item.province} key={index} style={{ fontSize: 18, fontFamily: "Kanit_400Regular" }} />)
                            })
                        }
                    </Picker>
                </View>
                {/* <Picker
                    selectedValue={selectProvince}
                    style={{ width: "95%", fontSize: 20, fontFamily: "Kanit_400Regular", alignSelf: 'center', marginTop: 10, backgroundColor: '#fff' }}
                    onValueChange={(itemValue, itemIndex) => searchFilter(itemValue)}
                >
                    <Picker.Item label="ทั้งหมด" value="ทั้งหมด" style={{ fontSize: 18, fontFamily: "Kanit_400Regular" }} />
                    {
                        masterData.map((item, index) => {
                            return (<Picker.Item label={item.province} value={item.province} key={index} style={{ fontSize: 18, fontFamily: "Kanit_400Regular" }} />)
                        })
                    }
                </Picker> */}
            </View>
            <View style={styles.itemContainer}>
                {/* <View style={{ alignItems: 'flex-start', marginLeft: 10 }}>
                    <Text style={{ marginLeft: -5, marginRight: 40, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Province</Text>
                    <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>New Case</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Total</Text>
                    <Text style={{ marginRight: -5, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Death</Text>
                </View> */}
                <FlatList
                    data={dailyProvinceData}
                    renderItem={renderReportProvinceData}
                    keyExtractor={item => item.province}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // marginBottom: 20,
    },
    containerChart: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    newCaseBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#E5E7E9",
        borderRadius: 5,
        margin: 5,
        width: '95%',
    },
    searchContainer: {
        marginLeft: 10,
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        marginRight: 5
    },
    itemRow: {
        flex: 5,
        backgroundColor: '#fff'
    },
    provinceText: {
        fontSize: 18,
        fontFamily: "Kanit_700Bold",
        paddingLeft: 10,
        color: "black",
    },
    itemText: {
        fontSize: 16,
        alignSelf: 'center',
        color: "black",
        fontFamily: "Kanit_400Regular",
        // marginTop: -25,
        paddingRight: 10
    },
    brandText: {
        fontSize: 16,
        fontFamily: "Kanit_500Medium",
        paddingLeft: 10,
        color: "black",
    },
    searchInput: {
        width: "85%",
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        color: "black",
        marginTop: 10,
        fontFamily: "Kanit_400Regular"
    },
    // header: {
    //     height: 90
    // },
    headerContainer: {
        // flex: 1,
        // backgroundColor: '#48C9B0',
        alignItems: 'center'
    },
    itemContainer: {
        flex: 2,
        marginBottom: 70
        // backgroundColor: '#48C9B0',
    },
    totalBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#3D7CD4',
        width: '98%',
        height: 90,
        borderRadius: 10,
        padding: 15
    }
})
export default TypeOfVaccine;