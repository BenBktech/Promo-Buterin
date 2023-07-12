pragma solidity 0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Azuki is ERC721A, Ownable {

    uint private constant MAX_SUPPLY = 10;
    //uint private constant PRICE_PER_NFT = 0.002 ether;
    uint private constant AMOUNT_NFT_PER_WALLET = 3;
    string public baseURI;
    using Strings for uint;

    mapping(address => uint) amountNftMinted;

    constructor(string memory _baseURI) ERC721A("Alyra Buterin", "AlyBut") {
        baseURI = _baseURI;
    }

    function mint(uint256 quantity) external payable {
        require(amountNftMinted[msg.sender] + quantity <= AMOUNT_NFT_PER_WALLET, "You have already minted a NFT");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Max supply exceeded");
        //require(msg.value >= quantity * PRICE_PER_NFT, "Not enough funds");
        amountNftMinted[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    } 

    function tokenURI(uint _tokenId) public view virtual override(ERC721A) 
    returns(string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    //N'OUBLIEZ PAS LE WITHDRAW !!!!!!!
}