import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'



const { height, width } = Dimensions.get("screen")
export default function PermissionModal({ visible, onRequestClose, onAllowPermission }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalInner}>
                    <Text style={styles.modalText}>
                        Please allow location access to use this app
                    </Text>
                    <Text style={{ ...styles.text, color: "black", textAlign: "center" }}> This app uses your location to get personalized weather data for your current city</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => onRequestClose()}>
                            <Text style={{ ...styles.text, fontFamily: "Raleway-600" }}>No, Thanks</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ ...styles.modalButton, backgroundColor: "green" }}
                            onPress={() => {
                                onAllowPermission()
                                onRequestClose()
                            }}>
                            <Text style={{ ...styles.text, fontFamily: "Raleway-600" }}>Give Access</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalInner: {
        backgroundColor: 'white',
        height: height * 0.3,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: 'center',
        padding: 20,
    },
    modalText: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Raleway-600",
        marginBottom: 20,
    },
    modalButton: {
        width: "45%",
        height: 50,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },
    buttonsContainer: {
        marginTop: "auto",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    text: {
        color: "white",
        fontFamily: "Raleway-600",
        fontSize: 16
    },
})