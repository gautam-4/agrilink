import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "@/utils/constants";

export const InsuranceContext = createContext();

const { ethereum } = window;

const createEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const InsuranceContract = new ethers.Contract(contractAddress, contractABI, signer);

    return InsuranceContract;
};

export const InsuranceProvider = ({ children }) => {
    const [formData, setFormData] = useState({ cropType: "", areaSize: "" });
    const [currentAccount, setCurrentAccount] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isInsured, setIsInsured] = useState(false);
    const [insuranceDetails, setInsuranceDetails] = useState(null);
    const [withdrawAmount, setWithdrawAmount] = useState("0");

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                await fetchAllData();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            setCurrentAccount(accounts[0]);
            await fetchAllData();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const fetchAllData = async () => {
        try {
            if (ethereum && currentAccount) {
                const InsuranceContract = createEthereumContract();
                
                // Check if insured
                const insured = await InsuranceContract.checkIsInsured();
                setIsInsured(insured);

                if (insured) {
                    // Fetch insurance details
                    const details = await InsuranceContract.insuranceDetails(currentAccount);
                    setInsuranceDetails({
                        cropType: details.cropType,
                        areaSize: details.areaSize.toString(),
                        insurancePrice: ethers.utils.formatEther(details.insurancePrice)
                    });

                    // Fetch withdraw amount
                    const amount = await InsuranceContract.addressToAmount(currentAccount);
                    setWithdrawAmount(ethers.utils.formatEther(amount));
                } else {
                    // Reset insurance details and withdraw amount if not insured
                    setInsuranceDetails(null);
                    setWithdrawAmount("0");
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getInsured = async () => {
        try {
            if (ethereum) {
                const { cropType, areaSize } = formData;
                const InsuranceContract = createEthereumContract();
                const insurancePrice = await InsuranceContract.calculateInsurancePrice(cropType, areaSize);

                setIsLoading(true);
                const insuranceTx = await InsuranceContract.getInsured(cropType, areaSize, { value: insurancePrice });
                await insuranceTx.wait();
                setIsLoading(false);

                await fetchAllData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    const withdrawInsuranceMoney = async () => {
        try {
            if (ethereum) {
                const InsuranceContract = createEthereumContract();

                setIsLoading(true);
                const withdrawTx = await InsuranceContract.withdrawInsuranceMoney();
                await withdrawTx.wait();
                setIsLoading(false);

                await fetchAllData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // Add this new useEffect to refetch data when currentAccount changes
    useEffect(() => {
        if (currentAccount) {
            fetchAllData();
        }
    }, [currentAccount]);

    return (
        <InsuranceContext.Provider
            value={{
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
            }}
        >
            {children}
        </InsuranceContext.Provider>
    );
};