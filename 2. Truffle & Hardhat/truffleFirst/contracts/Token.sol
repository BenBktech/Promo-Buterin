// ERC20Token.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
 
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
 
contract Token is ERC20 {   
   constructor(uint256 initialSupply) ERC20("ALYRA", "ALY") {
       _mint(msg.sender, initialSupply);
   }
}