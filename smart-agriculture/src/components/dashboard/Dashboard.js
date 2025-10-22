import React, { useState, useEffect } from 'react';
import { FaThermometerHalf, FaTint, FaCloud, FaSeedling } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import './Dashboard.css';
import IrrigationSystem from './IrrigationSystem';
import NutritionAnalysis from './NutritionAnalysis';
import CropProgress from './CropProgress';
import Simulator from '../simulator/Simulator';
import CropSelector from '../crops/CropSelector';
import ManualInput from '../manual/ManualInput';
import DemoModeToggle from '../demo/DemoModeToggle';
import cropConditions from '../../data/cropConditions';

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
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  
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
    
    // Simulate real-time updates only in demo mode with interdependence
    let interval;
    if (isDemoMode) {
      interval = setInterval(() => {
        setSensorData(prevData => {
          // Get crop-specific conditions
          const crop = cropConditions[selectedCrop];
          
          // Calculate temperature change within crop-specific range
          const tempChange = Math.random() * 2 - 1;
          const newTemp = Math.max(
            crop.temperature.min, 
            Math.min(crop.temperature.max, prevData.temperature + tempChange)
          );
          
          // Calculate humidity change within crop-specific range
          const humidityChange = Math.random() * 4 - 2;
          const newHumidity = Math.max(
            crop.humidity.min, 
            Math.min(crop.humidity.max, prevData.humidity + humidityChange)
          );
          
          // Calculate soil moisture with interdependence
          // Temperature increase causes moisture decrease (evaporation)
          const evaporationEffect = tempChange > 0 ? -tempChange * 0.8 : 0;
          
          // Humidity increase causes moisture increase (water retention)
          const humidityEffect = humidityChange > 0 ? humidityChange * 0.3 : 0;
          
          // Random factor for natural variation
          const randomFactor = Math.random() * 2 - 1;
          
          // Calculate new soil moisture within crop-specific range
          const moistureChange = evaporationEffect + humidityEffect + randomFactor;
          const newMoisture = Math.max(
            crop.soilMoisture.min, 
            Math.min(crop.soilMoisture.max, prevData.soilMoisture + moistureChange)
          );
          
          return {
            soilMoisture: newMoisture,
            temperature: newTemp,
            humidity: newHumidity
          };
        });
      }, 3000); // Update every 3 seconds for more dynamic simulation
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDemoMode, selectedCrop]);
  
  // Handle manual input updates
  const handleManualInputUpdate = (newData) => {
    setSensorData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  if (loading) {
    return <div className="loading-container"><div className="loading"></div></div>;
  }
  
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">{translate('dashboard.title')}</h1>
      
      <div className="row">
        <div className="col-md-6">
          <DemoModeToggle 
            isDemoMode={isDemoMode} 
            onToggle={setIsDemoMode} 
          />
        </div>
        <div className="col-md-6">
          <CropSelector 
            selectedCrop={selectedCrop} 
            onSelectCrop={setSelectedCrop} 
          />
        </div>
      </div>
      
      {!isDemoMode && (
        <ManualInput 
          initialValues={sensorData}
          onSubmit={handleManualInputUpdate}
        />
      )}
      
      <Simulator />
      
      <div className="row">
        <div className="col-md-4">
          <div className="sensor-card">
            <FaTint className="sensor-icon" />
            <div className="sensor-value">{sensorData.soilMoisture.toFixed(2)}%</div>
            <div className="sensor-label">{translate('dashboard.soilMoisture')}</div>
            {sensorData.soilMoisture < cropConditions[selectedCrop].soilMoisture.optimal[0] && (
              <div className="alert alert-danger mt-3">
                ⚠ {translate('dashboard.lowMoisture')} — {translate('dashboard.irrigationNeeded')}
              </div>
            )}
            {sensorData.soilMoisture >= cropConditions[selectedCrop].soilMoisture.optimal[0] && 
             sensorData.soilMoisture <= cropConditions[selectedCrop].soilMoisture.optimal[1] && (
              <div className="alert alert-success mt-3">
                🌧 {translate('dashboard.moistureOptimal')}
              </div>
            )}
            {sensorData.soilMoisture > cropConditions[selectedCrop].soilMoisture.optimal[1] && (
              <div className="alert alert-warning mt-3">
                💧 {cropConditions[selectedCrop].soilMoisture.description}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="sensor-card">
            <FaThermometerHalf className="sensor-icon" />
            <div className="sensor-value">{sensorData.temperature.toFixed(2)}°C</div>
            <div className="sensor-label">{translate('dashboard.temperature')}</div>
            {(sensorData.temperature < cropConditions[selectedCrop].temperature.optimal[0] || 
              sensorData.temperature > cropConditions[selectedCrop].temperature.optimal[1]) && (
              <div className="alert alert-warning mt-3">
                🌡️ {cropConditions[selectedCrop].temperature.description}
              </div>
            )}
            {sensorData.temperature >= cropConditions[selectedCrop].temperature.optimal[0] && 
             sensorData.temperature <= cropConditions[selectedCrop].temperature.optimal[1] && (
              <div className="alert alert-success mt-3">
                ✅ Optimal temperature for {cropConditions[selectedCrop].name}
              </div>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="sensor-card">
            <FaCloud className="sensor-icon" />
            <div className="sensor-value">{sensorData.humidity.toFixed(2)}%</div>
            <div className="sensor-label">{translate('dashboard.humidity')}</div>
            {(sensorData.humidity < cropConditions[selectedCrop].humidity.optimal[0] || 
              sensorData.humidity > cropConditions[selectedCrop].humidity.optimal[1]) && (
              <div className="alert alert-warning mt-3">
                💨 {cropConditions[selectedCrop].humidity.description}
              </div>
            )}
            {sensorData.humidity >= cropConditions[selectedCrop].humidity.optimal[0] && 
             sensorData.humidity <= cropConditions[selectedCrop].humidity.optimal[1] && (
              <div className="alert alert-success mt-3">
                ✅ Optimal humidity for {cropConditions[selectedCrop].name}
              </div>
            )}
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