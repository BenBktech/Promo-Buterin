require("@nomicfoundation/hardhat-toolbox")
require("hardhat-gas-reporter")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20"
      }
    ]
  },
  gasReporter: {
    enabled: true
  }
};
