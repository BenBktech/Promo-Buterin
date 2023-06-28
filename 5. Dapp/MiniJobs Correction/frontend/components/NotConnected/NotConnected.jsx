import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

const NotConnected = () => {
  return (
    <Alert status='warning'>
        <AlertIcon />
        Please connect your Wallet.
    </Alert>
  )
}

export default NotConnected