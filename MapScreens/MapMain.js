import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, Platform, Alert, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle, Callout } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

class Map extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 14.0208391,
                        longitude: 100.52502759999993,
                        latitudeDelta: 0.123,
                        longitudeDelta: 0.123,
                    }}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={{ latitude: 14.0208391, longitude: 100.52502759999993 }}>
                        <Callout>
                            <Text>Female</Text>
                            <Text>Callout TEXT</Text>
                            <Text>Callout TEXT</Text>
                        </Callout>
                    </Marker>

                    {/* <Circle
                        center={{ latitude: 14.0208391, longitude: 100.52502759999993 }}
                        radius={500}
                        fillColor="rgb(169, 223, 191)"
                    /> */}
                    
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});

export default Map;