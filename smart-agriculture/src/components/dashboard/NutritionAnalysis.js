import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './NutritionAnalysis.css';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutritionAnalysis = () => {
  // Sample data for nutrition levels
  const nutritionData = {
    labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'Calcium', 'Magnesium'],
    datasets: [
      {
        label: 'Current Level',
        data: [65, 45, 80, 60, 70],
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Optimal Level',
        data: [75, 60, 85, 70, 75],
        backgroundColor: '#8BC34A',
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
        text: 'Soil Nutrition Levels',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Level (%)'
        }
      }
    }
  };
  
  // Fertilizer recommendations based on nutrition levels
  const getFertilizerRecommendations = () => {
    const recommendations = [];
    
    if (nutritionData.datasets[0].data[0] < nutritionData.datasets[1].data[0]) {
      recommendations.push({
        nutrient: 'Nitrogen',
        fertilizer: 'Urea or Ammonium Sulfate',
        application: '2-3 kg per acre'
      });
    }
    
    if (nutritionData.datasets[0].data[1] < nutritionData.datasets[1].data[1]) {
      recommendations.push({
        nutrient: 'Phosphorus',
        fertilizer: 'Single Super Phosphate',
        application: '4-5 kg per acre'
      });
    }
    
    if (nutritionData.datasets[0].data[2] < nutritionData.datasets[1].data[2]) {
      recommendations.push({
        nutrient: 'Potassium',
        fertilizer: 'Muriate of Potash',
        application: '1-2 kg per acre'
      });
    }
    
    return recommendations;
  };
  
  const recommendations = getFertilizerRecommendations();
  
  return (
    <div className="nutrition-container">
      <h2 className="nutrition-title">Nutrition Analysis</h2>
      
      <div className="chart-container">
        <Bar data={nutritionData} options={options} />
      </div>
      
      {recommendations.length > 0 && (
        <div className="recommendations-container">
          <h3>Fertilizer Recommendations</h3>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">
                <div className="recommendation-nutrient">{rec.nutrient} Deficiency</div>
                <div className="recommendation-fertilizer">Apply {rec.fertilizer}</div>
                <div className="recommendation-application">Dosage: {rec.application}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NutritionAnalysis;