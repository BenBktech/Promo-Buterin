const hre = require("hardhat");
const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelist = require('../whitelist.json');

async function main() {
  // Génération de la Merkle Root
  let tab = [];
  whitelist.map((account) => {
    tab.push(account.address);
  })
  const leaves = tab.map((address) => {
    return keccak256(address)
  })

  let tree = new MerkleTree(leaves, keccak256, { sort: true });
  let merkleTreeRoot = tree.getHexRoot();

  console.log(merkleTreeRoot)

  // CID IPFS
  let baseURI = 'ipfs://Qmeri5BdPG2MYunQRrri4Ba3oJqyJr8iphoA6ABdfyQiNh/';

  const NFTIsERC721A = await hre.ethers.deployContract("NFTIsERC721A", [merkleTreeRoot, baseURI]);

  await NFTIsERC721A.waitForDeployment();

  console.log(
    `NFTIsERC721A deployed to ${NFTIsERC721A.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
