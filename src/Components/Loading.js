import React from 'react'
import { View, StyleSheet, Image, StatusBar } from 'react-native'

export default function Loading() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#1E213A' barStyle="light-content" />
            <Image source={require('../../assets/images/LightCloud.png')} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E213A',
    }
})
