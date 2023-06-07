// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;


contract SimpleStorage {
    uint storedData;
    event Setted(uint _value);

    function set(uint x) public {
        require(x != 42, "pas bon");
        storedData = x;
        emit Setted(x);
    }

    function get() public view returns (uint) {
        return storedData;
    }
}