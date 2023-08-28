import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { FaFont } from 'react-icons/fa';
import LoginForm from './components/LoginForm';
import Dashboard from './views/Dashboard';
import EmployeePanel from './views/EmployeePanel';
import OrderPage from './views/OrderPage';
import OrderList from './views/OrderList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
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
                <Route path="/employeepanel" element={<EmployeePanel />} />
                <Route path="/order" element={<OrderPage/>} />
                <Route path="/order-list" element={<OrderList/>} />
            </Routes>
        </Router>
    );
};

export default App;
