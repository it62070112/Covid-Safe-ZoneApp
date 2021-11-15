import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MyNavigator from "./navigation/MyNavigator";
import PickerProvince from "./components/PickerProvince";
import SplashPermission from "./components/SplashPermission";
import MyNavigator2 from "./navigation/MyNavigator2";
import DailyReportCovidProvince from "./screens/DailyReportProvince";
import AllChartScreen from "./screens/AllChartScreen";

export default function App() {
  return (
    // <MyNavigator />
    <MyNavigator2 />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});