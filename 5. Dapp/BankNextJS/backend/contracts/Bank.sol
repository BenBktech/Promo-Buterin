// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

///@title A simple Bank contract which allows users to deposit and then, withdraw ethers
///@author Benjamin 

contract Bank {

    struct Account {
        uint balance;
        uint lastDeposit;
    }

    mapping(address => Account) accounts;

    event etherDeposited(address indexed account, uint amount);
    event etherWithdrawed(address indexed account, uint amount);

    ///@notice Allows the user to withdraw ethers from the smart contract 
    ///@param _amount The amount of ethers the user wants to withdraw
    function withdraw(uint _amount) external {
        require(accounts[msg.sender].balance >= _amount, "Not enough funds");
        accounts[msg.sender].balance -= _amount;
        (bool received, ) = msg.sender.call{value: _amount}("");
        require(received, "An error occured");
        emit etherWithdrawed(msg.sender, _amount);
    }

    ///@notice Allows a user to deposit ethers on the smart contract
    function deposit() external payable {
        require(msg.value > 0, "Not enough funds deposited");
        accounts[msg.sender].balance += msg.value;
        accounts[msg.sender].lastDeposit = block.timestamp;
        emit etherDeposited(msg.sender, msg.value);
    }

    ///@notice Allows to get the amount of ethers the user has on the smart contract 
    ///@return The amount of ethers the user has on the smart contract
    function getBalanceOfUser() external view returns(uint) {
        return accounts[msg.sender].balance;
    }

}