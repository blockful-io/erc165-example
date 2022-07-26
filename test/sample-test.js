const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  
  it("Should return the ABI of a given artifact", async function() {
    const contractName = "Greeter";
    const artifactPath = "contracts/"+contractName+".sol:/"+contractName;
    const abi = await hre.artifacts.readArtifact(artifactPath);
    // Concatenate function name with its param types
    const prepareData = e => `${e.name}(${e.inputs.map(e => e.type)})`
    // Encode function selector (assume web3 is globally available)
    const encodeSelector = f => ethers.utils.id(f).slice(0,10);
    // Parse ABI and encode its functions
    const output = abi["abi"]
      .filter(e => e.type === "function")
      .flatMap(e => `${encodeSelector(prepareData(e))}`);
      //.flatMap(e => `${encodeSelector(prepareData(e))}: ${prepareData(e)}`);
    // Xor the output values and convert to hex
    console.log(ethers.utils.hexlify(output.reduce((prev, cur) => prev ^ cur)));
  });
});