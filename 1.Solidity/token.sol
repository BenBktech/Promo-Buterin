//0x0A9B6D72750C8e0102ee861d793aCc7FB118788c

pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ButeToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("ButeToken", "BTN")  {
        _mint(msg.sender, initialSupply);
    }

    function freeMint() public {
        _mint(msg.sender, 10);
    }
}