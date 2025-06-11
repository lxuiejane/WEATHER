import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader';

export default function HomeScreen() {

    const apiKey = "22cb5ca1d24119f664a19624bf75938a";
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const currentWeather = weather?.list?.[0]?.weather?.[0]?.main || 'Default';

    const getWeatherHandler = () => {
        if (!city.trim()) return;

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found!");
                }
                return response.json();
            })
            .then((data) => {
                setWeather(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError(err.message);
                setWeather(null);
            });
    };

    const backgroundGradients = {
        Clear: ['#E4A56A', '#FFD787'],
        Clouds: ['#CBCBCB', '#9A9A9A'],
        Rain: ['#456B87', '#A0BCD0'],
        Snow: ['#e6dada', '#274046'],
        Haze: ['#3e5151', '#decba4'],
        Mist: ['#606c88', '#3f4c6b'],
        Default: ['#5b84b9', '#a7c6f6'],
    };

    const backgroundHeader = {
        Clear: ['#E4A56A'],
        Clouds: ['#CBCBCB'],
        Rain: ['#456B87'],
        Snow: ['#e6dada'],
        Haze: ['#3e5151'],
        Mist: ['#606c88'],
        Default: ['#5b84b9'],
    }

    const background = {
        Clear: ['#FFD787'],
        Clouds: ['#9A9A9A'],
        Rain: ['#57768C'],
        Snow: ['#274046'],
        Haze: ['#decba4'],
        Mist: ['#3f4c6b'],
        Default: ['#a7c6f6'],
    }

    const groupByDay = (list) => {
        const days = {};

        list.forEach((item) => {
            const dateObj = new Date(item.dt * 1000);
            const dayKey = dateObj.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
            }).toUpperCase();

            if (!days[dayKey]) {
                days[dayKey] = item;
            }
        });

        return Object.entries(days).slice(0, 5);
    };

    const submitForm = (e) => {
        e.preventDefault();
        getWeatherHandler();
    };

    return (
        <SafeAreaView style={styles.main}>
            <CustomHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.tempoBack}>
                    <LinearGradient
                        colors={backgroundHeader[currentWeather] || backgroundHeader.Default}
                        style={styles.searchBar}
                    >
                        <View style={styles.searchBar}>
                            <TextInput
                                placeholder="INSERT CITY NAME"
                                value={city}
                                style={styles.inputBar}
                                onChangeText={(text) => setCity(text)}
                            />
                            <TouchableOpacity style={styles.buttonSearch} onPress={getWeatherHandler}>
                                <Text style={styles.buttonText}>SEARCH</Text>
                            </TouchableOpacity>
                            {error && <Text style={styles.errorText}>Fout: {error}</Text>}
                        </View>
                    </LinearGradient>

                    {weather?.list && (
                        <LinearGradient
                            colors={backgroundGradients[currentWeather] || backgroundGradients.Default}
                            style={styles.weatherContainer}
                        >
                            <Text style={styles.cityName}>
                                {weather.city.name.toUpperCase()},
                            </Text>
                            <View style={styles.celciusContainer}>
                                <Text style={styles.date}>TODAY,</Text>
                                <View style={styles.tempSection}>
                                    <ImageBackground
                                        source={{ uri: `https://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png` }}
                                        style={styles.weatherIcon}
                                        imageStyle={{ opacity: 0.3 }}
                                    >
                                        <Text style={styles.tempText}>
                                            {Math.floor(weather.list[0].main.temp)}° C
                                        </Text>
                                    </ImageBackground>
                                </View>
                                <View style={styles.tempExtra}>
                                    <Text>WIND: {weather.list[0].wind.speed} m/s</Text>
                                    <Text>HUMIDITY: {weather.list[0].main.humidity}%</Text>
                                </View>
                            </View>
                        </LinearGradient>
                    )}
                    {/* Per dag scrollbaar */}
                    {weather?.list && (
                        <LinearGradient
                            colors={background[currentWeather] || background.Default}
                            style={styles.weatherContainerDay}
                        >
                            <View style={styles.weatherContainerDay}>
                                <Text style={styles.sectionTitle}>WEATHER</Text>
                                <Text style={styles.sectionTitleTwo}>IN THE UPCOMING 5 DAYS:</Text>
                                <View style={styles.weatherSetContainer}>
                                    {groupByDay(weather.list).map(([day, item], i) => (
                                        <LinearGradient
                                            colors={backgroundHeader[currentWeather] || background.Default}
                                            style={styles.weatherSet}
                                        >
                                            <View key={i}>
                                                <Text style={styles.dayTitle}>{day}</Text>
                                                <View style={styles.dailyBox}>
                                                    <ImageBackground
                                                        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                                                        style={styles.weatherIconSmall}
                                                        imageStyle={{ opacity: 0.3 }}
                                                    />
                                                    <Text style={styles.temp}>
                                                        {Math.round(item.main.temp)}°C
                                                    </Text>
                                                    <Text style={styles.rain}>
                                                        💧{Math.round(item.pop * 100)}%
                                                    </Text>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                    ))}
                                </View>
                            </View>
                        </LinearGradient>
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    background: StyleSheet.absoluteFillObject,
    main: {
        flex: 1,
        flexDirection: 'column',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        gap: 10,
        paddingLeft: 10
    },
    inputBar: {
        width: 190,
        height: 30,
        padding: 10,
        borderWidth: 1,
        borderColor: '#456B87',
        borderRadius: 10,
        color: 'grey',
        backgroundColor: 'white'
    },
    buttonSearch: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1
    },
    weatherContainer: {
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        height: 330
    },
    cityName: {
        fontWeight: 900,
        fontSize: 30,
        textAlign: 'right',
        marginVertical: 15,
        marginRight: 10,
        color: 'white'
    },
    celciusContainer: {
        borderTopColor: 'white',
        borderTopWidth: 1,
    },
    date: {
        fontWeight: 800,
        marginTop: 15,
        marginLeft: 20,
        fontSize: 25,
    },
    tempExtra: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 100,
        marginTop: 80
    },
    tempText: {
        position: 'absolute',
        justifyContent: 'center',
        fontWeight: 800,
        fontSize: 50,
        textShadowColor: 'white',
        textShadowOffset: { width: 3, height: -2 },
        textShadowRadius: 0,
    },
    tempSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 30,
    },
    weatherIcon: {
        height: 130,
        width: 250,
        left: 30,
        justifyContent: 'center',

    },
    weatherContainerDay: {
        marginTop: 10,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        textAlign: 'center',
        paddingBottom: 10
    },
    weatherSetContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    weatherSet: {
        marginVertical: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        padding: 12,
        width: 85,
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
    },
    dayTitle: {
        textAlign: 'center'
    },
    temp: {
        textAlign: 'center'
    },
    rain: {
        textAlign: 'center'
    },
    sectionTitle: {
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 800,
        fontSize: 24
    },
    sectionTitleTwo: {
        textAlign: 'center',
        fontWeight: 400,
        fontSize: 16,
        marginBottom: 10
    },
    weatherIconSmall: {
        height: 70,
        width: 50,
        left: 5,
        justifyContent: 'center',

    },
})

