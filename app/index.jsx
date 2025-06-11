import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function App() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.main}>
            <View>
                <Text style={styles.welcomeText}>Welcome!<br />
                Let's get you started!</Text>
                <TouchableOpacity style={styles.button} onPress={() => router.push('/screens/home')}>Yes, I want to see the weather!</TouchableOpacity>
            </View>
        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    background: StyleSheet.absoluteFillObject,
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    welcomeText: {
        fontWeight: 900,
        fontSize: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#A2D0F0',
        color: 'white',
        borderRadius: 5,
        padding: 15,
        fontWeight: 100,
        marginTop: 20,
        borderColor: '#456B87',
        borderWidth: 1
    },
})


