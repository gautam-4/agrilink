import React, { useState } from 'react';
import InputField from './InputField';

const YieldPredictor = () => {
  const [formData, setFormData] = useState({
    cropType: '',
    rainfall: '',
    temperature: '',
    pesticides: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);  // To handle error responses

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construct the request payload
      const payload = {
        data: {
          average_rain_fall_mm_per_year: Number(formData.rainfall),
          pesticides_tonnes: Number(formData.pesticides),
          avg_temp: Number(formData.temperature),
          crop: formData.cropType,
        },
      };

      // Send POST request using fetch
      const response = await fetch('http://127.0.0.1:8000/predict_yield', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the prediction');
      }

      const data = await response.json();
      setPrediction(`Predicted yield: ${data.predicted_yield[0]} tons per hectare`);
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch the prediction. Please try again.');
      setPrediction(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-[#4E5E47] mb-6">Crop Yield Predictor</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Type of Crop"
          name="cropType"
          value={formData.cropType}
          onChange={handleInputChange}
          placeholder="e.g., Wheat, Rice, Corn"
        />
        <InputField
          label="Average Rainfall in a Year (mm)"
          name="rainfall"
          type="number"
          value={formData.rainfall}
          onChange={handleInputChange}
          placeholder="e.g., 1000"
        />
        <InputField
          label="Average Temperature (°C)"
          name="temperature"
          type="number"
          value={formData.temperature}
          onChange={handleInputChange}
          placeholder="e.g., 25"
        />
        <InputField
          label="Pesticides Used (tonnes)"
          name="pesticides"
          type="number"
          value={formData.pesticides}
          onChange={handleInputChange}
          placeholder="e.g., 500"
        />
        <button
          type="submit"
          className="w-full bg-[#4E5E47] text-white py-2 px-4 rounded-md hover:bg-[#3A4A33] transition-colors duration-300 mt-4"
        >
          Predict Yield
        </button>
      </form>
      {prediction && (
        <div className="mt-6 p-4 bg-[#F1E4C3] rounded-md">
          <p className="text-[#4E5E47] font-semibold">{prediction}</p>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-200 rounded-md">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}
    </div>
  );
};

export default YieldPredictor;
