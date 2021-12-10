import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MyNavigator from "./navigation/MyNavigator";
import MyNavigator2 from "./navigation/MyNavigator2";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import LatLongReducer from "./store/reducers/LatLongReducer";
import changeIconReducer from "./store/reducers/changeIconReducer";

import SplashScan from "./components/SplashScan";

const rootReducer = combineReducers({
  LatLong: LatLongReducer,
  changeIcon: changeIconReducer,
})

const store = createStore(rootReducer);

export default function App() {
  return (
    // <MyNavigator />
    <Provider store={store}>
      <MyNavigator2 />  
      {/* <SplashScan /> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});