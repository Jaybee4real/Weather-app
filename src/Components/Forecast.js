import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import WeatherCard from './WeatherCard'

export default function Forecast({ weatherList, loading }) {
    return (
        <View style={styles.container}>
            {loading === false && weatherList.length > 0 && weatherList.map((weather, index) => {
                return <WeatherCard key={index} weather={weather} />
            })}
            <View style={styles.indicatorContainer }>
                {loading && <View style={styles.loadingContainer}>
                    <ActivityIndicator color="white" size="large" />
                </View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#100E1D',
    },
    indicatorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
    }
})