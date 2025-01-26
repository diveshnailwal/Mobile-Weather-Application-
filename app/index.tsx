//@ts-nocheck
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  useColorScheme,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useWeather } from '../hooks/useWeather';
import { useWebSocket } from '../hooks/useWebSocket';

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState<string | null>(null);
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric'); 
  const [recentCities, setRecentCities] = useState<string[]>([]); 
  const { weatherData, fetchWeather, loading, error } = useWeather();
  const colorScheme = useColorScheme(); 

  useWebSocket((data) => {
    setTemperature(data.temperature);
  });

  const handleSearch = async () => {
    if (city.trim()) {
      await storeCity(city);
      fetchWeather(city, unit);
    }
  };

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const storeCity = async (city: string) => {
    try {
      const existingCities = await AsyncStorage.getItem('recentCities');
      const cities = existingCities ? JSON.parse(existingCities) : [];
      if (!cities.includes(city)) {
        cities.unshift(city); 
        if (cities.length > 5) cities.pop(); 
        await AsyncStorage.setItem('recentCities', JSON.stringify(cities));
      }
      setRecentCities(cities);
    } catch (error) {
      console.error('Failed to store city:', error);
    }
  };

  const getRecentCities = async () => {
    try {
      const cities = await AsyncStorage.getItem('recentCities');
      setRecentCities(cities ? JSON.parse(cities) : []);
    } catch (error) {
      console.error('Failed to retrieve recent cities:', error);
    }
  };

  useEffect(() => {
    getRecentCities();
  }, []);

  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
        Weather App
      </Text>

      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Enter city name"
        placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={handleSearch} />
      <Button
        title={`Switch to ${unit === 'metric' ? 'Fahrenheit' : 'Celsius'}`}
        onPress={handleUnitToggle}
      />

      {loading && (
        <Text style={[styles.loading, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
          Loading...
        </Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weatherData && (
        <Animated.View
          style={styles.weatherContainer}
          entering={FadeIn.duration(500)} 
        >
          <Text style={[styles.weatherText, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
            City: {weatherData.name}
          </Text>
          <Text style={[styles.weatherText, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
            Temperature: {weatherData.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </Text>
          <Text style={[styles.weatherText, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
            Humidity: {weatherData.main.humidity}%
          </Text>
          <Text style={[styles.weatherText, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
            Wind Speed: {weatherData.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </Text>
        </Animated.View>
      )}

      {temperature && (
        <Text style={[styles.realTimeText, isDarkMode ? styles.darkTextYellow : styles.lightText]}>
          Real-Time Temperature: {temperature}°C
        </Text>
      )}

      <View style={styles.recentContainer}>
        <Text
          style={[styles.recentTitle, isDarkMode ? styles.darkTextYellow : styles.lightText]}
        >
          Recently Searched Cities:
        </Text>
        <FlatList
          data={recentCities}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => fetchWeather(item, unit)}>
              <Text
                style={[styles.recentCity, isDarkMode ? styles.darkTextYellow : styles.lightText]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  lightContainer: {
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  darkTextYellow: {
    color: '#FFD700', 
  },
  lightText: {
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  darkInput: {
    backgroundColor: '#333',
    color: '#fff',
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
  },
  loading: {
    color: 'blue',
    marginTop: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  weatherContainer: {
    marginTop: 20,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
  },
  realTimeText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  recentContainer: {
    marginTop: 30,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  recentCity: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomeScreen;




