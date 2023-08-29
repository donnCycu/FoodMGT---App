import React, {useState} from 'react'
import {Box, Button, Flex, Heading, Input,Text, useToast } from "@chakra-ui/react";
import AppNameLogo from "../components/AppNameLogo";


const RemindPassword = () => {
    const [username, setUsername] = useState('');
    const [showError, setShowError] = useState(false);
    const toast = useToast();
    const handleRemindPassword = (event) => {
        event.preventDefault();

        if (username === '') {
            setShowError(true);
            return;
        }
        setShowError(false);

        toast({
            title: 'Operacja udana.',
            description: 'Link do zmiany hasła został wysłany na maila.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };
    return (
        <Box display="flex" width="full" height="100vh" backgroundColor="#E6E6E6">
            <Box width="50%" height="full" bg="rgba(237, 130, 69, 0.37)" borderRightRadius="200px">
                <AppNameLogo fontSize="5rem" width="100%" height="100%" fontWeight={600} />

            </Box>
            <Box

                width="50%"
                height="80%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Flex flexDirection="column" alignItems="center" width="100%" >
                    <Box width="full" color="black" >
                        <Heading mb={4} fontWeight="400" fontSize={20} textAlign="center">Przypomnij hasło</Heading>
                    </Box>
                    <Box
                         display="flex"
                         alignItems="center"
                         justifyContent="center"
                         flexDirection="column"
                         width="full"

                    >
                        <Box width="40%">
                            <form onSubmit={handleRemindPassword}>
                                <Input placeholder="Email lub numer telefonu" borderColor="#ED8245" value={username} onChange={(e) => setUsername(e.target.value)} />
                                {showError && <Text fontSize="0.6rem" color="red.500">Wypełnij pole</Text>}
                                <Button type="submit" mt={6} width="full" p={4} bg="#ED8245" _hover={{color:'white'}} disabled={username === ''}>Przypomnij hasło</Button>
                            </form>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Box>
    )
}

export default RemindPassword