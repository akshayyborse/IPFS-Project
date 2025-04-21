const { ethers } = require("hardhat");

async function main() {
  try {
    console.log("Starting deployment to Sepolia network...");
    
    // Deploy a mock ERC20 token for testing
    console.log("Deploying MockToken...");
    const MockToken = await ethers.getContractFactory("MockERC20");
    const mockToken = await MockToken.deploy("Mock Token", "MTK");
    await mockToken.waitForDeployment();
    const mockTokenAddress = await mockToken.getAddress();
    console.log("MockToken deployed to:", mockTokenAddress);

    // Deploy the FileStorage contract
    console.log("Deploying FileStorage...");
    const FileStorage = await ethers.getContractFactory("FileStorage");
    const fileStorage = await FileStorage.deploy(mockTokenAddress);
    await fileStorage.waitForDeployment();
    const fileStorageAddress = await fileStorage.getAddress();
    console.log("FileStorage deployed to:", fileStorageAddress);

    console.log("\nDeployment Summary:");
    console.log("------------------");
    console.log("MockToken:", mockTokenAddress);
    console.log("FileStorage:", fileStorageAddress);
    console.log("\nDeployment successful! 🎉");
  } catch (error) {
    console.error("\nDeployment failed! ❌");
    console.error("Error details:", error.message);
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });