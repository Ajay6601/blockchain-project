
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

const { ethers } = require("hardhat");

const tokens=(n)=>{
	return ethers.utils.parseUnits(n.toString(),'ether')
}

describe("Token", ()=> {
	let token

	beforeEach(async()=>{
		// Fetch token from blockchain
		const Token=await ethers.getContractFactory('Token')
		token=await Token.deploy('Ajay')
		await token.deployed();
	})
  it("has correct name", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    expect(await token.name()).to.equal("Ajay");
  })

  it("has correct symbol", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    expect(await token.symbol ()).to.equal("DAJ");
  })

  it("has correct decimal", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    const decimals = await token.decimals();
    expect(decimals.toString()).to.equal('18');
  })

  it("has correct total supply", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    // const value = ethers.utils.parseUnits('1000000', 'ether'); // Expected value in BigNumber
  	// const totalSupply = await token.totalSupply(); // Actual value in BigNumber
    // expect(await token.totalSupply()).to.equal(value);
      const totalSupply = await token.totalSupply();
  expect(totalSupply.eq(tokens('1000000'))).to.be.true;
  })
});

