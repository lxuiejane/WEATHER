import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function CustomHeader() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Text style={styles.textHeader}>WEATHER FORECAST</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        height: 60
    },
    textHeader: {
        fontWeight: 800,
        fontSize: 20
    },
});