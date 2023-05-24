//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Epargne is Ownable {

    mapping(uint => uint) deposits; //0 => 3.4eth - 1 => 7.8 eth etc.
    uint depositId;
    uint time;
    // address immutable i_owner;

    // constructor() {
    //     i_owner = msg.sender;
    // }

    // modifier onlyOwner {
    //     require(msg.sender == i_owner);
    //     _;
    // }

    function deposit() external payable onlyOwner {
        require(msg.value > 0, "Not enough funds provided");
        deposits[depositId] = msg.value;
        depositId++;
        if(time == 0) {
            time = block.timestamp + 12 seconds;
        }
    }

    function withdraw() external onlyOwner {
        require(block.timestamp >= time, "Wait 3 months after the first deposit to withdraw");
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "An error occured");
    }

}