import React, { useState, useEffect } from 'react';
import { FaThermometerHalf, FaTint, FaCloud, FaSeedling } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import './Dashboard.css';
import IrrigationSystem from './IrrigationSystem';
import NutritionAnalysis from './NutritionAnalysis';
import CropProgress from './CropProgress';
import Simulator from '../simulator/Simulator';

const Dashboard = () => {
  const { translate } = useLanguage();
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 65
  });
  
  const [weatherData, setWeatherData] = useState({
    current: {
      condition: 'Partly Cloudy',
      temperature: 27,
      humidity: 62,
      windSpeed: 12
    },
    forecast: {
      today: {
        condition: 'Partly Cloudy',
        maxTemp: 30,
        minTemp: 22,
        rainChance: 20
      },
      tomorrow: {
        condition: 'Rainy',
        maxTemp: 26,
        minTemp: 20,
        rainChance: 70
      }
    }
  });
  
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // const sensorRes = await axios.get('/api/sensor-data');
        // const weatherRes = await axios.get('/api/weather');
        // setSensorData(sensorRes.data);
        // setWeatherData(weatherRes.data);
        
        // For demo purposes, we'll use the initial state data
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
    
    fetchData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSensorData(prevData => ({
        soilMoisture: Math.max(30, Math.min(80, prevData.soilMoisture + (Math.random() * 6 - 3))),
        temperature: Math.max(22, Math.min(35, prevData.temperature + (Math.random() * 2 - 1))),
        humidity: Math.max(40, Math.min(90, prevData.humidity + (Math.random() * 4 - 2)))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  if (loading) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{translate('dashboard.title')}</h1>
      
      <Simulator />
      
      <div className="row">
        <div className="col-md-4">
          <div className="sensor-card">
            <FaTint className="sensor-icon" />
            <div className="sensor-value">{sensorData.soilMoisture.toFixed(2)}%</div>
            <div className="sensor-label">{translate('dashboard.soilMoisture')}</div>
            {sensorData.soilMoisture < 40 && (
              <div className="alert alert-danger mt-3">
                {translate('dashboard.lowMoisture')}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="sensor-card">
            <FaThermometerHalf className="sensor-icon" />
            <div className="sensor-value">{sensorData.temperature.toFixed(2)}°C</div>
            <div className="sensor-label">{translate('dashboard.temperature')}</div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="sensor-card">
            <FaCloud className="sensor-icon" />
            <div className="sensor-value">{sensorData.humidity.toFixed(2)}%</div>
            <div className="sensor-label">{translate('dashboard.humidity')}</div>
          </div>
        </div>
      </div>
      
      <div className="weather-section">
        <h2 className="weather-title">Weather Forecast</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="weather-card current">
              <h3>Current Weather</h3>
              <div className="weather-info">
                <div className="weather-temp">{weatherData.current.temperature}°C</div>
                <div className="weather-condition">{weatherData.current.condition}</div>
                <div className="weather-details">
                  <div>Humidity: {weatherData.current.humidity}%</div>
                  <div>Wind: {weatherData.current.windSpeed} km/h</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="weather-card forecast">
              <h3>Today</h3>
              <div className="forecast-temp">
                <span className="max-temp">{weatherData.forecast.today.maxTemp}°C</span>
                <span className="min-temp">{weatherData.forecast.today.minTemp}°C</span>
              </div>
              <div className="forecast-condition">{weatherData.forecast.today.condition}</div>
              <div className="rain-chance">
                <FaTint /> {weatherData.forecast.today.rainChance}%
              </div>
            </div>
          </div>
          
          <div className="col-md-3">
            <div className="weather-card forecast">
              <h3>Tomorrow</h3>
              <div className="forecast-temp">
                <span className="max-temp">{weatherData.forecast.tomorrow.maxTemp}°C</span>
                <span className="min-temp">{weatherData.forecast.tomorrow.minTemp}°C</span>
              </div>
              <div className="forecast-condition">{weatherData.forecast.tomorrow.condition}</div>
              <div className="rain-chance">
                <FaTint /> {weatherData.forecast.tomorrow.rainChance}%
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <IrrigationSystem soilMoisture={sensorData.soilMoisture} rainChance={weatherData.forecast.today.rainChance} />
      
      <div className="row">
        <div className="col-md-6">
          <NutritionAnalysis />
        </div>
        <div className="col-md-6">
          <CropProgress />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;