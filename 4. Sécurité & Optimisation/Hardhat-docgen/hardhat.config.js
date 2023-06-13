require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("hardhat-gas-reporter");
require('hardhat-docgen');

const PK = process.env.PK || ""
const RPC_URL = process.env.RPC_URL || ""
const ETHERSCAN = process.env.ETHERSCAN || ""

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
    sepolia: {
      url: RPC_URL,
      accounts: [`0x${PK}`],
      chainId: 11155111
    }
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN
    }
  }
};