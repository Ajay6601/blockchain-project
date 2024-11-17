// require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-chai-matchers");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      chainId: 31337,
    },
  },
};
