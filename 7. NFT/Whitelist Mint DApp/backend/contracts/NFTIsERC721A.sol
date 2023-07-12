// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/* Author : Ben BK */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import './ERC721A.sol';

contract NFTIsERC721A is ERC721A, Ownable, PaymentSplitter {

    using Strings for uint;

    uint private constant MAX_SUPPLY = 10;
    uint private constant MAX_WHITELIST = 8;
    uint private constant MAX_SUPPLY_MINUS_GIFT = MAX_SUPPLY - MAX_WHITELIST;

    uint private constant PRICE_WHITELIST_MINT = 0.2 ether;

    uint public saleStartTime = 1689164900;

    bytes32 public merkleRoot;

    string public baseURI;

    mapping(address => uint) amountNFTperWalletWhitelistSale;

    uint private constant MAX_PER_ADDRESS_DURING_WHITELIST_MINT = 3;

    uint private teamLength;

    bool public isPaused = false;

    address[] private _team = [
        0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266,
        0x70997970C51812dc3A010C7d01b50e0d17dc79C8,
        0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
    ];

    uint[] private _teamShares = [
        700,
        295,
        5
    ];

    constructor(bytes32 _merkleRoot, string memory _baseURI) 
    ERC721A("NFT Alyra", "NFTAlyra")
    PaymentSplitter(_team, _teamShares) {
        merkleRoot = _merkleRoot;
        baseURI = _baseURI;
        teamLength = _team.length;
    }

    /** 
    * @notice Modifier that runs the code only if the contract is not paused
    */
    modifier whenNotPaused() {
        require(!isPaused, "The contract is paused");
        _;
    }

    /**
    * @notice Mint function for the Whitelist Sale
    *
    * @param _account Account which will receive the NFT
    * @param _quantity Amount of NFTs the user wants to mint
    * @param _proof The merkle proof
    **/
    function whitelistMint(address _account, uint _quantity, bytes32[] calldata _proof) external payable whenNotPaused {
        require(block.timestamp >= saleStartTime, "The sale has not started yet");
        require(isWhitelisted(_account, _proof), "Not whitelisted");
        require(amountNFTperWalletWhitelistSale[msg.sender] + _quantity <= MAX_PER_ADDRESS_DURING_WHITELIST_MINT, "You can only mint three NFT during the Whitelist Sale");
        require(totalSupply() + _quantity <= MAX_WHITELIST, "Max supply exceeded");
        require(msg.value >= PRICE_WHITELIST_MINT * _quantity, "Not enought funds");
        amountNFTperWalletWhitelistSale[msg.sender] += _quantity;
        _safeMint(_account, _quantity);
    }

    /** 
    * @notice Allows the owner to gift NFTs
    *
    * @param _to The address of the receiver
    * @param _quantity Amount of NFTs the owner wants to gift to the receiver
    **/
    function gift(address _to, uint _quantity) external onlyOwner whenNotPaused {
        require(totalSupply() + _quantity <= MAX_SUPPLY, "Reached max supply");
        _safeMint(_to, _quantity);
    }

    /** 
    * @notice Allows to pause/unpause the smart contract 
    *
    * @param _isPaused true or false if we want to pause or unpause the contract
    */
    function setPause(bool _isPaused) external onlyOwner {
        isPaused = _isPaused;
    }

    /**
    * @notice Get the token URI of a NFT by his ID
    *
    * @param _tokenId The Id of the NFT you want to have the URI of the metadatas
    *
    * @return URI of an NFT by his ID
    */
    function tokenURI(uint _tokenId) public view virtual override(ERC721A) returns(string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    /**
    * @notice Change the starting time of the sale
    *
    * @param _saleStartTime The new starting timestamp of the sale
    **/
    function setSaleStartTime(uint _saleStartTime) external onlyOwner {
        saleStartTime = _saleStartTime;
    }

    /**
    * @notice Change the base URI of the NFTs
    *
    * @param _baseURI the new base URI of the NFTs
    **/
    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    /**
    * @notice Change the merkle root
    *
    * @param _merkleRoot the new merkle root
    **/
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }

    /**
    * @notice Check if an address is whitelisted or not
    * 
    * @param _account The account checked
    * @param _proof The merkle proof
    *
    * @return bool return true if the address is whitelisted, false otherwise
    **/
    function isWhitelisted(address _account, bytes32[] calldata _proof) internal view returns(bool) {
        return MerkleProof.verify(_proof, merkleRoot, keccak256(abi.encodePacked((_account))));
    }

    /** 
    @notice Release the gains on every accounts
    **/
    function releaseAll() external {
        for(uint i = 0 ; i < teamLength ; i++) {
            release(payable(payee(i)));
        }
    }

    //Not allowing receiving ethers outside minting functions 
    receive() override external payable {
        revert('Only if you mint');
    }

}