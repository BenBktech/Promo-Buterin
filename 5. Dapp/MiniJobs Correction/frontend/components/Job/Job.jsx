import { Button, Text, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

export const Job = ({ event, takeJob, payJob }) => {

    const { address } = useAccount()
    
    return (
        <Card mt={["1rem", "1rem", 0,0]} minWidth={["100%", "100%", "30%", "30%"]} ml="1%" mr="1%">
            <CardBody>
                <Text><Text as="span" fontWeight="bold">Author :</Text> {event.author.substring(0, 5)}...{event.author.substring(event.author.length - 4)}</Text>
                <Text mt="1rem" mb="1rem"><Text as="span" fontWeight="bold">Description</Text> : {event.description}</Text>
                {/* if the job is finished we display that the job is finished */}
                {event.isFinished ? (
                    <Text color="red" fontWeight="bold">Job is finished.</Text>
                ) : (
                    /* If the job is not finished, is the job already taken? */
                    event.isTaken ? (
                        /* If the job is taken, a button to pay the worker is displayed.
                        that you are the author of the job to display this button */
                        address === event.author ? (
                            <Button colorScheme="red" onClick={() => payJob(event.id)}>Pay</Button>
                        ) : (
                            /* Otherwise, it is displayed that the job is taken */
                            <Text color="green" fontWeight="bold">Job taken.</Text>
                        )
                    ) : (
                        /* if the job is not taken, a button is displayed to take the job, but it is necessary to check
                        that the connected address is not the one of the author of the job */
                        address !== event.author && (
                            <Button colorScheme="whatsapp" onClick={() => takeJob(event.id)}>Work</Button> 
                        )
                    )
                )}                
            </CardBody>
        </Card>
    )
}