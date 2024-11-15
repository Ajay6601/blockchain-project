// const { ethers } = require("hardhat");

// async function main() {
//   // Fetch contract to deploy
// const Token = await ethers.getContractFactory("Token");
// // console.log("Contract factory:", Token);

//   // Deploy contract
//   const token = await Token.deploy()
//   await token.deployed()
//   console.log(`Token Deployed to: ${token.address}`)
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });


const { ethers } = require("hardhat");

async function main() {
  console.log("Fetching contract factory for Token...");
  const Token = await ethers.getContractFactory("Token"); // Ensure "Token" matches exactly
  
  console.log("Deploying Token contract...");
  const token = await Token.deploy();

  // Wait for deployment to be completed
  await token.deployed();
  
  console.log("Token deployed to:", token.address);
  console.log("Contract deployment successful!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error during deployment:", error);
    process.exit(1);
  });
