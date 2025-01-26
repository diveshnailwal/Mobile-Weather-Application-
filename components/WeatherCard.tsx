import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherCard = ({ weatherData }: { weatherData: any }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>Temperature: {weatherData.main.temp}°C</Text>
      <Text style={styles.text}>Humidity: {weatherData.main.humidity}%</Text>
      <Text style={styles.text}>Wind Speed: {weatherData.wind.speed} m/s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 5 },
  text: { fontSize: 16, marginBottom: 5 },
});

export default WeatherCard;
