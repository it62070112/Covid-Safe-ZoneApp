import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import NewCaseLineChart from "../components/NewCaseLineChart";
import NewRecoverLineChart from "../components/NewRecoverLineChart";
import DeathLineChart from "../components/DeathLineChart";

const AllChartScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView>
                <NewCaseLineChart />
                <NewRecoverLineChart />
                <DeathLineChart />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: '#48C9B0',
        // marginBottom: 50
    },
    header: {
        color: "#fff",
        fontFamily: "Kanit_600SemiBold",
        fontSize: 25,
        marginLeft: 10
    }
});
export default AllChartScreen;
