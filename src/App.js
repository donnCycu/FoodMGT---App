import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

import LoginForm from './components/LoginForm';
import Dashboard from './views/Dashboard';
import EmployeePanel from './views/EmployeePanel';
import OrderPage from './views/OrderPage';
import OrderList from './views/OrderList';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import './index.css';
import MainRoutes from "./views/MainRoutes";

const App = () => {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/login" element={
                        <Box display="flex" width="full" height="100vh" backgroundColor="#E6E6E6">
                            <Box width="50%" height="full" bg="rgba(237, 130, 69, 0.37)" borderRightRadius="200px">
                                <Flex alignItems="center" justifyContent="center" h="100%" fontWeight={600} fontSize="5rem" className="redhat">
                                    <Text textColor="#ED8245" >Food</Text>
                                    <Text textColor="#8A8A8A">MGT.</Text>
                                </Flex>
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
                    } />
                    <Route path="/" element={<MainRoutes />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/employeepanel" element={<EmployeePanel />} />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/order-list" element={<OrderList />} />
                </Routes>
            </>
        </Router>
    );
};

export default App;
