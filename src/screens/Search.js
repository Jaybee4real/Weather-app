import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'


const { height, width } = Dimensions.get('window')

export default function Search() {
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search" />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Search</Text>
                </TouchableOpacity>
            </View>
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
        paddingVertical: 15,
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
})