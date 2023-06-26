import { ethers } from './ethers.min.js'
import { abi, contractAddress } from './constants.js'

const connectButton = document.getElementById('connectButton')

const inputSendEthers = document.getElementById('inputSendEthers')
const buttonSendEthers = document.getElementById('buttonSendEthers')
const inputWithdrawEthers = document.getElementById('inputWithdrawEthers')
const buttonWithdrawEthers = document.getElementById('buttonWithdrawEthers')

let connectedAccount

connectButton.addEventListener('click', async function() {
    if(typeof window.ethereum !== 'undefined') {
        const resultAccount = await window.ethereum.request({ method: "eth_requestAccounts" })
        connectedAccount = ethers.utils.getAddress(resultAccount[0])
        connectButton.innerHTML = "Connected with " + connectedAccount.substring(0, 4) + "..." + connectedAccount.substring(connectedAccount.length - 4)
    }
    else {
        connectButton.innerHTML = "Please install Metamask!"
    }
})

buttonSendEthers.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let ethersAmount = inputSendEthers.value // 5 WEI
            let weiAmount = ethers.utils.parseEther(ethersAmount) // On converti le montant de l'utilisateur qui est en Ethers en Wei // 5 Ethers
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.sendEthers({ value: weiAmount })
            await transaction.wait()
        }
        catch(e) {
            console.log(e)
        }
    }
})

buttonWithdrawEthers.addEventListener('click', async function() {
    if(typeof window.ethereum !== "undefined" && connectedAccount) {
        try {
            let ethersAmount = inputWithdrawEthers.value // 5 WEI
            let weiAmount = ethers.utils.parseEther(ethersAmount) // On converti le montant de l'utilisateur qui est en Ethers en Wei // 5 Ethers

            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            let transaction = await contract.withdraw(weiAmount)
            await transaction.wait()
        }
        catch(e) {
            console.log(e)
        }
    }
})