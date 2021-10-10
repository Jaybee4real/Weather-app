import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import MDIcon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMeasureType } from '../../store/app'

export default function HeaderComponent({ onRequestWeatherWithLocation }) {
    const navigation = useNavigation()
    const state = useSelector(state => state.app)
    const { activeMeasureType } = state
     const dispatch = useDispatch()


    return (
        <View style={styles.headingContainer}>
            <TouchableOpacity style={styles.headingButton} onPress={() => navigation.push("Search")}>
                <Text style={styles.headingText}>Search for places</Text>
            </TouchableOpacity>
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={async () => onRequestWeatherWithLocation()}>
                    <MDIcon name="gps-fixed" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor:
                            activeMeasureType === "celsius"
                                ? "white"
                                : "#6E707A"
                    }}
                    onPress={() => dispatch(toggleMeasureType("celsius"))}>
                    <Text style={{
                        ...styles.tempText,
                        color: activeMeasureType === "celsius"
                            ? "black"
                            : "white"
                    }}>°C</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        ...styles.iconContainer,
                        backgroundColor:
                            activeMeasureType === "fahrenheit"
                                ? "white"
                                : "#6E707A"
                    }}
                    onPress={() => dispatch(toggleMeasureType("fahrenheit"))}>
                    <Text style={{
                        ...styles.tempText,
                        color: activeMeasureType === "fahrenheit"
                            ? "black"
                            : "white"
                    }}>°F</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    headingContainer: {
        padding: 20,
        // margin: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#1E213A',
        zIndex: -1
    },
    headingButton: {
        backgroundColor: '#6E707A',
        padding: 10,
        borderRadius: 3,
    },
    headingText: {
        fontFamily: "Raleway-600",
        textAlign: "center",
        fontSize: 15,
        color: "white"
    },
    iconContainer: {
        backgroundColor: '#6E707A',
        height: 40,
        width: 40,
        marginHorizontal: 3,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    rightContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    tempText: {
        fontFamily: "Raleway-700",
        fontSize: 17,
        marginTop: -2,
        color: "white"
    }
})