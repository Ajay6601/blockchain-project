// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
import "hardhat/console.sol";

contract Token {
	string public name="Ajay";
	string public symbol="DAJ";
	uint256 public decimals=18;
	uint256 public totalSupply=1000000 * (10**decimals);

	constructor(string memory _name){
		name=_name;
	}
}