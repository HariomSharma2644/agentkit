import { ethers } from 'hardhat';

async function main() {
  console.log('Deploying OilWiseCertification contract...');

  // Get the contract factory
  const OilWiseCertification = await ethers.getContractFactory('OilWiseCertification');

  // Deploy the contract
  const contract = await OilWiseCertification.deploy();

  // Wait for deployment to finish
  await contract.deployed();

  console.log('OilWiseCertification deployed to:', contract.address);

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contract.address,
    deploymentBlock: await ethers.provider.getBlockNumber(),
    deploymentTime: new Date().toISOString(),
    network: (await ethers.provider.getNetwork()).name,
  };

  console.log('Deployment Info:', deploymentInfo);

  // Verify contract on Etherscan (if on mainnet/testnet)
  if (process.env.ETHERSCAN_API_KEY) {
    console.log('Verifying contract on Etherscan...');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds

    try {
      await hre.run('verify:verify', {
        address: contract.address,
        constructorArguments: [],
      });
      console.log('Contract verified on Etherscan');
    } catch (error) {
      console.error('Verification failed:', error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

