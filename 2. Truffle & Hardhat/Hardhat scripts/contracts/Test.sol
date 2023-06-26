// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test {
    mapping(address => uint) private numbers;

    function setNumber(uint _number) external {
        numbers[msg.sender] = _number;
    }

    function getNumber() external view returns(uint) {
        return numbers[msg.sender];
    }
}
