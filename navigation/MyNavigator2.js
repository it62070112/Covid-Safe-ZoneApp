import React from "react";
import { Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

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

//icon
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
const StackProvince = createNativeStackNavigator();
const DrawerReport = createDrawerNavigator();
const DrawerMap = createDrawerNavigator();

function SplashScreenFunc({ navigation }) {
    setTimeout(() => {
        navigation.navigate("HomeAll")
    }, 3000)
    return (
        <SplashScreen />
    )
}

//TabBar
function TabBarNavigatorFunc() {
    return (
        <TabBar.Navigator initialRouteName={"Home"}
            screenOptions={{
                tabBarActiveTintColor: "#27AE60",
                tabBarInactiveTintColor: "#AAB7B8",
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'Kanit_400Regular',
                },
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                    // backgroundColor: '#27AE60'
                }
            }}
        >
            <TabBar.Screen name="Home" component={Home}
                options={{
                    title: "Covid 19",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular',
                    },
                    // headerShown: false,
                    headerStyle: {
                        height: 20,
                        backgroundColor: '#48C9B0'
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="home" size={24} color={ color } />
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
                <StackSplash.Screen name="AddInfoVaccine" component={AddInfoVaccine}/>
            </StackSplash.Navigator>
        </NavigationContainer>
    )
}