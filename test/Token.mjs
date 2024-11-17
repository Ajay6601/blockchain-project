import { expect } from "chai"; // Named import from chai
import hardhat from "hardhat"; // Default import for hardhat
// require("@nomicfoundation/hardhat-chai-matchers");

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
    // console.log(token);
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

  describe("Sending Token", () => {
  let amount, transaction, result;

describe ('Success',()=>{


	  beforeEach(async () => {
	    amount = tokens(100);
	    transaction = await token.connect(deployer).transfer(receiver.address, amount);
	    result = await transaction.wait();
	  });

	  it("transfers token balance", async () => {
	    // Assert sender's balance
	    const deployerBalance = await token.balanceOf(deployer.address);
	    expect(deployerBalance.toString()).to.equal(tokens(999900).toString());

	    // Assert receiver's balance
	    const receiverBalance = await token.balanceOf(receiver.address);
	    expect(receiverBalance.toString()).to.equal(amount.toString());
	  });

	  it("emits a transfer event", async () => {
	   const event=result.events[0]
	   expect(event.event).to.equal('Transfer')
	   const args=event.args
	   expect(args.from).to.equal(deployer.address)
	   expect(args.to).to.equal(receiver.address)
	  	expect(args.value.eq(amount)).to.be.true; // Amount

	});
	});

describe('Failure',()=>{
	it("rejects insufficient balances",async()=>{
    const invalidAmount = ethers.utils.parseUnits("1000000000", "ether"); // Amount greater than deployer's balance
  try {
    // Attempt to transfer more tokens than the deployer has
    await token.connect(deployer).transfer(receiver.address, invalidAmount);
    // If the above does not revert, fail the test
    throw new Error("Transaction did not revert as expected");
  } catch (error) {
    // Check if the error is due to a revert
    expect(error.message).to.include("revert"); // General revert check
  }
	})

  it('rejects invalid recipient', async () => {
  const amount = tokens(100);
  try {
    await token.connect(deployer).transfer('0x0000000000000000000000000000000000000000', amount);
    throw new Error("Transaction did not revert as expected");
  } catch (error) {
    // Check for the revert error
    expect(error.message).to.include("revert"); // Or the specific reason, if available
  }
});

})
})
  })




