import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { convertUnit, formatDate } from '../helpers'
import WeatherImage from './WeatherImage'

const { width, height } = Dimensions.get('window')
export default function WeatherCard({ weather }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatDate(weather.applicable_date)}</Text>
            <WeatherImage
                type={weather.weather_state_abbr}
                imageStyles={{ height: 100, width: 100, marginLeft: -10 }}
            />
            <View style={styles.tempContainer}>
                <Text style={styles.text}>{convertUnit(weather.min_temp)}</Text>
                <Text style={styles.text}>{convertUnit(weather.max_temp)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: width / 2 - 40,
        margin: 10,
        minHeight: 220,
        backgroundColor: '#1E213A',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
        color: "#A09FB1",
        fontFamily: "Raleway-600",
        fontSize: 17,
        marginTop: 20
    },
    tempContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingHorizontal: 20,
        marginTop: 20
    }
})
