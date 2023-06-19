var  Web3  =  require('web3');  
web3  =  new Web3(new  Web3.providers.HttpProvider('https://goerli.infura.io/v3/4fd863a5d6384e59ac144b28fa1fbd3d'));

console.log('Calling Contract.....');

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
console.log(Contract);

// FUNCTION must the name of the function you want to call. 
Contract.methods.retrieve().call().then(console.log);