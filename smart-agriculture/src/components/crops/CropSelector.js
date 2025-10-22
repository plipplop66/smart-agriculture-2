import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './CropSelector.css';

const CropSelector = ({ onCropSelect }) => {
  const { translate } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('wheat');

  const crops = [
    { id: 'wheat', name: translate('crops.wheat') },
    { id: 'rice', name: translate('crops.rice') },
    { id: 'corn', name: translate('crops.corn') },
    { id: 'cotton', name: translate('crops.cotton') },
    { id: 'sugarcane', name: translate('crops.sugarcane') }
  ];

  const handleCropChange = (e) => {
    const crop = e.target.value;
    setSelectedCrop(crop);
    if (onCropSelect) {
      onCropSelect(crop);
    }
  };

  return (
    <div className="crop-selector">
      <h3>{translate('crops.title')}</h3>
      <div className="crop-select-container">
        <select 
          value={selectedCrop} 
          onChange={handleCropChange}
          className="crop-select"
        >
          {crops.map(crop => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>
      </div>
      <div className="selected-crop-display">
        <div className={`crop-icon ${selectedCrop}`}></div>
        <span>{crops.find(c => c.id === selectedCrop)?.name}</span>
      </div>
    </div>
  );
};

export default CropSelector;