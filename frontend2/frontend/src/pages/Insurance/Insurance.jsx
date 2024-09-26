import React from 'react';
import { assets } from '../../assets/assets';
import InsuranceFrontend from '../../components/InsuranceForm/InsuranceFrontend';

const Insurance = () => {
    return (
        <div className="min-h-screen">
            <div className="container mx-auto py-8">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2 pr-8">
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight mb-8">
                            Decentralized<br />
                            Crop Insurance<br />
                            Pool
                        </h1>
                        
                        <div className="mb-8">
                            <img src={assets.insuranceHeader} alt="Insurance Header" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                        
                        <div className="p-6 rounded-lg shadow-md mb-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Our Insurance</h2>
                            <p className="text-gray-600 mb-4">
                                Our decentralized crop insurance pool provides innovative coverage for farmers, 
                                leveraging blockchain technology to ensure transparency and efficiency.
                            </p>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Smart contract-based policies</li>
                                <li>Instant claim processing</li>
                                <li>Community-driven risk assessment</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2">
                        <InsuranceFrontend />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Insurance;