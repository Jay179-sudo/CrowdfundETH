// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

const main = async () =>{
  // const ProjectFactory = await hre.ethers.getContractFactory("Project");
  // const ProjectFactoryContract = await ProjectFactory.deploy();
  // await ProjectFactoryContract.deployed();
  // console.log("Contract deployed to: ", ProjectFactoryContract.address);

  const CrowdfundFactory = await hre.ethers.getContractFactory("Crowdfund");
  const CrowdfundContract = await CrowdfundFactory.deploy();
  await CrowdfundContract.deployed();
  console.log("Contract deployed to: ", CrowdfundContract.address);

}

const runMain = async() =>{
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();