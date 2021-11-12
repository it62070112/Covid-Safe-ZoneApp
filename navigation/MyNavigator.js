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
// const StackMap = createNativeStackNavigator();
const DrawerReport = createDrawerNavigator();
const DrawerMap = createDrawerNavigator();

function SplashScreenFunc({ navigation }) {
    setTimeout(() => {
        // navigation.navigate("SplashPermission")
        navigation.navigate("HomeTabBar")
    }, 3000)
    return (
        <SplashScreen />
    )
}

//Stack Map
// function StackMapFunc({ navigation }) {
//     return (
//         <StackMap.Navigator>
//             <StackMap.Screen name="Map" component={MapMain}
//                 options={{
//                     headerRight: () => (
//                         <TouchableOpacity
//                             style={styles.buttonHeatMap}
//                             onPress={() => {
//                                 navigation.navigate("HeatMap")
//                             }}
//                         >
//                             <Text style={{ color: "#fff", fontSize: 17, fontFamily: 'Kanit_600SemiBold' }}>HeatMap</Text>
//                         </TouchableOpacity>
//                     )
//                 }}
//             />
//             <StackMap.Screen name="HeatMap" component={HeatMap}/>
//         </StackMap.Navigator>
//     )
// }

//Drawer Map
function DrawerMapFunc() {
    return(
        <DrawerMap.Navigator>
            <DrawerMap.Screen name="Map" component={MapMain}/>
            <DrawerMap.Screen name="HeatMap" component={HeatMap}/>
        </DrawerMap.Navigator>
    )
}

//Stack Province
function ProvinceScreenFunc() {
    return (
        <StackProvince.Navigator>
            <StackProvince.Screen name="VaccineCoverage" component={VaccineCoverage}
                options={{
                    title: "ยอดฉีดวัคซีนแยกตามจังหวัด",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular',
                    },
                }}
            />
            <StackProvince.Screen name="ProvinceDetail" component={ProvinceDetail}
                options={
                    ({ route }) => ({
                        title: route.params.province,
                    })
                }
            />
        </StackProvince.Navigator>
    )
}

function DrawerReportFunc() {
    return (
        <DrawerReport.Navigator>
            <DrawerReport.Screen name="DailyReportCovid19" component={DailyReport}
                options={{
                    title: "รานงานสถานการณ์โควิต19",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    headerStyle: {
                        backgroundColor: '#85C1E9'
                    }
                }}
            />
            <DrawerReport.Screen name="DailyReportCovidProvince" component={DailyReportCovidProvince}
                options={{
                    title: "รานงานสถานการณ์แยกตามจังหวัด",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    headerStyle: {
                        backgroundColor: '#85C1E9'
                    }
                }}
            />
        </DrawerReport.Navigator>
    )
}

//TabBar
function TabBarNavigatorFunc() {
    return (
        <TabBar.Navigator initialRouteName={"MapMain"}
            screenOptions={{
                // headerShown: false,
                tabBarActiveTintColor: "#27AE60",
                tabBarInactiveTintColor: "#ABB2B9",
                tabBarLabelStyle: {
                    fontSize: 15,
                    fontFamily: 'Kanit_400Regular',
                },
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}
        >
            {/* <TabBar.Screen name="MapMain" component={StackMapFunc}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        return <Entypo name="map" size={24} color={color}/>
                    }
                }}
            /> */}
            <TabBar.Screen name="MapMain" component={DrawerMapFunc}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => {
                        return <Entypo name="map" size={24} color={color}/>
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
            <TabBar.Screen name="Vaccine Coverage" component={ProvinceScreenFunc}
                options={{
                    headerShown: false,
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular',
                    },
                    tabBarIcon: ({ color }) => {
                        return <FontAwesome5 name="briefcase-medical" size={24} color={color}/>
                    }
                }}
            />
            {/* <TabBar.Screen name="DailyReportCovid19" component={DailyReport}
                options={{
                    title: "รานงานสถานการณ์โควิต19",
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="file-document" size={24} color={color} />
                    }
                }}
            /> */}
            <TabBar.Screen name="Test" component={DrawerReportFunc}
                options={{
                    headerShown: false,
                    headerTitleStyle: {
                        fontFamily: 'Kanit_400Regular'
                    },
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="file-document" size={24} color={color} />
                    }
                }}
            />
        </TabBar.Navigator>
    )
}

export default function MyNavigator() {
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
                {/* <StackSplash.Screen name="MapMain" component={MapMain}/> */}
                <StackSplash.Screen name="HomeTabBar" component={TabBarNavigatorFunc}/>
            </StackSplash.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    buttonHeatMap: {
        backgroundColor: '#E74C3C',
        padding: 10,
        borderRadius: 10,
    }
});