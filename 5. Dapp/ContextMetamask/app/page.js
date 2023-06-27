"use client"
import Head from "next/head"
import Header from "@/components/Header"
import useWalletProvider from "@/hooks/useWalletProvider"
import { Text } from "@chakra-ui/react"


export default function Home() {

  const { account } = useWalletProvider()

  return (
    <>
      <Head>
        <title>Advanced Metamask Connexion</title>
      </Head>
      <Header />
      {account ? (
        <Text p="2rem">Connected with address {account}.</Text>
      ) : (
        <Text p="2rem">You are not connected.</Text>
      )}
    </>
  )
}
