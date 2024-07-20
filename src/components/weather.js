import React, { useState, useEffect } from 'react';
import { getWeatherByLocation, getWeatherByCity } from '../api/weather';
import './weather.css';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!city) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
      });
    }
  }, [city]);

  const fetchWeatherByLocation = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeatherByLocation(lat, lon);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    }
    setLoading(false);
  };

  const fetchWeatherByCity = async (city) => {
    setLoading(true);
    setError('');
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError('Failed to fetch weather data.');
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherByCity(city);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;