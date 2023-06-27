"use client";
import { useContext } from "react"
import WalletContext from "@/context/walletProvider";

export default function useWalletProvider() {
    const context = useContext(WalletContext)
    if(!context) {
        throw new Error('Error')
    }
    return context
}