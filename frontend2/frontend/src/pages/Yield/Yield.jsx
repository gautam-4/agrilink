import React from 'react';
import YieldPredictor from '@/components/Yield_predictor/YieldPredictor'
import { assets } from '../../assets/assets';

function Yield() {
  return (
    <div className="min-h-screen bg-[#F1E4C3] flex items-center justify-center p-4">
      <div className="flex flex-row items-center gap-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">AI Powered Yield Predictor</h1>
          <img
            src={assets.yieldimg}
            alt="Crop Yield"
            className="rounded-lg shadow-md w-[60%]"
          />
        </div>
        <YieldPredictor />
      </div>
    </div>
  );
}

export default Yield;