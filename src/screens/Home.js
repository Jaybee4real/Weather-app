import React, { useEffect, useState } from 'react'
import { StyleSheet, StatusBar, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Banner from '../Components/Banner'
import Forecast from '../Components/Forecast'
import { useDispatch, useSelector } from 'react-redux'
import PermissionModal from '../Components/PermissionModal'
import { getWeatherWithCurrentLocation, getWeather, checkPermission } from '../../store/app'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderComponent from '../Components/HeaderComponent'


export default function Home({ navigation, ...props }) {
    const dispatch = useDispatch()
    const state = useSelector(state => state.app)
    const [weatherDetails, setweatherDetails] = useState(state.weatherDetails)
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const _getWeatherWithLocation = async () => {
        setLoading(true)
        const { error } = await dispatch(getWeatherWithCurrentLocation())
        if (error) {
            Alert.alert('Error', error)
        }
        setLoading(false)
    }

    const getDefaultLocationWeather = async () => {
        setLoading(true)
        await dispatch(getWeather(2459115)) // set default to be New York
        setLoading(false)
    }

    const handleRequestWeatherWithLocation = async () => {
        if (await dispatch(checkPermission()) === false)
            setModalVisible(true)
        // else _getWeatherWithLocation()
    }

    useEffect(() => {
        getDefaultLocationWeather()
    }, [])

    useEffect(() => {
        setweatherDetails(state.weatherDetails)
    }, [state])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent onRequestWeatherWithLocation={handleRequestWeatherWithLocation} />
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor='#1E213A' barStyle="light-content" />
                <Banner currentWeather={weatherDetails} loading={loading} />
                <Forecast weatherList={weatherDetails} loading={loading} />
                <PermissionModal
                    visible={modalVisible}
                    onAllowPermission={_getWeatherWithLocation}
                    onRequestClose={() => modalVisible && setModalVisible(false)}
                    toggleModal={setModalVisible}
                />
            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E213A',
    },
})