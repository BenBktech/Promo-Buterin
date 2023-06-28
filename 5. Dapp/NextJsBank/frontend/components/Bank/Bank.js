"use client"

// Outil permettant de générer des identifiants unique
// car en ReactJS, lorsque l'on fait un map, chaque élément
// doit avoir une "KEY" unique
import { v4 as uuidv4 } from 'uuid';

// REACT 
import { useState, useEffect } from 'react'

// CHAKRA-UI
import { Heading, Flex, Text, Input, Button, useToast } from '@chakra-ui/react'

// CONTRACT
import Contract from '../../public/Bank.json'
import { ethers } from "ethers"

// WAGMI
import { prepareWriteContract, writeContract, readContract } from '@wagmi/core'
import { useAccount } from 'wagmi'

// VIEM (pour les events)
import { createPublicClient, http, parseAbiItem } from 'viem'
import { hardhat } from 'viem/chains'

const Bank = () => {

    // Create client for Viem
    const client = createPublicClient({
        chain: hardhat,
        transport: http(),
    })

    // Toast (obligé)
    const toast = useToast()

    // Reprendre les infos du wallet connecté
    const { isConnected, address } = useAccount()

    // STATES
    const [depositAmount, setDepositAmount] = useState(null)
    const [withdrawAmount, setWithdrawAmount] = useState(null)
    const [balance, setBalance] = useState(null)
    const [depositEvents, setDepositEvents] = useState([])
    const [widthdrawEvent, setWidthdrawEvents] = useState([])
    

    // CONTRACT ADDRESS
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

    // Deposit
    const deposit = async() => {
        try {
            console.log(depositAmount)
            const { request } = await prepareWriteContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "deposit",
                value: ethers.parseEther(depositAmount)
            });
            await writeContract(request)

            const balance = await getBalanceOfUser()
            setBalance(ethers.formatEther(balance))

            await getEvents()

            toast({
                title: 'Congratulations!',
                description: `You have successfully deposited ${depositAmount} Ethers`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        }
        catch(err) {
            toast({
                title: 'Error!',
                description: 'An error occured.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    // Withdraw
    const withdraw = async () => {
        try {
            // On fait le withdraw
            const { request } = await prepareWriteContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "withdraw",
                args: [ethers.parseEther(withdrawAmount)]
            });
            await writeContract(request);

            // On met à jour la balance
            const balance = await getBalanceOfUser()
            setBalance(ethers.formatEther(balance))

            await getEvents()

            toast({
                title: 'Congratulations.',
                description: "You have made a withdraw!",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch (err) {
            toast({
                title: 'Error.',
                description: "An error occured",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    // Get the balance of the user on the smart contract
    const getBalanceOfUser = async() => {
        try {
            const data = await readContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "getBalanceOfUser",
                account: address
            });
            console.log(data)
            return data;
        } catch (err) {
            console.log(err.message)
        }
    }

    // Get all the events 
    const getEvents = async() => {
        // get all the deposit events 
        const depositLogs = await client.getLogs({
            event: parseAbiItem('event etherDeposited(address indexed account, uint amount)'),
            fromBlock: 0n,
            toBlock: 'latest' // Pas besoin valeur par défaut
        })
        setDepositEvents(depositLogs.map(
            log => ({
                address: log.args.account,
                amount: log.args.amount
            })
        ))

        // get all the withdraw events 
        const withdrawLogs = await client.getLogs({
            event: parseAbiItem('event etherWithdrawed(address indexed account, uint amount)'),
            fromBlock: 0n,
        })
        setWidthdrawEvents(withdrawLogs.map(
            log => ({
                address: log.args.account,
                amount: log.args.amount
            })
        ))
    }

    useEffect(() => {
        const getBalanceAndEvents = async() => {
            if(address !== 'undefined') {
                const balance = await getBalanceOfUser()
                setBalance(ethers.formatEther(balance))
                await getEvents()
            }
        }
        getBalanceAndEvents()
    }, [address])

    return (
        <Flex width="100%">
            {isConnected ? (
                <Flex direction="column" width="100%">
                    <Heading as='h2' size='xl'>
                        Your balance in the Bank
                    </Heading>
                    <Text mt="1rem">{balance} Eth</Text>
                    <Heading as='h2' size='xl' mt="2rem">
                        Deposit
                    </Heading>
                    <Flex mt="1rem">
                        <Input onChange={e => setDepositAmount(e.target.value)} placeholder="Amount in Eth" />
                        <Button colorScheme='whatsapp' onClick={() => deposit()}>Deposit</Button>
                    </Flex>
                    <Heading as='h2' size='xl' mt="2rem">
                        Withdraw
                    </Heading>
                    <Flex mt="1rem">
                        <Input onChange={e => setWithdrawAmount(e.target.value)} placeholder="Amount in Eth" />
                        <Button colorScheme='whatsapp' onClick={() => withdraw()}>Withdraw</Button>
                    </Flex>
                    <Heading as='h2' size='xl' mt="2rem">
                        Deposit Events
                    </Heading>
                    <Flex mt="1rem" direction="column">
                    {depositEvents.length > 0 ? depositEvents.map((event) => {
                        return <Flex key={uuidv4()}><Text>
                           {event.address} - {ethers.formatEther(event.amount)} Eth</Text>
                        </Flex>
                    }) : (
                        <Text>No Deposit Events</Text>
                    )}
                    </Flex>
                    <Heading as='h2' size='xl' mt="2rem">
                        Withdraw Events
                    </Heading>
                    <Flex mt="1rem" direction="column">
                    {widthdrawEvent.length > 0 ? widthdrawEvent.map((event) => {
                        return <Flex key={uuidv4()}><Text>
                           {event.address} - {ethers.formatEther(event.amount)} Eth</Text>
                        </Flex>
                    }) : (
                        <Text>No Withdraw Events</Text>
                    )}   
                    </Flex>
                </Flex>
            ) : (
                <Flex p="2rem" justifyContent="center" alignItems="center" width="100%">
                    <Text>Please connect your Wallet</Text>
                </Flex>
            )}
            
        </Flex>
    )
}

export default Bank