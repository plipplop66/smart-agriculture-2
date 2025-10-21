import React, { useState } from 'react';
import { FaPlay, FaTint, FaFlask, FaSeedling } from 'react-icons/fa';
import './Simulator.css';

const Simulator = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState(0);
  const [simulationResults, setSimulationResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const simulationSteps = [
    "Detecting moisture...",
    "Calculating irrigation needs...",
    "Determining fertilizer requirements...",
    "Applying irrigation and fertilizer..."
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
      <h2 className="simulator-title">Smart Agriculture Simulator</h2>
      
      {!isSimulating && !simulationResults && (
        <div className="simulator-intro">
          <p>Run a virtual simulation of the smart agriculture system</p>
          <button 
            className="simulator-button"
            onClick={runSimulation}
          >
            <FaPlay className="button-icon" /> Run Simulator
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
          <h3>Simulation Results</h3>
          
          <div className="results-grid">
            <div className="result-item">
              <FaTint className="result-icon" />
              <div className="result-value">{simulationResults.soilMoisture}%</div>
              <div className="result-label">Soil Moisture</div>
            </div>
            
            <div className="result-item">
              <FaFlask className="result-icon" />
              <div className="result-value">{simulationResults.waterLevel} L</div>
              <div className="result-label">Water Applied</div>
            </div>
            
            <div className="result-item">
              <FaSeedling className="result-icon" />
              <div className="result-value">{simulationResults.fertilizerAmount} units</div>
              <div className="result-label">Fertilizer Applied</div>
            </div>
          </div>
          
          {!isSimulating && (
            <button 
              className="simulator-button restart-button"
              onClick={runSimulation}
            >
              <FaPlay className="button-icon" /> Run Again
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Simulator;