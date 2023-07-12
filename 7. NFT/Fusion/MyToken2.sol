// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./MyToken1.sol";
import "./Serum.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MyToken2 is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {

    using Strings for uint;

    MyToken nft;
    Serum serum;

    mapping(uint => uint) tokenIdToSerumId;
    mapping(address => uint) numberNftMintedPerAddress;

    string baseURI;

    constructor(MyToken _nft, Serum _serum) ERC721("MyToken", "MTK") {
        nft = _nft;
        serum = _serum;
    }

    function safeMint(address to, uint nftId, uint serumId)
        public
        onlyOwner
    {
        require(numberNftMintedPerAddress[msg.sender] == 0, "Serum already used");
        require(nft.ownerOf(nftId) == msg.sender, "Not the owner");
        require(serum.balanceOf(msg.sender, serumId) == 1, "You don't have a Serum");
        numberNftMintedPerAddress[msg.sender]++;
        _safeMint(to, nftId);
        nft.burn(nftId);
        serum.burn(msg.sender, serumId, 1);
        tokenIdToSerumId[nftId] = serumId;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint _tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");
        string memory tokenUri;
        if(tokenIdToSerumId[_tokenId] == 1) {
            tokenUri = string(abi.encodePacked("ipfs://CID1/", _tokenId.toString(), ".json"));
        }
        if(tokenIdToSerumId[_tokenId] == 2) {
            tokenUri = string(abi.encodePacked("ipfs://CID2/", _tokenId.toString(), ".json"));
        }
        if(tokenIdToSerumId[_tokenId] == 3) {
            tokenUri = string(abi.encodePacked("ipfs://CID3/", _tokenId.toString(), ".json"));
        }
        if(tokenIdToSerumId[_tokenId] == 4) {
            tokenUri = string(abi.encodePacked("ipfs://CID4/", _tokenId.toString(), ".json"));
        }
        return tokenUri;        
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}