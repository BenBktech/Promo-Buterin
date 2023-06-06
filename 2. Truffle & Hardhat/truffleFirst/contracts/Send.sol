// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.17;

import "./Token.sol";

contract Send {

    address public where;

    constructor() payable{}

    function setAddr(address _addr) public {
        where = _addr;
    }

    function sendEth() public payable {
        (bool sent, )=where.call{value:0.1 ether}("");
        require(sent, "call non fait");
    }

    function checkToken(address _addr) public view returns (uint){
        return Token(_addr).balanceOf(address(this));
    }

}