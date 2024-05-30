import React, { useState } from 'react';
import './weather.css';
const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    const apiKey = '54b1407dcc4d3ca0d88eefdeca4dd8a4'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching the weather data', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="weather-container">
        <div className="content-container">
          <h1 className="title">Weather</h1>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="input"
          />
          <button onClick={fetchWeather} className="button">Get Weather</button>
          {loading && <p className="loading">Loading...</p>}
          {weather && !loading && (
            <div className="weather-info">
              <h2>{weather.name}</h2>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Weather;