// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, TextInput, Button } from "react-native";
// import LoadingSplash from "../components/LoadingSplash";
// import { 
//     Kanit_400Regular,
//     Kanit_500Medium,
//     Kanit_600SemiBold,
//     Kanit_700Bold,
//   } from '@expo-google-fonts/kanit'
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// const VaccineCoverage = ({ navigation }) => {
//     const [vaccineData, setVaccineData] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [updateDate, setUpdateDate] = useState("")
//     const [selectProvince, setSelectProvince] = useState("");
//     const apiURL = "https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination.json"
//     useEffect(() => {
//         console.log("render")
//         fetch(apiURL)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             return responseJson.data
//         })
//         .then( data => {
//             setVaccineData(data)
//             setLoading(false)
//             // console.log(vaccineData)
//         })
//         .catch(error => {
//             console.log(error)
//         })

//         fetch(apiURL)
//         .then((response) => response.json())
//         .then((responseJson) => {
//             return responseJson.update_date
//         })
//         .then( update_date => {
//             setUpdateDate(update_date)
//             // console.log(updateDate)
//         })
//         .catch(error => {
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

//     // if (loading) {
//     //     console.log("loading")
//     //     return <LoadingSplash />
//     // }else {
//     //     console.log("loading success!!!")
//     // }

//     const Item = ({ item }) => (
//         <View style={styles.vaccineContainer}>
//             <TouchableOpacity>
//                 <Text style={styles.provinceText}>จังหวัด{ item.province }</Text>
//                 <Text style={styles.doseText}>ได้รับวัคซีนอย่างน่อย 1 เข็ม : { item.total_1st_dose }</Text>
//                 <Text style={styles.doseText}>ได้รับวัคซีนอย่างน่อย 2 เข็ม : { item.total_2nd_dose }</Text>
//                 <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้น 3 เข็ม : { item.total_3rd_dose }</Text>
//             </TouchableOpacity>
//         </View>
//       );
      
//     const renderVaccineItem = ({ item }) => {
//         return (
//             // <View style={styles.vaccineContainer}>
//             //     <TouchableOpacity>
//             //         <Text style={styles.provinceText}>จังหวัด{ item.province }</Text>
//             //         <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 1 เข็ม { item.total_1st_dose }</Text>
//             //         <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 2 เข็ม { item.total_2nd_dose }</Text>
//             //         <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้น 3 เข็ม { item.total_3rd_dose }</Text>
//             //     </TouchableOpacity>
//             // </View>
//             <Item
//                 item={item}
//                 // onPress={() => {
//                 //     setSelectProvince(item.province)
                    // navigation.navigate("ProvinceDetail", {province: selectProvince})
//                 //     console.log("selectProvince : ", selectProvince)
//                 // }}
//             />
//         )    
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={{ alignItems: "flex-end", marginTop: 20 }}>
//                 <TextInput style={styles.searchInput} keyboardType="default"></TextInput>
//                 <Text style={{ fontSize: 16, fontWeight: "500", fontFamily: 'Kanit_400Regular', color: "black", paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>ข้อมูลอัพเดตเมื่อ {updateDate}</Text>
//             </View>
//             <FlatList
//                 data={vaccineData}
//                 renderItem={renderVaccineItem}
//                 keyExtractor={item => item.province}
//                 extraData={selectProvince}
//             />
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//     },
//     vaccineContainer: {
//         flex: 1,
//         backgroundColor: "#27AE60",
//         // borderColor: "black",
//         // borderWidth: 2,
//         borderRadius: 10,
//         margin: 5
//     },
//     provinceText: {
//         fontSize: 18,
//         fontFamily: "Kanit_700Bold",
//         paddingLeft: 10,
//         color: "black",
//     },
//     doseText: {
//         fontSize: 16,
//         fontWeight: "400",
//         paddingLeft: 20,
//         color: "black",
//         fontFamily: "Kanit_400Regular"
//     },
//     searchInput: {
//         width: "80%",
//         borderRadius: 5,
//         borderWidth: 1,
//         fontSize: 16,
//         color: "black",
//         fontFamily: "Kanit_400Regular"
//     }
// })

// export default VaccineCoverage;


// import React, { useEffect, useState } from "react";
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, TextInput, Button } from "react-native";
// import LoadingSplash from "../components/LoadingSplash";
// import { 
//     Kanit_400Regular,
//     Kanit_500Medium,
//     Kanit_600SemiBold,
//     Kanit_700Bold,
//   } from '@expo-google-fonts/kanit'
// import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";

// const Vaccine = ({ navigation }) => {
//     const [vaccineData, setVaccineData] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [loadMore, setLoadMore] = useState(true)
//     const [updateDate, setUpdateDate] = useState("")
    
//     useEffect(() => {
//         getData()
//         return () => {

//         }
//     }, [])

//     const getData = async () => {
//         fetch('https://raw.githubusercontent.com/wiki/porames/the-researcher-covid-data/vaccination/provincial-vaccination.json').then((response) => response.json())
//         .then((responseJson) => {
//             return responseJson.data
//         })
//         .then( data => {
//             setVaccineData(data)
//             setLoading(false)
//             console.log(vaccineData)
//         })
//         .catch(error => {
//             console.log(error)
//         })
//     }

    // let [fontsLoaded] = useFonts({
    //     Kanit_400Regular,
    //     Kanit_500Medium,
    //     Kanit_600SemiBold,
    //     Kanit_700Bold,
    // })
    // if (!fontsLoaded) {
    //     return <AppLoading />
    // }

//     if (loading) {
//         console.log("loading")
//         return <LoadingSplash />
//     }else {
//         console.log("loading success!!!")
//     }
      
//     const renderVaccineItem = ({ item }) => {
//         return (
//             <View style={styles.vaccineContainer}>
//                 <TouchableOpacity>
//                     <Text style={styles.provinceText}>จังหวัด{ item.province }</Text>
//                     <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 1 เข็ม { item.total_1st_dose }</Text>
//                     <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 2 เข็ม { item.total_2nd_dose }</Text>
//                     <Text style={styles.doseText}>ได้รับวัคซีนกระตุ้น 3 เข็ม { item.total_3rd_dose }</Text>
//                 </TouchableOpacity>
//             </View>
//         )    
//     }

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* <View style={styles.searchContainer}> */}
//                 {/* <TextInput style={styles.searchInput} keyboardType="default"></TextInput> */}
//                 {/* <Text style={{ fontSize: 16, fontWeight: "500", fontFamily: 'Kanit_400Regular', color: "black", paddingRight: 10, paddingTop: 5, paddingBottom: 5 }}>ข้อมูลอัพเดตเมื่อ {updateDate}</Text> */}
//             {/* </View> */}
//             <FlatList
//                 data={vaccineData}
//                 renderItem={renderVaccineItem}
//                 keyExtractor={item => item.province}
//             />
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: "#fff",
//     },
//     vaccineContainer: {
//         // flex: 1,
//         backgroundColor: "#27AE60",
//         // borderColor: "black",
//         // borderWidth: 2,
//         borderRadius: 10,
//         margin: 5
//     },
//     // searchContainer: {
//     //     flex: 1,
//     //     backgroundColor: "pink",
//     // },
//     provinceText: {
//         fontSize: 18,
//         fontFamily: "Kanit_700Bold",
//         paddingLeft: 10,
//         color: "black",
//     },
//     doseText: {
//         fontSize: 16,
//         fontWeight: "400",
//         paddingLeft: 20,
//         color: "black",
//         fontFamily: "Kanit_400Regular"
//     },
//     searchInput: {
//         width: "80%",
//         borderRadius: 5,
//         borderWidth: 1,
//         fontSize: 16,
//         color: "black",
//         fontFamily: "Kanit_400Regular"
//     }
// })

// export default Vaccine;

import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, TextInput, Image, Button } from "react-native";
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
        console.log("render DidMount")
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
  
    // Item = ({ item, onPress }) => {
    //     return(
    //         <View style={styles.vaccineBox}>
    //             <TouchableOpacity onPress={onPress}>
    //                 <Text style={styles.provinceText}>จังหวัด{ item.province }</Text>
    //                 <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 1 เข็ม { item.total_1st_dose }</Text>
    //                 <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 2 เข็ม { item.total_2nd_dose }</Text>
    //                 <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้น 3 เข็ม { item.total_3rd_dose }</Text>
    //             </TouchableOpacity>
    //         </View>
    //     )
    // } 

    searchFilter = (text) => {
        if (text) {
            const newData = this.state.vaccineData.filter((item) => {
                const itemData = item.province
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
        // let color
        // if (item.total_1st_dose >= 1000000) {
        //     color = "#27AE60";
        // }
        // if (item.total_1st_dose >= 500000 && item.total_1st_dose < 1000000 ) {
        //     color = "#52BE80";
        // }
        // if (item.total_1st_dose < 500000 ) {
        //     color = "#7DCEA0";
        // }
        return(
            // <View style={styles.vaccineBox, { backgroundColor: color }}>
            // {/* <View style={styles.vaccineBox}> */}
            //     <TouchableOpacity onPress={() => {
            //         console.log("Hello " + item.province)
            //     }}>
            //         <Text style={styles.provinceText}>{ item.province }</Text>
            //         <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 1 เข็ม { item.total_1st_dose }</Text>
            //         <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้นอย่างน่อย 2 เข็ม { item.total_2nd_dose }</Text>
            //         <Text style={styles.itemText}>ได้รับวัคซีนกระตุ้น 3 เข็ม { item.total_3rd_dose }</Text>
            //     </TouchableOpacity>
            // </View>
            <View style={{ flex: 1, margin: 5, backgroundColor: "#E5E7E9", borderRadius: 5, height: 50, justifyContent: 'center' }}>
            {/* <View style={styles.vaccineBox}> */}
                <TouchableOpacity onPress={() => {
                    console.log("Hello " + item.province)
                }}>
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
                    <SearchBar containerStyle={{ width: "100%",borderWidth: 1, borderRadius: 10}}
                        placeholder="ค้นหาจังหวัด..."
                        onChangeText={(text) => this.searchFilter(text)}
                        value={this.state.searchText}
                        platform="android"
                    />
                    {/* <TextInput style={styles.searchInput}
                        placeholder="ค้นหาจังหวัด"
                        value={this.state.searchText}
                        onChangeText={(text) => this.searchFilter(text)}
                        underlineColorAndroid="transparent"
                    ></TextInput> */}
                    <Text style={{ fontFamily: 'Kanit-Regular', fontSize: 16, alignSelf: 'flex-end', marginTop: 5 }}>ข้อมูลอัพเดตเมื่อ { this.state.updateDate }</Text>
                </View>
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
        marginLeft: 10,
        alignItems: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        marginRight: 5
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
