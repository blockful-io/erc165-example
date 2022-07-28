const { expect } = require("chai");
const { ethers } = require("hardhat");
const erc165 = require("erc165");

describe("Example using ERC165 Interface Id", function () {

  it("Should return true or false for giving interface Id at ERCViewOnly", async function() {
    // Get the the interface Id from a given abi
    const abi = await hre.artifacts.readArtifact("contracts/ERC165ViewOnly.sol:/Homer");
    const interfaceId = erc165.interfaceIdFromABI(abi.abi);
    console.log("\n%s is the interfaceId", interfaceId);

    [ Deployer ] = await ethers.getSigners();
    console.log("Getting Signer as %s", Deployer.address);

    const factory = await ethers.getContractFactory("Homer", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();
    console.log("Factory will be deployed at address %s", deployedContract.address);

    const boolean = await deployedContract.supportsInterface(interfaceId);
    console.log("Supports Interface? %s", boolean);
    

  });

  it("Should return true or false for giving interface Id at ERC165Mapping", async function() {
    // Get the the interface Id from a given abi
    const abi = await hre.artifacts.readArtifact("contracts/ERC165Mapping.sol:/Lisa");
    const interfaceId = erc165.interfaceIdFromABI(abi.abi);
    console.log("\n%s is the interfaceId", interfaceId);

    [ Deployer ] = await ethers.getSigners();
    console.log("Getting Signer as %s", Deployer.address);

    const factory = await ethers.getContractFactory("Homer", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();
    console.log("Factory will be deployed at address %s", deployedContract.address);

    const boolean = await deployedContract.supportsInterface(interfaceId);
    console.log("Supports Interface? %s", boolean);

    const gasUsed = await deployedContract.estimateGas;
    console.log("Gas Used: %s", gasUsed);
  });


  
});