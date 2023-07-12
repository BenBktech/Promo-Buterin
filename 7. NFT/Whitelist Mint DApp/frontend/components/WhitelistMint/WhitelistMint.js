"use client"
import { Flex, useToast, Text, Button, Alert, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react'
import { useAccount } from 'wagmi'
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core'
import { useState, useEffect } from 'react'
import Contract from '../../../backend/artifacts/contracts/NFTIsERC721A.sol/NFTIsERC721A.json'
import Image from 'next/image'

import whitelist from "../../../backend/whitelist.json"
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

import { ethers } from "ethers"

export const WhitelistMint = () => {

    //
    const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    const saleStartTime = process.env.NEXT_PUBLIC_SALESTARTIME
    const price = process.env.NEXT_PUBLIC_PRICE_WHITELIST_MINT
    const supply = process.env.NEXT_PUBLIC_MAX_WHITELIST

    const [actualTime, setActualTime] = useState(null)
    const [totalSupply, setTotalSupply] = useState(0)

    // Toast (obligé)
    const toast = useToast()

    // IS CONNECTED
    const { isConnected, address } = useAccount()

    const getTimestampInSeconds = () => {
        return Math.floor(Date.now() / 1000)
    }

    const mint = async(quantity) => {
        try {
            // Génère arbre + preuve en fonction de l'adresse
            let tab = [];
            whitelist.map((token) => {
                tab.push(token.address);
            });
            let leaves = tab.map((address) => keccak256(address));
            let tree = new MerkleTree(leaves, keccak256, { sort: true });
            let leaf = keccak256(address);
            let proof = tree.getHexProof(leaf);
            // Preuve que l'adresse est bien dans l'arbre de merkle
            // [bytes32, bytes32]
            // []

            // Conversion du prix en Wei
            let whitelistPrice = String(parseFloat(price) * quantity)
            whitelistPrice = ethers.parseEther(whitelistPrice)

            console.log(whitelistPrice)
            console.log(address)
            console.log(proof)

            // Execution de la fonction de mint
            const { request } = await prepareWriteContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "whitelistMint",
                args: [address, quantity, proof],
                value: whitelistPrice
            });
            await writeContract(request)

            toast({
                title: 'Congratulations.',
                description: "You have minted your NFT",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            await getDatas()           
        } catch (err) {
            console.log(err)
            toast({
                title: 'Error.',
                description: "An error occured",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const getDatas = async () => {
        try {
            setActualTime(getTimestampInSeconds())
            const data = await readContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "totalSupply"
            });
            setTotalSupply(parseInt(data))
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(isConnected) {
            getDatas()
        }
    }, [isConnected])


    return (
        <>
            {isConnected ? (
                actualTime >= saleStartTime ? (
                    <Flex justifyContent="space-between" alignItems="center">
                        <Flex direction="column" width="600px" justifyContent="center" alignItems="center">
                            <Text mb="1rem">
                                <Text as="span" fontWeight="bold">NFT sold : </Text>  
                                {totalSupply} / {supply}
                            </Text>
                            <Text mb="1rem">
                                <Text as="span" fontWeight="bold">Price : </Text>
                                {price} Eth / NFT
                            </Text>
                            <Flex justifyContent="space-around" alignItems="center" width="100%">
                                <Button onClick={() => mint(1)} colorScheme='purple'>Mint 1 NFT</Button>
                                <Button onClick={() => mint(2)} colorScheme='purple'>Mint 2 NFTs</Button>
                                <Button onClick={() => mint(3)} colorScheme='purple'>Mint 3 NFTs</Button>
                            </Flex>
                        </Flex>
                        <Image src="/imgNFT.png" width={500} height={500} alt="image NFT" />
                    </Flex>
                ) : (
                    <Alert status='warning'>
                        <AlertIcon />
                        Sale has not started
                    </Alert>
                )
                
            ) : (
                <Alert status='warning'>
                    <AlertIcon />
                    Please connect your Wallet
                </Alert>
            )}
        </>
    )
}