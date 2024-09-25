async function main() {
  const Insurance = await ethers.getContractFactory('Insurance');

  console.log('Deploying Insurance contract...');

  const insurance = await Insurance.deploy();
  await insurance.deployed();

  console.log('Insurance contract deployed to:', insurance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });
