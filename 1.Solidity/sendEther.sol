// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error InsufficientBalance();

contract SendEther {

    address myAddress;

    function setMyAddress(address _myAddress) external {
        myAddress = _myAddress;
    }

    function getBalance() external view returns(uint) {
        return myAddress.balance;
    }

    function getBalanceOfAddress(address _myAddress) external view returns(uint) {
        return _myAddress.balance;
    }

    function sendViaTransfer(address payable _to) external payable {
        // transfer n'est plus recommandé
        _to.transfer(msg.value);
    }

    function sendViaSend(address payable _to) external payable {
        // send n'est pas recommandé
        bool sent = _to.send(msg.value);
        require(sent, "Failed to send Ether");
    }

    function sendViaCall(address payable _to) external payable {
        // C'est la méthode qu'il faut utiliser selon la documentation
        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    // Faire une fonction qui permet de faire un transfert d'eth vers l'address stockée, 
    // si et uniquement si elle a une balance superieur à une valeur donnée en param. 
    // Vous pouvez tester avec 1 wei ou 100 eth */
    function sendIfEnoughEthers(uint _minBalance) external payable {
        if(myAddress.balance <= _minBalance) {
            revert InsufficientBalance();
        }
        (bool sent, ) = myAddress.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    // Ajouter une vérification aux fonctions d'envoi: le minimum envoyé est de 1wei */
    // require(msg.value >= 1, "Not enough wei sent");

}