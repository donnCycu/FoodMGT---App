import React, { useState } from 'react';
import { Checkbox, Button, Input, Box, Heading, Text, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (event) => {
        event.preventDefault();
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box textAlign="left" width="full" color="black">
                <Heading mb={4} fontWeight="400" fontSize={20} textAlign="center">Zaloguj się</Heading>
            </Box>
            <Box width="full"
                 display="flex"
                 alignItems="center"
                 justifyContent="center"
                 flexDirection="column">
                <Button leftIcon={<FaFacebookF />} colorScheme="facebook" variant="outline" width="full" mb={4} _hover={{background:'blue.700', color:'white'}}>
                    Zaloguj się przez Facebooka
                </Button>
                <Button leftIcon={<FaGoogle />} colorScheme="red" variant="outline" width="full" _hover={{background:'red.700', color:'white'}}>
                    Zaloguj się przez Google
                </Button>
                <Text color="black" my={4} text="center">lub</Text>
                <form onSubmit={handleLogin}>
                    <Box width="full">
                        <Input placeholder="Email lub numer telefonu" borderColor="#ED8245" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="Hasło" type="password" borderColor="#ED8245" mt={4} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Button type="submit" mt={6} width="full" p={4} bg="#ED8245" _hover={{color:'white'}}>Zaloguj</Button>
                </form>
                <Box display="flex" justifyContent="space-between" width="full" mt={2}>
                    <Checkbox colorScheme="orange" borderColor="gray.400"isChecked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}>
                        Zapamiętaj mnie
                    </Checkbox>
                    <Link to="/remindpassword" color="#ED8245">Zapomniałeś hasła?</Link>
                </Box>
            </Box>

            <Box borderBottom="2px solid black" width="full" mt="2em"></Box>
            <Box mt={4} width="full" display="flex" alignItems="start">
                <Text ml={2} color="black">Nie masz konta? <Link color="#ED8245" fontWeight="bold">Zarejestruj się </Link></Text>
            </Box>
        </Box>
    );
};

export default LoginForm;