import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { NewCaseInMont } from "../Data/mockData";

const MyChart = () => {
    const MyBarChart = () => {
        return (
            <>
                <BarChart
                    data={{
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                        datasets: [
                            {
                                data: [8165, 7574, 7679, 7982, 8148, 8467, 7960, 7592, 6904],
                            },
                        ],
                    }}
                    width={Dimensions.get('window').width - 16}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        // color: (opacity = 1) => `#E74C3C`,
                        style: {
                            borderRadius: 16,
                            backgroundColor: 'red'
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </>
        );
    };
    return (
        <View style={styles.container}>
            <MyBarChart />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: 'center'
    },
});
export default MyChart;


// import React, { Component } from 'react'
// import { StackedBarChart } from 'react-native-svg-charts'

// class TestChart extends Component {
//     render() {
//         const data = [
//             {
//                 month: new Date(2015, 0, 1),
//                 apples: 3840,
//                 bananas: 1920,
//                 cherries: 960,
//                 dates: 400,
//                 oranges: 400,
//             },
//             {
//                 month: new Date(2015, 1, 1),
//                 apples: 1600,
//                 bananas: 1440,
//                 cherries: 960,
//                 dates: 400,
//             },
//             {
//                 month: new Date(2015, 2, 1),
//                 apples: 640,
//                 bananas: 960,
//                 cherries: 3640,
//                 dates: 400,
//             },
//             {
//                 month: new Date(2015, 3, 1),
//                 apples: 3320,
//                 bananas: 480,
//                 cherries: 640,
//                 dates: 400,
//             },
//         ]

//         // const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
//         const colors = ['red']
//         const keys = ['apples', 'bananas', 'cherries', 'dates']

//         return (
//             <StackedBarChart
//                 style={{ height: 200 }}
//                 keys={keys}
//                 colors={colors}
//                 data={data}
//                 showGrid={false}
//                 contentInset={{ top: 30, bottom: 30 }}
//             />
//         )
//     }
// }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: "#fff",
// //         justifyContent: 'center'
// //     },
// // });
// export default TestChart;