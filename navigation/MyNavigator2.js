import React from "react";
import { Button, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
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
// import Home from "../screens/Home";
import AllChartScreen from "../screens/AllChartScreen";

//icon
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons'; 

//component
import CustomHeaderButton from "../components/CustomHeaderButton";

//fonts
import { 
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  } from '@expo-google-fonts/kanit'
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const TabBar = createBottomTabNavigator();
const StackSplash = createNativeStackNavigator();
const StackDailyReport = createNativeStackNavigator();
// const StackProvince = createNativeStackNavigator();
const DrawerVaccine = createDrawerNavigator();

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

//Drawer
function DrawerVaccineFunc({ navigation }) {
    return (
        <DrawerVaccine.Navigator initialRouteName="VaccineCoverage"
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
                drawerInactiveTintColor: "#707B7C",
            }}
        >
            <DrawerVaccine.Screen name="VaccineCoverage" component={VaccineCoverage} 
                options={{
                    headerTitle: "ข้อมูลการฉีดวัคซีน",
                    drawerIcon: ({ color }) => {
                        return <Foundation name="clipboard-notes" size={24} color={ color } />
                    }
                }}
            />
            <DrawerVaccine.Screen name="TypeOfVaccine" component={TypeOfVaccine} 
                options={{
                    title: "ข้อมูลการฉีดแยกตามผู้ผลิต",
                    headerTitle: "ข้อมูลการฉีดแยกตามผู้ผลิต",
                    drawerIcon: ({ color }) => {
                        return <Foundation name="clipboard-notes" size={24} color={ color } />
                    }
                }}
            />
            <DrawerVaccine.Screen name="HeatMap" component={HeatMap} 
                options={{
                    drawerIcon: ({ color }) => {
                        return <FontAwesome5 name="map-marked-alt" size={24} color={ color }/>
                    }
                }}
            />
        </DrawerVaccine.Navigator>
    )
}
//TabBar
function TabBarNavigatorFunc({ navigation }) {
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
                        return <FontAwesome5 name="home" size={24} color={ color } />
                    },
                    headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                          <Item iconName="list-ul" onPress={() => { navigation.navigate("DailyReportCovidProvince") }}/>
                          <Item iconName="chart-area" onPress={() => { navigation.navigate("AllChartScreen") }}/>
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
                        return <FontAwesome5 name="hospital-alt" size={24} color={ color } />
                    }
                }}
            />
            <TabBar.Screen name="AddInfoVaccine" component={AddInfoVaccine}
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
                                onPress={() => navigation.navigate("AddInfoVaccine")}
                            >
                                <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: '#48C9B0', justifyContent: 'center', alignItems: 'center' }}>
                                    <FontAwesome5 name="plus" size={28} color="#fff"/>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                }}
            />
            {/* <TabBar.Screen name="MapMain" component={StackMapFunc}
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
                        return <FontAwesome5 name="map-marked-alt" size={24} color={ color } />
                    },
                    headerShown: false
                }}
            /> */}
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
                        return <FontAwesome5 name="map-marked-alt" size={24} color={ color } />
                    },
                }}
            />
            {/* <TabBar.Screen name="VaccineCoverage" component={VaccineCoverage}
                options={{
                    headerTitle: "ข้อมูลการฉีดวัคซีน",
                    headerStyle: {
                        backgroundColor: '#48C9B0'
                    },
                    headerTitleStyle: {
                        fontSize: 26,
                        fontFamily: 'Kanit_500Medium',
                        color: "#fff"
                    },
                    tabBarLabel: "Vaccine",
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="briefcase-medical" size={24} color={color}/>
                    }
                }}
            /> */}
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
                        return <FontAwesome5 name="briefcase-medical" size={24} color={color}/>
                    },
                    headerShown: false
                }}
            />
        </TabBar.Navigator>
    )
}

export default function MyNavigator2() {
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
                <StackSplash.Screen name="SplashScreen" component={SplashScreenFunc}/>
                {/* <StackSplash.Screen name="SplashPermission" component={SplashPermission}/> */}
                <StackSplash.Screen name="HomeAll" component={TabBarNavigatorFunc}/>
                {/* <StackSplash.Screen name="AddInfoVaccine" component={AddInfoVaccine}/> */}
            </StackSplash.Navigator>
        </NavigationContainer>
    )
}