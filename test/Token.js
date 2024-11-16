
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
		token=await Token.deploy('Ajay','DAJ','1000000')
		await token.deployed();
	})

describe("Deployment",()=>{
	const name="Ajay"
	const symbol="DAJ"
	const decimals='18'
	const totalSupply=tokens('1000000')


  it("has correct name", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    expect(await token.name()).to.equal(name);
  })

  it("has correct symbol", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    expect(await token.symbol ()).to.equal(symbol);
  })

  it("has correct decimal", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    const tokenDecimals = await token.decimals();
  expect(tokenDecimals.toString()).to.equal(decimals.toString());
  })

  it("has correct total supply", async ()=> {
    const chai = await import("chai");
    const { expect } = chai;
    // const value = ethers.utils.parseUnits('1000000', 'ether'); // Expected value in BigNumber
  	// const totalSupply = await token.totalSupply(); // Actual value in BigNumber
    // expect(await token.totalSupply()).to.equal(value);
      const tokenTotalSupply = await token.totalSupply();
  expect(tokenTotalSupply.eq(totalSupply)).to.be.true; // Compare using .eq()
  })
  })

	// Describe Spending....
	// Describe approving...

});

