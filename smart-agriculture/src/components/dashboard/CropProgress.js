import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './CropProgress.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CropProgress = () => {
  // Sample data for crop growth progress
  const progressData = {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    datasets: [
      {
        label: 'Crop Growth',
        data: [5, 15, 30, 45, 60, 75, 85],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Crop Health',
        data: [90, 85, 88, 80, 85, 82, 88],
        borderColor: '#FFC107',
        backgroundColor: 'rgba(255, 193, 7, 0.1)',
        tension: 0.4,
        fill: false
      }
    ],
  };
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Crop Progress Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Progress (%)'
        }
      }
    }
  };
  
  // Current crop status
  const cropStatus = {
    name: 'Wheat',
    stage: 'Vegetative Growth',
    daysPlanted: 30,
    estimatedHarvest: '45 days remaining',
    healthStatus: 'Good',
    issues: ['Minor pest activity detected', 'Optimal water levels']
  };
  
  return (
    <div className="crop-progress-container">
      <h2 className="crop-progress-title">Crop Progress</h2>
      
      <div className="crop-info">
        <div className="crop-name">{cropStatus.name}</div>
        <div className="crop-stage">Stage: {cropStatus.stage}</div>
        <div className="crop-days">Days since planting: {cropStatus.daysPlanted}</div>
        <div className="crop-harvest">Estimated harvest: {cropStatus.estimatedHarvest}</div>
      </div>
      
      <div className="chart-container">
        <Line data={progressData} options={options} />
      </div>
      
      <div className="crop-health-status">
        <h3>Current Health Status: <span className={`status-${cropStatus.healthStatus.toLowerCase()}`}>{cropStatus.healthStatus}</span></h3>
        <ul className="crop-issues">
          {cropStatus.issues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CropProgress;