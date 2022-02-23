import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import axios from "axios";

class Vaccine extends Component {
    state = {
        vaccineData : [],
        MasterData : [],
        loading: true,
        loadMore: true,
        updateDate: "",
        searchText: "",
        selectedProvince: "",
        population: [],
        color: "",
        fontLoaded: false
    }
    componentDidMount() {
        // console.log("render DidMount")
        this.loadAssetsAsync()
        fetch('https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination.json').then((response) => response.json())
        .then((responseJson) => {
            return responseJson.data
        })
        .then( data => {
            this.setState({ vaccineData : data, MasterData : data, loading : false })
            // console.log(this.state.vaccineData)
        })
        .catch(error => {
            console.log(error)
        })

        axios.get('https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination.json')
        .then((response) => {
            // console.log(response.data.update_date)
            this.setState({ updateDate : response.data.update_date })
        }).catch((error) => {
            console.log(error)
        })
    }

    loadAssetsAsync = async () => {
        await Font.loadAsync({
          'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
          'Kanit-bold': require('../assets/fonts/Kanit-Bold.ttf'),
        })
        this.setState({ fontLoaded: true })
    }
  
    searchFilter = (text) => {
        if (text) {
            const newData = this.state.vaccineData.filter((item) => {
                const itemData = item.province
                // console.log("itemData.indexOf(text) > -1 : ", itemData.indexOf(text) > -1)
                return itemData.indexOf(text) > -1
            });
            this.setState({
                vaccineData : newData,
                searchText : text
            })
        }
        else {
            this.setState({
                vaccineData : this.state.MasterData,
                searchText : text
            })
        }
    }

    renderVaccineData({ item }) {
        return (
            <View style={{ flex: 1, margin: 5, backgroundColor: "#E5E7E9", borderRadius: 5, height: 50, justifyContent: 'center' }}>
                <TouchableOpacity>
                    <View style={{ justifyContent: 'center', marginTop: -5 }}>
                        <Text style={styles.provinceText}>{ item.province }</Text>
                    </View>
                    <View style={{ marginLeft: 150, justifyContent: 'center', marginTop: -23}}>
                        <Text style={styles.itemText}>{ item.total_1st_dose }</Text>
                    </View>
                    <View style={{ marginLeft: 235, justifyContent: 'center', marginTop: -23}}>
                        <Text style={styles.itemText}>{ item.total_2nd_dose }</Text>
                    </View>
                    <View style={{ marginLeft: 325, justifyContent: 'center', marginTop: -23}}>
                        <Text style={styles.itemText}>{ item.total_3rd_dose }</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.vaccineData != this.state.vaccineData) {
            return true
        }
        return false
    }

    render() {
        if (!this.state.fontLoaded) {
            return <AppLoading />
        }
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <SearchBar containerStyle={{ width: "98%",borderWidth: 0.8, borderRadius: 10}}
                        placeholder="ค้นหาจังหวัด..."
                        onChangeText={(text) => this.searchFilter(text)}
                        value={this.state.searchText}
                        platform="android"
                    />
                    {/* <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 16, alignSelf: 'flex-end', marginTop: 5 }}>ข้อมูลอัพเดตเมื่อ { this.state.updateDate }</Text> */}
                </View>
                <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 16, alignSelf: 'flex-end', marginTop: -5, marginRight: 5 }}>ข้อมูลอัพเดตเมื่อ { this.state.updateDate }</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ marginLeft: -15, marginRight: 10, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>Province</Text>
                    <Text style={{ marginLeft: 30, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>1st</Text>
                    <Text style={{ fontSize: 18, fontFamily: 'Kanit_700Bold'}}>2nd</Text>
                    <Text style={{ marginRight: -5, fontSize: 18, fontFamily: 'Kanit_700Bold' }}>3td</Text>
                </View>
                <View style={styles.itemRow}>
                    <FlatList 
                        data={this.state.vaccineData}
                        renderItem={this.renderVaccineData}
                        keyExtractor={item => item.province}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginBottom: 60
    },
    vaccineBox: {
        backgroundColor: "#27AE60",
        borderRadius: 5,
        margin: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchContainer: {
        // flex: 1,
        // justifyContent: "center",
        alignItems: 'center',
        marginLeft: -10,
        alignItems: 'flex-end',
        marginTop: 10,
        marginBottom: 10,
        // marginRight: 5
    },
    itemRow: {
        flex: 5,
        backgroundColor: '#fff',
    },
    provinceText: {
        fontSize: 18,
        fontFamily: "Kanit-bold",
        paddingLeft: 10,
        color: "black",
    },
    itemText: {
        fontSize: 16,
        fontWeight: "400",
        paddingLeft: 20,
        color: "black",
        fontFamily: "Kanit-Regular"
    },
    searchInput: {
        width: "100%",
        height: 35,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 18,
        color: "black",
        marginTop: 10,
        fontFamily: "Kanit-Regular"
    },
    searchImage: {
        width: 30, 
        height: 30, 
        alignSelf: 'flex-start', 
        marginLeft:15, 
        marginTop: -33
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: -35,
        marginRight: 5,
    },
    touchButton: {
        alignItems: "center",
        backgroundColor: "#3498DB",
        padding: 10,
        borderRadius: 10,
        marginRight: 3,
    },
})

export default Vaccine;
