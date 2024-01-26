// WeatherService.js

import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const getCoordinates = async (city) => {
  try {
    const response = await axios.get(`${GEO_URL}?q=${city}&limit=1&appid=${API_KEY}`);
    const { lat, lon } = response.data[0];
    return { lat, lon };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

const getWeatherData = async (city) => {
  try {
    const { lat, lon } = await getCoordinates(city);
    const weatherResponse = await axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return weatherResponse.data.list.slice(0, 5);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export { getWeatherData };
