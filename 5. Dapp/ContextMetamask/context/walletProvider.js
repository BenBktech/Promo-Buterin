"use client"
import React, { useState, useEffect } from "react"
import { ethers } from "ethers"
import detectEthereumProvider from "@metamask/detect-provider"

const WalletContext = React.createContext(null)

export const WalletProvider = ({ children }) => {

    //STATES
    const [account, setAccount] = useState(null)
    const [provider, setProvider] = useState(null)
    const [chainId, setChainId] = useState(null)

    let currentAccount = null

    //EVENTS METAMASK
    useEffect(() => {
        ethereum.on('accountsChanged', handleAccountsChanged)
        ethereum.on('chainChanged', handleChainChanged)
        //Faire ici le return pour remove les listeners
        return () => {
            ethereum.removeListener('accountsChanged', handleAccountsChanged)
            ethereum.removeListener('chainChanged', handleChainChanged)
        }
    }, [])

    // Connexion function
    const connect = async() => {
        const provider = await detectEthereumProvider() 
        if(provider) {
            startApp(provider)
            const chainId = await ethereum.request({ method: 'eth_chainId'})
            console.log(chainId)
            if(chainId.toString() === "0x5") {
                ethereum.request({ method: 'eth_requestAccounts'})
                    .then(handleAccountsChanged)
                    .catch((err) => {
                        if(err.code === 4001) {
                            console.log('Please connect to Metamask')
                        }
                        else {
                            console.log(err)
                        }
                    })
            }
            else {
                console.log('Please change your network on Metamask, you need to be connected to Goerli test network')
            }
        }
        else {
            console.log('Please install Metamask!')
        }
    }

    const startApp = (provider) => {
        if(provider !== window.ethereum) {
            console.error("Do you have multiple Wallets installed ?")
        }
    }

    const handleAccountsChanged = (accounts) => {
        if(accounts.length === 0) {
            console.log('Disconnected')
            setAccount(null)
            setProvider(null)
            setChainId(null)
        }
        else if(accounts[0] !== currentAccount) {
            currentAccount = accounts[0]
            setAccount(currentAccount)
        }
    }

    const handleChainChanged = () => {
        window.location.reload()
    }

    return (
        <WalletContext.Provider 
            value={{
                account,
                provider,
                setAccount,
                chainId,
                connect
            }}
        >
            {children}
        </WalletContext.Provider>
    )
}

export default WalletContext