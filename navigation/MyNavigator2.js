import React, { useState } from "react";
import { Button, StyleSheet, TouchableOpacity, Text, View, LogBox } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator, DrawerContent, DrawerToggleButton } from "@react-navigation/drawer";

//screens
import MapMain from "../MapScreens/MapMain";
import HeatMap from "../MapScreens/HeatMap";
import DailyReport from "../screens/DailyReport";
import VaccineCoverage from "../screens/VaccineCoverage";
import HospitalMap from "../MapScreens/HospitalMap";
import SplashScreen from "../components/SplashScreen";
import TypeOfVaccine from "../screens/TypeOfVaccine";
import DailyReportCovidProvince from "../screens/DailyReportProvince";
import SplashPermission from "../components/SplashPermission";
import AddInfoVaccine from "../screens/AddInfoVaccine";
import VaccinationRates from "../screens/VaccinationRates";
import AllChartScreen from "../screens/AllChartScreen";
import ShowInfoVacUser from "../screens/ShowInfoVacUser";
import EditDataVac from "../screens/EditDataVac";

//icon
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

//component
import CustomHeaderButton from "../components/CustomHeaderButton";
import { DrawerActions } from "@react-navigation/routers";

//fonts
import {
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
} from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

//Redux
import { useSelector, useDispatch } from "react-redux";

const TabBar = createBottomTabNavigator();
const StackSplash = createNativeStackNavigator();
const StackDailyReport = createNativeStackNavigator();
const DrawerVaccine = createDrawerNavigator();
const StackAddInfo = createNativeStackNavigator();

function SplashScreenFunc({ navigation }) {
    setTimeout(() => {
        navigation.navigate("HomeAll")
    }, 3000)
    return (
        <SplashScreen />
    )
}

//Stack 
function StackDailyReportFunc({ navigation }) {
    return (
        <StackDailyReport.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <StackDailyReport.Screen name="DailyReport" component={DailyReport} />
            <StackDailyReport.Screen name="DailyReportCovidProvince" component={DailyReportCovidProvince} />
            <StackDailyReport.Screen name="AllChartScreen" component={AllChartScreen} />
        </StackDailyReport.Navigator>
    )
}

//Stack
function StackAddInfoFunc() {
    return (
        <StackAddInfo.Navigator
            // screenOptions={{
            //     headerShown: false
            // }}
        >
            <StackAddInfo.Screen name="AddInfoVaccine" component={AddInfoVaccine}
                options={{
                    headerShown: false
                }}
            />
            <StackAddInfo.Screen name="ShowInfoVacUser" component={ShowInfoVacUser}
                options={{
                    headerShown: false
                }}
            />
            <StackAddInfo.Screen name="EditDataVac" component={EditDataVac}/>
        </StackAddInfo.Navigator>
    )
}

//Drawer
function DrawerVaccineFunc({ navigation }) {
    return (
        <DrawerVaccine.Navigator initialRouteName="VaccinationRates"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#48C9B0'
                },
                headerTitleStyle: {
                    fontSize: 26,
                    fontFamily: 'Kanit_500Medium',
                    color: "#fff"
                },
                drawerActiveTintColor: "#48C9B0",
                drawerInactiveTintColor: "#808B96",
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Feather name="menu" size={28} color="#fff" />
                    </TouchableOpacity>
                ),
            }}
        >
            <DrawerVaccine.Screen name="VaccinationRates" component={VaccinationRates}
                options={{
                    headerTitle: "อัตราการฉีดวัคซีนทั้งประเทศ",
                    title: "อัตราการฉีดวัคซีนทั้งประเทศ",
                    drawerIcon: ({ color }) => {
                        // return <Foundation name="clipboard-notes" size={24} color={color} />
                        return <FontAwesome5 name="syringe" size={24} color={color} />
                    }
                }}
            />
            <DrawerVaccine.Screen name="VaccineCoverage" component={VaccineCoverage}
                options={{
                    headerTitle: "ข้อมูลการฉีดแยกตามโดส",
                    title: "ข้อมูลการฉีดแยกตามโดส",
                    drawerIcon: ({ color }) => {
                        // return <FontAwesome5 name="syringe" size={24} color={color} />
                        return <Foundation name="clipboard-notes" size={24} color={color} />
                    }
                }}
            />
            <DrawerVaccine.Screen name="TypeOfVaccine" component={TypeOfVaccine}
                options={{
                    title: "ข้อมูลการฉีดแยกตามผู้ผลิต",
                    headerTitle: "ข้อมูลการฉีดแยกตามผู้ผลิต",
                    drawerIcon: ({ color }) => {
                        return <FontAwesome5 name="chart-bar" size={24} color={color} />
                    }
                }}
            />
            <DrawerVaccine.Screen name="HeatMap" component={HeatMap}
                options={{
                    drawerIcon: ({ color }) => {
                        return <FontAwesome5 name="map-marked-alt" size={24} color={color} />
                    }
                }}
            />
        </DrawerVaccine.Navigator>
    )
}
//TabBar
function TabBarNavigatorFunc({ navigation }) {
    // const [test, setTest] = useState(true)
    const changeIcon = useSelector((state) => state.changeIcon.saveSuccess)
    // console.log("changeIcon from Navi : ", changeIcon)
    return (
        <TabBar.Navigator initialRouteName={"Home"}
            screenOptions={{
                tabBarActiveTintColor: "#48C9B0",
                tabBarInactiveTintColor: "#AAB7B8",
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'Kanit_400Regular',
                },
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    // backgroundColor: '#F2F3F4'
                },
                headerStyle: {
                    backgroundColor: '#48C9B0'
                },
            }}
        >
            <TabBar.Screen name="Home" component={StackDailyReportFunc}
                options={{
                    title: "Covid 19",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_500Medium',
                        fontSize: 35,
                        color: '#fff'
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="home" size={24} color={color} />
                    },
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item iconName="list-ul" onPress={() => { navigation.navigate("DailyReportCovidProvince") }} />
                            <Item iconName="chart-area" onPress={() => { navigation.navigate("AllChartScreen") }} />
                        </HeaderButtons>
                    ),
                }}
            />
            <TabBar.Screen name="HospitalMap" component={HospitalMap}
                options={{
                    headerTitle: "ศูนย์ฉีดวัคซีน",
                    headerTitleStyle: {
                        fontSize: 26,
                        fontFamily: 'Kanit_500Medium',
                        color: "#fff"
                    },
                    tabBarLabel: "ศูนย์ฉีดวัคซีน",
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="hospital-alt" size={24} color={color} />
                    }
                }}
            />
            <TabBar.Screen name="AddInfoVaccineMain" component={StackAddInfoFunc}
                options={{
                    headerTitle: "เพิ่มข้อมูลการฉีดวัคซีน",
                    headerTitleStyle: {
                        fontSize: 26,
                        fontFamily: 'Kanit_500Medium',
                        color: "#fff"
                    },
                    tabBarButton: () => {
                        return (
                            <TouchableOpacity
                                style={{
                                    top: -10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => {
                                    navigation.navigate("AddInfoVaccineMain")
                                }}
                            >
                                {/* <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#48C9B0', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="plus" size={28} color="#fff" />
                                </View> */}
                                {
                                    changeIcon != null ?
                                    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#E74C3C', justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign name="edit" size={28} color="#fff" />
                                    </View>
                                    :
                                    <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#48C9B0', justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome5 name="plus" size={28} color="#fff" />
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            <TabBar.Screen name="MapMain" component={MapMain}
                options={{
                    headerTitle: "Map",
                    headerStyle: {
                        backgroundColor: '#48C9B0'
                    },
                    headerTitleStyle: {
                        fontSize: 26,
                        fontFamily: 'Kanit_500Medium',
                        color: "#fff"
                    },
                    tabBarLabel: "Map",
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="map-marked-alt" size={24} color={color} />
                    },
                }}
            />
            <TabBar.Screen name="VaccineCoverageAll" component={DrawerVaccineFunc}
                options={{
                    headerTitle: "ข้อมูลการฉีดวัคซีน",
                    headerTitleStyle: {
                        fontSize: 26,
                        fontFamily: 'Kanit_500Medium',
                        color: "#fff"
                    },
                    tabBarLabel: "Vaccine",
                    tabBarIcon: ({ color }) => {
                        // return <FontAwesome5 name="briefcase-medical" size={24} color={color}/>
                        return <FontAwesome5 name="syringe" size={24} color={color} />
                    },
                    headerShown: false
                }}
            />
        </TabBar.Navigator>
    )
}

LogBox.ignoreLogs(['Cannot update a component (`TabBarNavigatorFunc`)'])

const MyNavigator2 = () => {
    let [fontsLoaded] = useFonts({
        Kanit_400Regular,
        Kanit_500Medium,
        Kanit_600SemiBold,
        Kanit_700Bold,
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }

    return (
        //Stack is Main Navigator
        <NavigationContainer>
            <StackSplash.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <StackSplash.Screen name="SplashScreen" component={SplashScreenFunc} />
                {/* <StackSplash.Screen name="SplashPermission" component={SplashPermission}/> */}
                <StackSplash.Screen name="HomeAll" component={TabBarNavigatorFunc} />
                {/* <StackSplash.Screen name="AddInfoVaccine" component={AddInfoVaccine}/> */}
            </StackSplash.Navigator>
        </NavigationContainer>
    )
}
export default MyNavigator2;