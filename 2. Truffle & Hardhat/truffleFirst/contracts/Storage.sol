// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Storage {
    uint storedData;

    constructor(uint _initialValue)  payable {
        storedData = _initialValue;
    }
    
    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}