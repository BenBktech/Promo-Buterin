import React from 'react'
import { Flex, Alert, AlertIcon, Text } from '@chakra-ui/react'
import Link from 'next/link'

const NoJobs = () => {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
        <Alert status='warning' width="300px">
            <AlertIcon />
            <Flex direction="column">
            <Text as='span'>There are no jobs on our DApp.</Text>
            <Text><Link href="addajob" style={{"fontWeight": "bold"}}>Create the first job!</Link></Text>
            </Flex>
        </Alert>
    </Flex>
  )
}

export default NoJobs