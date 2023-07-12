"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { WhitelistMint } from '@/components/WhitelistMint/WhitelistMint'

export default function Home() {
  return (
    <WhitelistMint />
  )
}