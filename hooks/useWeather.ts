import { useState } from 'react';
import axios from 'axios';
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from '../constants/api';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather. Please check the city name.');
    } finally {
      setLoading(false);
    }
  };

  return { weatherData, loading, error, fetchWeather };
};
