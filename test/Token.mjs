
// describe("Token", function () {
//   it("has correct name", async function () {
//     const chai = await import("chai");
//     const { expect } = chai;
//     const { ethers } = require("hardhat");

//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     await token.deployed();

//     const name = await token.name();
//     expect(name).to.equal("Ajay");
//   })

//   it("has correct symbol", async function () {
//     const chai = await import("chai");
//     const { expect } = chai;
//     const { ethers } = require("hardhat");

//     const Token = await ethers.getContractFactory("Token");
//     const token = await Token.deploy();
//     await token.deployed();

//     const symbol = await token.symbol ();
//     expect(symbol).to.equal("DAJ");
//   });
// });

import { expect } from "chai"; // Named import from chai
import hardhat from "hardhat"; // Default import for hardhat

const { ethers } = hardhat;

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

describe("Token", () => {
  let token,accounts,deployer,receiver

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy("Ajay", "DAJ", "1000000");
    await token.deployed();
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver=accounts[1];
  });

  describe("Deployment", () => {
    const name = "Ajay"; 
    const symbol = "DAJ";
    const decimals = 18;
    const totalSupply = tokens("1000000");

    it("has correct name", async () => {
      expect(await token.name()).to.equal(name);
    });

    it("has correct symbol", async () => {
      expect(await token.symbol()).to.equal(symbol);
    });

    it("has correct decimal", async () => {
      const tokenDecimals = await token.decimals();
      expect(tokenDecimals.toString()).to.equal(decimals.toString());
    });

    it("has correct total supply", async () => {
      const tokenTotalSupply = await token.totalSupply();
  expect(tokenTotalSupply.eq(totalSupply)).to.be.true;
    });

    it("assigns total supply to deployer", async () => {
    	// console.log(deployer)
      const deployerBalance  = await token.balanceOf(deployer.address);
      expect(deployerBalance.eq(totalSupply)).to.be.true;
    });
  });

  describe('Sending Token',()=>{
  	let amount
  	it("Transfers token balance", async () => {
  const sender = deployer.address; // Deployer's address
  const receiver = accounts[1].address; // Receiver's address
  const amount = tokens(100); // Amount to transfer

  // Log balances before transfer
  // console.log("deployer balance before transfer", (await token.balanceOf(sender)).toString());
  // console.log("receiver balance before transfer", (await token.balanceOf(receiver)).toString());

  // Perform the transfer
  await token.transfer(receiver, amount);

  // Log balances after transfer
  // console.log("deployer balance after transfer", (await token.balanceOf(sender)).toString());
  // console.log("receiver balance after transfer", (await token.balanceOf(receiver)).toString());

  // Assert sender's balance after transfer
  expect((await token.balanceOf(sender)).toString()).to.equal(tokens(999900).toString());

  // Assert receiver's balance after transfer
  expect((await token.balanceOf(receiver)).toString()).to.equal(amount.toString());
});

  	})
  })




