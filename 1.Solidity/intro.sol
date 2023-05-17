// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Storage {

  /* 0 ou 1
  0 0101011
  uint 8 < 256 (a partir de 0)
  int 8 : -128 à +127
  bits

  bytes
  8 bits : 1 octet
  2^3
  0 ou 1 
  0 ou 1 ou 2... 9  decimal
  0 à 9 + ABCDE F */


    uint number;

    uint[] numbers;

    mapping (address => Humain) balance;

    bool verite;
    string str;
    address payable addr;

    enum etatVoiture{
        Accelere, 
        ralentit,
        arret
    }

    struct Humain{
        uint taille;
        uint age;
    }


    constructor(){
        verite = false;
        str = "salut";
    }

    Humain cyril;

    etatVoiture MaVoiture;

    function store(uint256 num) public {
        require(num > 40 || num < 12);
        number = num;
        payable(addr);
    }


    function retrieve() public view returns (uint256){
        return number;
    }

}
