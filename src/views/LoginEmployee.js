import React, { useState, useEffect } from 'react';
import {Box,Flex,Text,Input,Button,useToast  } from "@chakra-ui/react";
import AppNameLogo from "../components/AppNameLogo";
import { useNavigate  } from 'react-router-dom';

const LoginEmployee = () => {
    const [code, setCode] = useState("");
    const [canLogin, setCanLogin] = useState(false);
    const toast = useToast();
    const navigate = useNavigate ();

    useEffect(() => {
        if (code.length >= 4 && code.length <= 6) {
            setCanLogin(true);
        } else {
            setCanLogin(false);
        }
    }, [code]);

    const handleClick = (number) => {
        if (code.length < 6) {
            setCode((prevCode) => prevCode + number);
        }
    };

    const handleLogin = () => {
        if (code === "1234") {
            toast({
                title: "Zalogowano pomyślnie.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            navigate("/employeepanel");
        } else {
            toast({
                title: "Nie udało się zalogować.",
                status: "error",
                duration: 2000,
                isClosable: true,
            });
        }
        setCode("");
    };

    return(
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" w="100vw" h="100vh" bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)">
            <Text>Aby się zalogować, wpisz "1234"</Text>
            <Flex alignItems="center" flexDirection="column" justifyContent="space-between" py={6} px={4} w="400px"  border="1px solid #ED8245" borderRadius="20px" boxShadow="lg">
                <Flex flexDirection="column" w="100%">
                    <AppNameLogo fontSize="1.2rem"/>
                    <Input
                        variant="filled"
                        colorScheme="whiteAlpha"
                        my={4}
                        value={Array.from({ length: code.length }, () => '*').join('')}
                        readOnly
                    />
                </Flex>
                <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap" w="100%">
                    <Button mb={4} mr={2} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(1)}>1</Button>
                    <Button mb={4} mr={2} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(2)}>2</Button>
                    <Button mb={4} p={10}  backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(3)}>3</Button>
                    <Button mb={4} mr={2} p={10} borderRadius="10px" backgroundColor="rgba(255, 255, 255, 0.5)" onClick={() => handleClick(4)}>4</Button>
                    <Button mb={4} mr={2} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(5)}>5</Button>
                    <Button mb={4} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(6)}>6</Button>
                    <Button mr={2} mb={4} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(7)}>7</Button>
                    <Button mr={2} mb={4} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(8)}>8</Button>
                    <Button mb={4} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(9)}>9</Button>
                    <Flex alignItems="center" justifyContent="center" w="100%">
                        <Button mb={4} p={10} backgroundColor="rgba(255, 255, 255, 0.5)" borderRadius="5px" onClick={() => handleClick(0)}>0</Button>
                    </Flex>
                </Flex>
                <Box w="100%">
                    <Button w="100%" className="accept-button" isDisabled={!canLogin} onClick={handleLogin}>
                        Zaloguj
                    </Button>
                </Box>
            </Flex>
        </Box>
    )
}
export default LoginEmployee
