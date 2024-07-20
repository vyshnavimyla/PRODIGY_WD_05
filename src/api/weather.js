import axios from 'axios';

const API_KEY = '6113aeb310eda6e8851d2a03dcf7623a';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeatherByLocation = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getWeatherByCity = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};