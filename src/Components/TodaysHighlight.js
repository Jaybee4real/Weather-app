import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import FAIcon from "react-native-vector-icons/FontAwesome5"
import { rotateIconBasedOnDirection } from '../helpers'
import * as Progress from 'react-native-progress';


const { height, width } = Dimensions.get('window')
export default function TodaysHighlight({ currentWeather, loading }) {

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" style={styles.loadingIndicator} />}
            {!loading &&
                <>
                    <View style={styles.highlightItemContainer}>
                        <Text style={styles.title}>Wind Status</Text>
                        <View style={{ ...styles.row, marginBottom: 30 }}>
                            <Text style={styles.itemValue}>{Math.round(currentWeather[0]?.wind_speed)}</Text>
                            <Text style={styles.valueUnit}>km/h</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.iconContainer}>
                                <FAIcon
                                    name="location-arrow"
                                    style={{
                                        ...styles.icon,
                                        transform: [{
                                            rotate: rotateIconBasedOnDirection(currentWeather[0]?.wind_direction_compass)
                                                + 'deg'
                                        }]
                                    }}
                                />
                            </View>
                            <Text style={styles.title}>{currentWeather[0]?.wind_direction_compass}</Text>
                        </View>
                    </View>
                    <View style={styles.highlightItemContainer}>
                        <Text style={styles.title}>Humidity</Text>
                        <Text style={styles.itemValue}>{Math.round(currentWeather[0]?.humidity)}%</Text>
                        <Progress.Bar
                            progress={currentWeather[0] ? currentWeather[0]?.humidity / 100 : 0}
                            width={width / 2 + 20}
                            height={10} color="#FFEC65"
                            borderWidth={0}
                            unfilledColor="#FFF"
                        />
                    </ View>
                    <View style={styles.highlightItemContainer}>
                        <Text style={styles.title}>Visibility</Text>
                        <View style={styles.row}>
                            <Text style={styles.itemValue}>{Math.round(currentWeather[0]?.visibility * 10) / 10}</Text>
                            <Text style={styles.valueUnit}>km</Text>
                        </View>
                    </View>
                    <View style={styles.highlightItemContainer}>
                        <Text style={styles.title}>Air Pressure</Text>
                        <View style={styles.row}>
                            <Text style={styles.itemValue}>{currentWeather[0]?.air_pressure}</Text>
                            <Text style={styles.valueUnit}>mb</Text>
                        </View>
                    </View>
                </>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 200,
        backgroundColor: '#100E1D',
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    highlightItemContainer: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        margin: 20,
        borderRadius: 3,
        width: width - 40,
        maxWidth: 400,
        borderBottomWidth: 1,
        backgroundColor: '#1E213A',
        minHeight: 210,
    },
    loadingIndicator: {
        color: "white",
        alignSelf: "center",
        marginTop: "50%"
    },
    title: {
        fontSize: 18,
        fontFamily: "Raleway-600",
        color: 'white',
        // marginBottom: 10
    },
    itemValue: {
        fontSize: 66,
        color: "white",
        fontFamily: "Raleway-800",
    },
    valueUnit: {
        fontSize: 40,
        fontFamily: "Raleway-500",
        color: "white",
        marginTop: "auto"
    },
    itemSubtitle: {
        fontSize: 14,
        color: '#000'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#FFFFFF4D',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 16,
        color: '#FFFFFF',
    }
})

