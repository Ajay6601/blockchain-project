// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
import "hardhat/console.sol";

contract Token {
	string public name;
	string public symbol;
	uint256 public decimals=18;
	uint256 public totalSupply;

	// Track Balances
	mapping(address => uint256) public balanceOf;
	// send tokens

	constructor(string memory _name,string memory _symbol,uint256 _totalSupply){
		name=_name;
		symbol=_symbol;
		totalSupply=_totalSupply*(10**decimals);
		balanceOf[msg.sender] = totalSupply;
	}

	function transfer(address _to,uint256 _value)
	public
	returns(bool success)
	{
		//Deduct tokens from sender
		balanceOf[msg.sender]=balanceOf[msg.sender]- _value;
		//Credit tokens to receiver
		balanceOf[_to]=balanceOf[_to]+_value;

	// Indicate success
    success = true;
    return success;
	}
} 