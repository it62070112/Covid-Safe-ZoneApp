import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProvinceDetail = () => {
    return (
        <View style={styles.container}>
            <Text>Hello ProvinceDetail Page</Text>
        </View>
    )
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})

export default ProvinceDetail;