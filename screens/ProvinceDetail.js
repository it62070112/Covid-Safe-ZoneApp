import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProvinceDetail = ({ route }) => {
    return (
        <View style={styles.container}>
            <Text>{ route.params.province }</Text>
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