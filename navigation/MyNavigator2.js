import React from "react";
import { Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

//screens
import MapMain from "../MapScreens/MapMain";
import HeatMap from "../MapScreens/HeatMap";
import DailyReport from "../screens/DailyReport";
import VaccineCoverage from "../screens/VaccineCoverage";
import HospitalMap from "../MapScreens/HospitalMap";
import SplashScreen from "../components/SplashScreen";
import ProvinceDetail from "../screens/ProvinceDetail";
import DailyReportCovidProvince from "../screens/DailyReportProvince";
import SplashPermission from "../components/SplashPermission";
import AddInfoVaccine from "../screens/AddInfoVaccine";
import Home from "../screens/Home";
import AllChartScreen from "../screens/AllChartScreen";

//icon
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

function SplashScreenFunc({ navigation }) {
    setTimeout(() => {
        navigation.navigate("HomeAll")
    }, 3000)
    return (
        <SplashScreen />
    )
}
//Stack 
function StackDailyReportFunc() {
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
                }
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
                    headerStyle: {
                        backgroundColor: '#48C9B0'
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
                    title: "ศูนย์ฉีดวัคซีน",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="hospital-alt" size={24} color={ color } />
                    }
                }}
            />
            <TabBar.Screen name="AddInfoVaccine" component={AddInfoVaccine}
                options={{
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    // tabBarIcon: ({ color }) => {
                    //     return <FontAwesome5 name="map-marked-alt" size={24} color={ color } />
                    // }
                }}
            />
            <TabBar.Screen name="MapMain" component={MapMain}
                options={{
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="map-marked-alt" size={24} color={ color } />
                    }
                }}
            />
            <TabBar.Screen name="VaccineCoverage" component={VaccineCoverage}
                options={{
                    // headerShown: false,
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular',
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="briefcase-medical" size={24} color={color}/>
                    }
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