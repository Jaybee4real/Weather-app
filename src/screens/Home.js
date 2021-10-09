import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Banner from '../Components/Banner'
import MDIcon from 'react-native-vector-icons/MaterialIcons'
import Forecast from '../Components/Forecast'
import { useDispatch, useSelector } from 'react-redux'
import PermissionModal from '../Components/PermissionModal'
import { getWeatherWhereOnEarth } from '../../store/app'
import { ScrollView } from 'react-native-gesture-handler'


export default function Home({ navigation, ...props }) {
    const dispatch = useDispatch()
    const state = useSelector(state => state.app)
    const [weatherDetails, setweatherDetails] = useState(state.weatherDetails)
    const [modalVisible, setModalVisible] = useState(state.permissionGiven)
    const [loading, setLoading] = useState(false)

    const getWeatherData = async () => {
        setLoading(true)
        await dispatch(getWeatherWhereOnEarth())
        setLoading(false)
    }

    useEffect(() => {
        getWeatherData()
    }, [])

    useEffect(() => {
        setweatherDetails(state.weatherDetails)
    }, [state])

    return (
        <>
            <View style={styles.headingContainer}>
                <TouchableOpacity style={styles.headingButton} onPress={() => navigation.push("Search")}>
                    <Text style={styles.headingText}>Search for places</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={getWeatherData}>
                    <MDIcon name="gps-fixed" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='#1E213A' barStyle="light-content" />
                <Banner currentWeather={weatherDetails} loading={loading} />
                <Forecast weatherList={weatherDetails} loading={loading} />
                <PermissionModal
                    visible={modalVisible}
                    onRequestClose={() => _getWeatherData()}
                    toggleModal={setModalVisible}
                />
            </ScrollView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E213A',
    },
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
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center"
    },
})