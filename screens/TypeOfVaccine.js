import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TypeOfVaccine = () => {
    return (
        <View style={styles.container}>
            <Text>Hello TypeOfVaccine Page</Text>
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

export default TypeOfVaccine;