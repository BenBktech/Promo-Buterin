//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BBKIsERC20 is ERC20, Ownable {

    mapping(address => bool) admins;

    constructor() ERC20("Ben BK", "BBK") {}

    function mint(address _to, uint _amount) external {
        require(admins[msg.sender], "Cannot mint if not admin");
        _mint(_to, _amount);
    }

    function addAdmin(address _admin) external onlyOwner {
        admins[_admin] = true;
    }

    function removeAdmin(address _admin) external onlyOwner {
        admins[_admin] = false;
    }

}