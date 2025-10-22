import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FaPlay, FaTint, FaFlask, FaSeedling } from 'react-icons/fa';
import './Simulator.css';

const Simulator = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const { translate } = useLanguage();

  const simulationSteps = [
    translate('sim.steps.detect'),
    translate('sim.steps.calculateIrrigation'),
    translate('sim.steps.determineFertilizer'),
    translate('sim.steps.apply')
  ];

  const runSimulation = () => {
    // Reset states
    setIsSimulating(true);
    setSimulationStep(0);
    setProgress(0);
    setSimulationResults(null);

    // Step 1: Detecting moisture
    setTimeout(() => {
      setProgress(25);
      setSimulationStep(1);
      
      // Step 2: Calculating irrigation
      setTimeout(() => {
        setProgress(50);
        setSimulationStep(2);
        
        // Step 3: Determining fertilizer
        setTimeout(() => {
          setProgress(75);
          setSimulationStep(3);
          
          // Step 4: Applying irrigation and fertilizer
          setTimeout(() => {
            setProgress(100);
            
            // Generate random results
            const soilMoisture = Math.floor(Math.random() * 71) + 20; // 20-90%
            const waterLevel = Math.floor((100 - soilMoisture) * 0.8); // Inverse relationship with moisture
            const fertilizerAmount = Math.floor(Math.random() * 51) + 10; // 10-60 units
            
            setSimulationResults({
              soilMoisture,
              waterLevel,
              fertilizerAmount
            });
            
            // End simulation after showing results
            setTimeout(() => {
              setIsSimulating(false);
            }, 3000);
            
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="simulator-container">
  <h2 className="simulator-title">{translate('simulator.title')}</h2>
      
      {!isSimulating && !simulationResults && (
        <div className="simulator-intro">
          <p>{translate('sim.intro')}</p>
          <button 
            className="simulator-button"
            onClick={runSimulation}
          >
            <FaPlay className="button-icon" /> {translate('sim.run')}
          </button>
        </div>
      )}
      
      {isSimulating && (
        <div className="simulation-progress">
          <div className="progress-bar-container">
            <div 
              className="progress-bar" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="simulation-step">{simulationSteps[simulationStep]}</p>
        </div>
      )}
      
      {simulationResults && (
        <div className="simulation-results">
          <h3>{translate('sim.resultsTitle')}</h3>
          
          <div className="results-grid">
            <div className="result-item">
              <FaTint className="result-icon" />
              <div className="result-value">{simulationResults.soilMoisture}%</div>
              <div className="result-label">{translate('dashboard.soilMoisture')}</div>
            </div>
            
            <div className="result-item">
              <FaFlask className="result-icon" />
              <div className="result-value">{simulationResults.waterLevel} L</div>
              <div className="result-label">{translate('sim.waterApplied')}</div>
            </div>
            
            <div className="result-item">
              <FaSeedling className="result-icon" />
              <div className="result-value">{simulationResults.fertilizerAmount} units</div>
              <div className="result-label">{translate('sim.fertilizerApplied')}</div>
            </div>
          </div>
          
          {!isSimulating && (
            <button 
              className="simulator-button restart-button"
              onClick={runSimulation}
            >
              <FaPlay className="button-icon" /> {translate('sim.runAgain')}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Simulator;