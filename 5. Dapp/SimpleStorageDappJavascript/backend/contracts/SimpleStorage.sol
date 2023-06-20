// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

/// @title A simple storage contract that stores a number
/// @author Ben BK

contract SimpleStorage {
    uint256 private myNumber;

    /// @notice Get the number
    /// @return The number stored inside the smart contract
    function getMyNumber() external view returns(uint256) {
        return myNumber;
    }

    /// @notice Set the number
    /// @param _myNumber The number the user wants to store
    function setMyNumber(uint256 _myNumber) external {
        myNumber = _myNumber;
    }
}
