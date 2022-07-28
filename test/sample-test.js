const { expect } = require("chai");
const { ethers } = require("hardhat");
const erc165 = require("erc165");

describe("Example using ERC165 Interface Id", function () {

  it("Should be True for matching interfaceId with EIP165", async function() {

    [ Deployer ] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Homer", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();

    const boolean = await deployedContract.supportsInterface("0x01ffc9a7"); //EIP-165 interfaceId
    expect(boolean).to.be.true;

  });

  it("Should be True for matching interfaceId for Homer contract", async function() {

    [ Deployer ] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Homer", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();

    const abi = await hre.artifacts.readArtifact("contracts/ERC165ViewOnly.sol:/IHomer");
    const interfaceId = erc165.interfaceIdFromABI(abi.abi);

    const boolean = await deployedContract.supportsInterface(interfaceId);
    expect(boolean).to.be.true;

  });

  it("Should be True for matching interfaceId for Lisa contract", async function() {
    
    [ Deployer ] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Lisa", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();
    
    const abi = await hre.artifacts.readArtifact("contracts/ERC165Mapping.sol:/ILisa");
    const interfaceId = erc165.interfaceIdFromABI(abi.abi);
    
    const boolean = await deployedContract.supportsInterface(interfaceId);
    expect(boolean).to.be.true;

  });
  
  it("Should be False when the interface is not implemented", async function() {

    [ Deployer ] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Lisa", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();

    const boolean = await deployedContract.supportsInterface("0xffffffff");
    expect(boolean).to.be.false;

  });

  it("Supported interfaceId from selector should be equal to the fetched from ERC-165 library", async function() {

    [ Deployer ] = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Lisa", Deployer.address);
    const deployedContract = await factory.deploy();
    await deployedContract.deployed();

    const abi = await hre.artifacts.readArtifact("contracts/ERC165Mapping.sol:/ILisa");
    const interfaceId = erc165.interfaceIdFromABI(abi.abi);
    const supportedInterfaces = await deployedContract.getSupportedInterfaces();

    expect(interfaceId).to.be.equal(supportedInterfaces);

  });
  
});