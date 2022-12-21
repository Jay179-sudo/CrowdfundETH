require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli:
    {
      url: process.env.PUBLIC_KEY,
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};