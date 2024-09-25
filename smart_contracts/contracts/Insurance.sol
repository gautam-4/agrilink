// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Insurance {
    address[] public insuredAddresses;
    address public immutable owner;
    mapping(address => uint256) public addressToAmount;
    uint256 public totalAmountToBePaidOut = 0;

    // New structs and mappings for dynamic pricing
    struct InsuranceDetails {
        string cropType;
        uint256 areaSize;
        uint256 insurancePrice;
    }
    mapping(address => InsuranceDetails) public insuranceDetails;

    // Crop type base prices (in wei)
    mapping(string => uint256) public cropBasePrices;

    event Insured(address indexed insuredAddress, uint256 insurancePrice);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        
        cropBasePrices["wheat"] = 0.5 gwei;
        cropBasePrices["corn"] = 0.7 gwei;
        cropBasePrices["rice"] = 0.6 gwei;
        cropBasePrices["soybeans"] = 0.8 gwei;
        cropBasePrices["cotton"] = 1.0 gwei;
        cropBasePrices["barley"] = 0.55 gwei;
        cropBasePrices["sorghum"] = 0.65 gwei;
        cropBasePrices["oats"] = 0.5 gwei;
        cropBasePrices["peanuts"] = 1.2 gwei;
        cropBasePrices["sunflower"] = 0.9 gwei;
        cropBasePrices["canola"] = 0.75 gwei;
        cropBasePrices["sugarcane"] = 1.1 gwei;
        cropBasePrices["potatoes"] = 0.85 gwei;
        cropBasePrices["tomatoes"] = 1.3 gwei;
        cropBasePrices["grapes"] = 1.5 gwei;
    }

    function setCropBasePrice(string memory cropType, uint256 basePrice) public onlyOwner {
        cropBasePrices[cropType] = basePrice;
    }

    function calculateInsurancePrice(string memory cropType, uint256 areaSize) public view returns (uint256) {
        require(cropBasePrices[cropType] > 0, "Crop type not supported");
        
        // Formula: basePrice * (areaSize / 10000) + 0.1 ether
        return (cropBasePrices[cropType] * areaSize / 10000) + 0.1 gwei;
    }

    function getInsured(string memory cropType, uint256 areaSize) public payable {
        uint256 insurancePrice = calculateInsurancePrice(cropType, areaSize);
        require(msg.value >= insurancePrice, "Insufficient ether sent for insurance price");
        
        insuredAddresses.push(msg.sender);
        insuranceDetails[msg.sender] = InsuranceDetails(cropType, areaSize, insurancePrice);
        
        emit Insured(msg.sender, insurancePrice);
        
        // Refund excess payment
        if (msg.value > insurancePrice) {
            payable(msg.sender).transfer(msg.value - insurancePrice);
        }
    }

    function giveInsuranceMoney(address deservingAddress, uint256 deservingAmount) public onlyOwner {
        addressToAmount[deservingAddress] += deservingAmount;
        totalAmountToBePaidOut += deservingAmount;
    }

    function payoutAllInsuranceMoney() public onlyOwner {
        require(address(this).balance >= totalAmountToBePaidOut, "Insufficient contract balance");

        for (uint256 i = 0; i < insuredAddresses.length; i++) {
            address payable recipient = payable(insuredAddresses[i]);
            uint256 amount = addressToAmount[insuredAddresses[i]];
            if (amount > 0) {
                recipient.transfer(amount);
                delete addressToAmount[insuredAddresses[i]];
            }
        }
        totalAmountToBePaidOut = 0;
    }

    function withdrawInsuranceMoney() public {
        require(addressToAmount[msg.sender] > 0, "You are not entitled to withdraw insurance money");

        address payable recipient = payable(msg.sender);
        uint256 amount = addressToAmount[msg.sender];

        require(address(this).balance >= amount, "Insufficient contract balance");

        recipient.transfer(amount);
        totalAmountToBePaidOut -= amount;
        delete addressToAmount[msg.sender];
    }

    function checkIsInsured() public view returns(bool) {
        return insuranceDetails[msg.sender].areaSize > 0;
    }

    function getTotalInsurancePoolAmount() public view returns(uint256) {
        return address(this).balance;
    }

    function hardDeleteData() public onlyOwner {
        delete insuredAddresses;

        for (uint256 i = 0; i < insuredAddresses.length; i++) {
            delete addressToAmount[insuredAddresses[i]];
            delete insuranceDetails[insuredAddresses[i]];
        }
    }

    function withdrawContract() public onlyOwner {
        (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess);
    }

    function fundContract() public payable {
        require(msg.value > 0);
    }

    receive() external payable { fundContract(); }
    fallback() external payable { fundContract(); }
}