"use client"
import NotConnected from '@/components/NotConnected/NotConnected'
import { useState } from 'react'
import { Heading, Flex, Text, Textarea, Input, Button, useToast } from '@chakra-ui/react'
import Contract from '../../../backend/artifacts/contracts/Jobs.sol/Jobs.json'
import { useRouter } from 'next/navigation'
import { prepareWriteContract, writeContract } from '@wagmi/core'
import { useAccount } from 'wagmi'
import { ethers } from "ethers"

const AddAJob = () => {

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    //STATES
    const [description, setDescription] = useState(null)
    const [price, setPrice] = useState(null)

    //ROUTER FOR REDIRECTION WITH NEXTJS
    const router = useRouter()

    //TOAST
    const toast = useToast()

    //ISCONNECTED
    const { isConnected } = useAccount()

    const addAJob = async() => {
        try {
            console.log(description)
            const { request } = await prepareWriteContract({
                address: contractAddress,
                abi: Contract.abi,
                functionName: "addJob",
                value: ethers.utils.parseEther(price),
                args: [String(description)],
            });
            const { hash } = await writeContract(request);
            
            toast({
                title: 'Congratulations!',
                description: "You have created a Job!",
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        }
        catch(error) {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        router.push('/')
    }

    return (
        <Flex direction="column" alignItems="center" justifyContent="center" w="100%" h="70vh">
            {isConnected ? (
                <>
                    <Heading as='h1' size='xl' noOfLines={1}>
                        Add a Job
                    </Heading>
                    <Flex mt="1rem" direction="column" width="100%">
                        <Text>Description :</Text>
                        <Textarea placeholder='The description of the job' onChange={e => setDescription(e.target.value)} />
                    </Flex>
                    <Flex mt="1rem" width="100%" direction="column">
                        <Text>Price :</Text>
                        <Input placeholder='How much you will pay your worker in ETH' onChange={e => setPrice(e.target.value)} />
                    </Flex>
                    <Button mt="1rem" colorScheme='whatsapp' width="100%" onClick={() => addAJob()}>Add</Button>
                </>
            ) : (
                <NotConnected />
            )}
        </Flex>
    )
}

export default AddAJob