import React, { useState, useEffect } from 'react';
import { FaTint, FaFillDrip } from 'react-icons/fa';
import './IrrigationSystem.css';
import { useLanguage } from '../../context/LanguageContext';

const IrrigationSystem = ({ soilMoisture, rainChance }) => {
  const [waterLevel, setWaterLevel] = useState(80);
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [droplets, setDroplets] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  
  // Check soil moisture and show alert if needed
  useEffect(() => {
    if (soilMoisture < 40 && !showAlert) {
      setShowAlert(true);
    } else if (soilMoisture >= 40 && showAlert) {
      setShowAlert(false);
    }
  }, [soilMoisture, showAlert]);
  
  // Handle irrigation process
  const startIrrigation = () => {
    if (waterLevel <= 10) {
      alert('Water tank is almost empty! Please refill.');
      return;
    }
    
    setIsIrrigating(true);
    
    // Create water droplet animation
    const newDroplets = [];
    for (let i = 0; i < 10; i++) {
      newDroplets.push({
        id: Date.now() + i,
        left: 10 + (i * 8) + Math.random() * 5,
        delay: i * 0.2
      });
    }
    setDroplets(newDroplets);
    
    // Decrease water level and increase soil moisture
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.max(0, prev - 5));
    }, 1000);
    
    // Stop irrigation after 5 seconds
    setTimeout(() => {
      setIsIrrigating(false);
      setDroplets([]);
      clearInterval(interval);
    }, 5000);
  };
  
  // Refill water tank
  const refillWaterTank = () => {
    setWaterLevel(100);
  };
  
  // Calculate irrigation needed based on soil moisture and rain chance
  const calculateIrrigationNeeded = () => {
    // If high chance of rain, less irrigation needed
    const rainFactor = rainChance > 60 ? 0.3 : rainChance > 30 ? 0.6 : 1;
    
    // If soil is very dry, more irrigation needed
    const moistureFactor = soilMoisture < 30 ? 2 : soilMoisture < 50 ? 1.5 : 1;
    
    return Math.round(10 * moistureFactor * rainFactor);
  };
  
  const { translate } = useLanguage();

  return (
    <div className="irrigation-container">
      <h2 className="irrigation-title">{translate('irrigation.title')}</h2>
      
      {showAlert && (
        <div className="alert alert-danger">
          <FaTint /> {translate('irrigation.alert')}
        </div>
      )}
      
      <div className="row">
        <div className="col-md-6">
          <div className="water-tank-container">
            <h3>{translate('irrigation.waterLevel')}</h3>
            <div className="water-tank">
              <div 
                className="water-level" 
                style={{ height: `${waterLevel}%` }}
              ></div>
              <div className="water-percentage">{waterLevel}%</div>
            </div>
            <button 
              className="btn btn-primary mt-3" 
              onClick={refillWaterTank}
              disabled={waterLevel === 100}
            >
              {translate('irrigation.refill')}
            </button>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="irrigation-controls">
            <h3>{translate('irrigation.controls')}</h3>
            <div className="irrigation-info">
              <p>
                <strong>{translate('irrigation.currentSoilMoisture')}:</strong> {soilMoisture}%
              </p>
              <p>
                <strong>{translate('irrigation.chanceOfRain')}:</strong> {rainChance}%
              </p>
              <p>
                <strong>{translate('irrigation.irrigationNeeded')}:</strong> {calculateIrrigationNeeded()} minutes
              </p>
            </div>
            
            <button 
              className="btn btn-primary mt-3" 
              onClick={startIrrigation}
              disabled={isIrrigating}
            >
              {isIrrigating ? translate('irrigation.irrigating') : translate('irrigation.start')}
            </button>
            
            {isIrrigating && (
              <div className="irrigation-animation">
                {droplets.map(droplet => (
                  <div 
                    key={droplet.id}
                    className="water-droplet"
                    style={{
                      left: `${droplet.left}%`,
                      animationDelay: `${droplet.delay}s`
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationSystem;