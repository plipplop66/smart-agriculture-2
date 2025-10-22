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

const Dashboard = ({ isDemoActive: isDemoActiveProp = true }) => {
  const { translate } = useLanguage();
  const [sensorData, setSensorData] = useState({
    soilMoisture: 45,
    temperature: 28,
    humidity: 65
  });
  
  
  
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(isDemoActiveProp);
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
    
    // Simulate real-time updates with different behavior for demo/manual modes
    let interval;
    interval = setInterval(() => {
      setSensorData(prevData => {
        const crop = cropConditions[selectedCrop];

        if (isDemoMode) {
          // In demo mode, generate completely random values within crop's ranges
          const minT = crop.temperature.min;
          const maxT = crop.temperature.max;
          const newTemp = +(Math.random() * (maxT - minT) + minT).toFixed(2);

          const humOptMid = (crop.humidity.optimal[0] + crop.humidity.optimal[1]) / 2;
          const tempOptMid = (crop.temperature.optimal[0] + crop.temperature.optimal[1]) / 2;
          const tempDiff = newTemp - tempOptMid;

          let newHumidity = humOptMid - tempDiff * 0.6 + (Math.random() * 4 - 2);
          newHumidity = Math.max(crop.humidity.min, Math.min(crop.humidity.max, +newHumidity.toFixed(2)));

          const moistOptMid = (crop.soilMoisture.optimal[0] + crop.soilMoisture.optimal[1]) / 2;
          let newMoisture = moistOptMid + (newHumidity - humOptMid) * 0.35 - tempDiff * 0.25 + (Math.random() * 3 - 1.5);
          newMoisture = Math.max(crop.soilMoisture.min, Math.min(crop.soilMoisture.max, +newMoisture.toFixed(2)));

          return {
            soilMoisture: newMoisture,
            temperature: newTemp,
            humidity: newHumidity
          };
        } else {
          // In manual mode, make small variations around the manually entered values
          const tempVariation = (Math.random() * 0.4 - 0.2); // ±0.2°C
          const humidityVariation = (Math.random() * 1 - 0.5); // ±0.5%
          const moistureVariation = (Math.random() * 0.6 - 0.3); // ±0.3%

          return {
            soilMoisture: Math.max(crop.soilMoisture.min, 
              Math.min(crop.soilMoisture.max, 
                +(prevData.soilMoisture + moistureVariation).toFixed(2))),
            temperature: Math.max(crop.temperature.min,
              Math.min(crop.temperature.max,
                +(prevData.temperature + tempVariation).toFixed(2))),
            humidity: Math.max(crop.humidity.min,
              Math.min(crop.humidity.max,
                +(prevData.humidity + humidityVariation).toFixed(2)))
          };
        }
      });
    }, 3000); // Update every 3 seconds
    
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
      
  <Simulator selectedCrop={selectedCrop} sensorData={sensorData} />
      
      <div className="row">
        <div className="col-md-4">
          <div className="sensor-card">
            <FaTint className="sensor-icon" />
            <div className="sensor-value">{sensorData.soilMoisture.toFixed(2)}%</div>
            <div className="sensor-label">{translate('dashboard.soilMoisture')}</div>
            {sensorData.soilMoisture < cropConditions[selectedCrop].soilMoisture.optimal[0] && (
              <div className="alert alert-warning mt-3">
                ⚠️ {translate('dashboard.lowMoisture')} — {translate('dashboard.irrigationNeeded')}
              </div>
            )}
            {sensorData.soilMoisture >= cropConditions[selectedCrop].soilMoisture.optimal[0] && 
             sensorData.soilMoisture <= cropConditions[selectedCrop].soilMoisture.optimal[1] && (
              <div className="alert alert-success mt-3">
                ✅ {translate('dashboard.moistureOptimal')}
              </div>
            )}
            {sensorData.soilMoisture > cropConditions[selectedCrop].soilMoisture.optimal[1] && (
              <div className="alert alert-warning mt-3">
                ⚠️ {(() => {
                  const key = `crop.${selectedCrop}.soilMoisture.description`;
                  const text = translate(key);
                  return text === key ? cropConditions[selectedCrop].soilMoisture.description : text;
                })()}
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
                ⚠️ {(() => {
                  const key = `crop.${selectedCrop}.temperature.description`;
                  const text = translate(key);
                  return text === key ? cropConditions[selectedCrop].temperature.description : text;
                })()}
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
                ⚠️ {(() => {
                  const key = `crop.${selectedCrop}.humidity.description`;
                  const text = translate(key);
                  return text === key ? cropConditions[selectedCrop].humidity.description : text;
                })()}
              </div>
            )}
            {sensorData.humidity >= cropConditions[selectedCrop].humidity.optimal[0] && 
             sensorData.humidity <= cropConditions[selectedCrop].humidity.optimal[1] && (
              <div className="alert alert-success mt-3">
                ✅ {(() => {
                  const tmpl = translate('dashboard.optimalHumidityFor');
                  const cropName = translate(`crops.${selectedCrop}`) || cropConditions[selectedCrop].name;
                  return tmpl === 'dashboard.optimalHumidityFor' ? `Optimal humidity for ${cropName}` : tmpl.replace('{crop}', cropName);
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
      
      
      
  <IrrigationSystem soilMoisture={sensorData.soilMoisture} rainChance={0} />
      
      <div className="row">
        <div className="col-md-6">
          <NutritionAnalysis selectedCrop={selectedCrop} sensorData={sensorData} />
        </div>
        <div className="col-md-6">
          <CropProgress selectedCrop={selectedCrop} sensorData={sensorData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;