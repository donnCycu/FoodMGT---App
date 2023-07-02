import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FaFont } from 'react-icons/fa';
import LoginForm from './components/LoginForm';
import Dashboard from './views/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={
                    <Box display="flex" width="full" height="100vh" >
                        <Box width="50%" height="full" bg="#ED8245" borderRightRadius="200px">
                            <Box p={6} cursor="pointer">
                                <Icon as={FaFont} size="xl" />
                            </Box>
                        </Box>
                        <Box
                            width="50%"
                            height="100%"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box>
                                <LoginForm />
                            </Box>
                        </Box>
                    </Box>
                }/>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
