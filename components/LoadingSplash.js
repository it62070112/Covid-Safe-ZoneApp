import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LoadingSplash = () => {

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>DATA LOADING..</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5E8E8"
    },

})

export default LoadingSplash;
