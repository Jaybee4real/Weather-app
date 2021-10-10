import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Keyboard, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MDIcon from 'react-native-vector-icons/MaterialIcons'
import { useDispatch } from 'react-redux'
import { getWeather, searchLocations, setActiveCity } from '../../store/app'
import { _getWeatherWithLocation } from "./Home"

const { height, width } = Dimensions.get('window')

export default function Search({ navigation, ...props }) {
    const [inputValue, setInputValue] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [activeItem, setActiveItem] = useState("")
    const dispatch = useDispatch()

    handleSearch = async () => {
        if (inputValue.trim() === "") return
        setLoading(true)
        const data = await dispatch(searchLocations(inputValue))
        setResults(data)
        setLoading(false)
    }


    const handleCitySelect = async (city) => {
        setActiveItem(city.woeid)
        console.log(city)
        await dispatch(setActiveCity(city))
        await dispatch(getWeather(city.woeid))
        navigation.goBack()
    }

    // Makeshift debounce
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            handleSearch()
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [inputValue]);


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                <MDIcon name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    placeholder="Search"
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.push("Search")}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.resultCounter}>{results.length} result(s)</Text>
            {loading && <ActivityIndicator size="large" color="#fff" />}
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.resultsContainer}
                onScrollBeginDrag={() => Keyboard.dismiss()}>
                {results.map((city) => {
                    return (
                        <TouchableOpacity style={styles.resultItem} key={city.woeid} onPress={() => handleCitySelect(city)}>
                            <Text style={styles.text}>{city.title}</Text>
                            {activeItem === city.woeid && <ActivityIndicator size="small" color="#fff" />}
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E213A',
    },
    searchContainer: {
        backgroundColor: '#1E213A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 10,
    },
    searchInput: {
        backgroundColor: '#fff',
        width: width - 150,
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 20,
        fontSize: 16,
        marginLeft: 5,
        color: '#000',
    },
    button: {
        backgroundColor: '#3C47E9',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        marginRight: 5,
        borderRadius: 5,
    },
    text: {
        color: "white",
        fontFamily: "Raleway-600",
        fontSize: 16.5
    },
    closeBtn: {
        marginLeft: 'auto',
        marginRight: 15,
        marginTop: 20,
        marginBottom: 10
    },
    resultsContainer: {
        backgroundColor: '#1E213A',
        paddingHorizontal: 10,
        paddingBottom: 50,
    },
    resultCounter: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Raleway-600',
        marginVertical: 10,
        marginRight: 15,
        textAlign: "right"
    },
    resultItem: {
        // backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#616475",
        padding: 10,
        minHeight: 50,
        width: "100%",
        marginVertical: 5,
        borderRadius: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

})