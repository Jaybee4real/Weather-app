import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import WeatherImage from './WeatherImage'
import Icon from "react-native-vector-icons/FontAwesome5"
import { useSelector } from 'react-redux'
import { convertUnit } from '../helpers'



const { height, width } = Dimensions.get('screen')
export default function Banner({ currentWeather, loading }) {
    const state = useSelector(state => state.app)

    return (
        <ScrollView style={styles.container}>
            <Image
                source={require('../../assets/images/Cloud-background.png')}
                style={styles.backgroundImage}
                resizeMethod="resize"
                resizeMode="cover"
            />
            {loading &&
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color="white" size="large" />
                </View>}
            {!loading &&
                <View>
                    <WeatherImage type={currentWeather[0]?.weather_state_abbr} />
                    <Text style={styles.bannerText}>
                        {convertUnit(currentWeather[0]?.the_temp, state.activeMeasureType)}
                    </Text>
                    <Text style={styles.weatherType}>{currentWeather[0]?.weather_state_name}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.text}>Today</Text>
                        <Text style={styles.seperator}>•</Text>
                        <Text style={styles.text}>
                            {new Date(currentWeather[0]?.applicable_date).toDateString()}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Icon name="map-marker-alt" size={15} color="white" />
                        <Text style={styles.locationText}>
                            {state.activeCity.title}
                        </Text>

                    </View>

                </View>
            }
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 50,
        maxWidth: width > 400 ? 400 : width,
    },
    text: {
        color: "#A09FB1",
        fontFamily: "Raleway-600",
        fontSize: 16
    },
    backgroundImage: {
        position: 'absolute',
        width: width + 50,
        maxHeight: height * 0.4,
        top: -50,
        opacity: 0.3,
        left: 0,
        bottom: 0,
        right: 0,
    },
    loadingContainer: {
        alignItems: "center",
        marginTop: 20,
        height: height * 0.4,
        justifyContent: "center"
    },
    bannerText: {
        fontFamily: "Raleway-600",
        fontSize: 140,
        color: "white",
        textAlign: "center",
        marginTop: 20
    },
    weatherType: {
        fontFamily: "Raleway-600",
        fontSize: 25,
        color: "white",
        textAlign: "center",
        marginTop: 10
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
    },
    seperator: {
        fontSize: 20,
        color: "white",
        marginHorizontal: 10
    },
    locationContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    locationText: {
        textAlign: "center",
        fontFamily: "Raleway-600",
        fontSize: 17,
        marginLeft: 10,
        color: "#A09FB1"
    }
})