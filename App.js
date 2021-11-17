import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MyNavigator from "./navigation/MyNavigator";
import MyNavigator2 from "./navigation/MyNavigator2";

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