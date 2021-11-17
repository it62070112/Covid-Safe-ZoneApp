# Covid-Safe-ZoneApp

*****ถ้า Run ไม่ได้ ให้ npm install*****

ถ้ารันไม่ได้ลองแก้ตาม Error ดูจ้า

expo install @react-navigation/native
expo install react-native-screens react-native-safe-area-context

*****************************************************************************
expo install @react-navigation/native-stack
expo install @react-navigation/bottom-tabs

*****************************************************************************

expo install @react-navigation/drawer
expo install react-native-gesture-handler react-native-reanimated

*****************************************************************************
ถ้า install ก่อนหน้าแล้ว Error ใชัอันนี้
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

*****************************************************************************
expo install @expo/vector-icons

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
