import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { DailyWeatherAPIResponse, IDailyWeather } from './types'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const API_KEY = 'e13bf2bcb4784f2d03d9cd498f70a60b'

export default function App() {
  const [city, setCity] = useState('-')
  const [days, setDays] = useState<IDailyWeather[] | []>([])
  const [ok, setOk] = useState(true)

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync()
    if (!granted) setOk(false)
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 })

    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false })
    setCity(location[0].city ?? 'nowhere...!')
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,current&appid=${API_KEY}&units=metric`
    )
    const { daily }: DailyWeatherAPIResponse = await response.json()
    setDays(daily)
    console.log(response)
  }

  useEffect(() => {
    getWeather()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color={'white'} size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View style={styles.day} key={index}>
              <Text style={styles.temp}>{Math.floor(day.temp.day)}°</Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a9494',
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityName: {
    fontSize: 30,
    fontWeight: '700',
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontWeight: '600',
    fontSize: 150,
  },
  description: { marginTop: -30, fontSize: 60 },
})
