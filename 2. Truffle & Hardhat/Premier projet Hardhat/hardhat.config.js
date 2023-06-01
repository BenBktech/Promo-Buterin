require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

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
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      }
    ]
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN
    }
  }
};
