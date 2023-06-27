"use client"
import { Flex, Text, Input, Button } from "@chakra-ui/react"
import { useAccount } from 'wagmi'
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core'
import { useState, useEffect } from 'react'
import Contract from '../../../backend/artifacts/contracts/SimpleStorage.sol/SimpleStorage.json'

const Main = () => {

    const { address, isConnected } = useAccount()
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    
    const [number, setNumber] = useState(null)
    const [getNumber, setGetNumber] = useState(null)

    const setFavoriteNumber = async () => {
        try {
            const { request } = await prepareWriteContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "setNumber",
                args: [number]
            });
            const { hash } = await writeContract(request);
            await getDatas()
            return hash;
        } catch (err) {
            console.log(err.message)
        }
    }

    const getDatas = async() => {
        try {
            const data = await readContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "getNumber",
            });
            setGetNumber(data.toString())
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
        <Flex p="2rem" width="100%" height="85vh" justifyContent="center" alignItems="center">
            {isConnected ? (
                <Flex direction="column" width="100%">
                    <Flex>
                        <Input onChange={e => setNumber(e.target.value)} placeholder="Your favorite number" />
                        <Button onClick={() => setFavoriteNumber()} colorScheme="purple">Set Favorite Number</Button>
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" mt="2rem">
                        <Text>Your favorite number : {getNumber}</Text>
                    </Flex> 
                </Flex>
            ) : (
                <Flex p="2rem" justifyContent="center" alignItems="center">
                    <Text>Please connect your Wallet.</Text>
                </Flex>
            )}
        </Flex>
    )
}

export default Main