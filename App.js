import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MyNavigator from "./navigation/MyNavigator";
import MyNavigator2 from "./navigation/MyNavigator2";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import LatLongReducer from "./store/reducers/LatLongReducer";

const rootReducer = combineReducers({
  LatLong: LatLongReducer,
})

const store = createStore(rootReducer);

export default function App() {
  return (
    // <MyNavigator />
    <Provider store={store}>
      <MyNavigator2 />  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});