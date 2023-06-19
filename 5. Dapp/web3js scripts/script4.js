async function main() {

    var  Web3  =  require('web3');
    require('dotenv').config();
    const HDWalletProvider = require('@truffle/hdwallet-provider');
    
    provider = new HDWalletProvider(`${process.env.MNEMONIC}`, `https://goerli.infura.io/v3/${process.env.INFURA_ID}`)
    web3 = new Web3(provider);
    
    
    var  abi  =  [
        {
            "inputs": [],
            "name": "number",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "retrieve",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "num",
                    "type": "uint256"
                }
            ],
            "name": "store",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    ];
    var  addr  =  "0x9AC7f23499CB84B3F52A682B03AB2B2F557E0F13";
    
    var  Contract  =  new  web3.eth.Contract(abi, addr);
    
    Contract.methods.retrieve().call().then(console.log);
    await Contract.methods.store(18).send({ from: '0x13bc18faeC7f39Fb5eE428545dBba611267AEAa4' });
    Contract.methods.retrieve().call().then(console.log);
    }
    
    main();