"use client"
import useWalletProvider from "@/hooks/useWalletProvider"
import { ethers } from 'ethers'
import { Flex, Text, Button } from "@chakra-ui/react"

const Header = () => {

    const { account, provider, setAccount, chainId, connect } = useWalletProvider()

    const connectWallet = () => {
        connect()
    }

    return (
        <Flex
            p="2rem"
            justifyContent="space-between"
            alignItems="center"
        >
            <Text>Logo</Text>
            {account !== null ? (
                <Text>
                    Account connect : <Text as="span" fontWeight="bold" color="purple">
                        {account.substring(0, 5)}...{account.substring(account.length - 4)}
                    </Text>
                </Text>
            ) : (
                <Button
                    onClick={() => connectWallet()}
                >
                    Connexion
                </Button>
            )}
        </Flex>
    )
}

export default Header