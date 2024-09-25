import React, { useContext } from 'react';
import { InsuranceContext } from '@/Context/InsuranceContext';

const InsuranceFrontend = () => {
  const {
    connectWallet,
    currentAccount,
    isLoading,
    handleChange,
    formData,
    isInsured,
    insuranceDetails,
    withdrawAmount,
    getInsured,
    withdrawInsuranceMoney
  } = useContext(InsuranceContext);

  const handleSubmit = (e) => {
    const { cropType, areaSize } = formData;
    e.preventDefault();

    if (!cropType || !areaSize) return;

    getInsured();
  };

  return (
    <div className="min-h-screen bg-[#F1E4C3] py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4e5e47] to-[#3a4735] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-[#4e5e47]">Crop Insurance</h2>
                
                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">User Address</p>
                  <p className="text-lg font-semibold text-[#4e5e47] break-all">
                    {currentAccount || "Not connected"}
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-500">Withdrawable Amount</p>
                  <p className="text-lg font-semibold text-[#4e5e47]">
                    {currentAccount && isInsured ? `${withdrawAmount} ETH` : "0 ETH"}
                  </p>
                </div>

                {!currentAccount && (
                  <button
                    type="button"
                    onClick={connectWallet}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4e5e47] hover:bg-[#3a4735] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4e5e47]"
                  >
                    Connect to MetaMask
                  </button>
                )}
                
                {currentAccount && !isInsured && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropType">
                        Crop Type
                      </label>
                      <select
                        id="cropType"
                        name="cropType"
                        onChange={(e) => handleChange(e, "cropType")}
                        value={formData.cropType}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Select a crop type</option>
                        <option value="wheat">Wheat</option>
                        <option value="corn">Corn</option>
                        <option value="rice">Rice</option>
                        <option value="soybeans">Soybeans</option>
                        <option value="cotton">Cotton</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areaSize">
                        Area Size (in square meters)
                      </label>
                      <input
                        type="number"
                        id="areaSize"
                        name="areaSize"
                        onChange={(e) => handleChange(e, "areaSize")}
                        value={formData.areaSize}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter area size"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="w-full bg-[#4e5e47] hover:bg-[#3a4735] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Processing...' : 'Get Insured'}
                      </button>
                    </div>
                  </form>
                )}
                
                {currentAccount && isInsured && (
                  <div>
                    <p className="text-green-600 font-semibold">You are already insured!</p>
                    <button
                      onClick={withdrawInsuranceMoney}
                      disabled={isLoading || withdrawAmount === "0"}
                      className="mt-4 w-full bg-[#4e5e47] hover:bg-[#3a4735] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {isLoading ? 'Processing...' : 'Withdraw Insurance Money'}
                    </button>
                  </div>
                )}

                <div className="mt-6 bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-[#4e5e47] mb-2">Information</h3>
                  {currentAccount && isInsured && insuranceDetails ? (
                    <div>
                      <p>Crop Type: {insuranceDetails.cropType}</p>
                      <p>Area Size: {insuranceDetails.areaSize} square meters</p>
                      <p>Insurance Price: {insuranceDetails.insurancePrice} ETH</p>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No information available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFrontend;