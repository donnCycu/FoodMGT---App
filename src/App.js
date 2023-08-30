import React from 'react';
import {  Box } from '@chakra-ui/react';

import LoginForm from './components/LoginForm';
import Dashboard from './views/Dashboard';
import EmployeePanel from './views/EmployeePanel';
import OrderPage from './views/OrderPage';
import OrderList from './views/OrderList';
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import './index.css';
import MainRoutes from "./views/MainRoutes";
import RemindPassword from "./views/RemindPassword";
import LoginEmployee from "./views/LoginEmployee";
import EmployeeSettings from "./views/EmployeeSettings";
import AppNameLogo from "./components/AppNameLogo";
const App = () => {
    return (
        <Router>
            <>
                <Routes>
                    <Route path="/login" element={
                        <Box display="flex" width="full" height="100vh" backgroundColor="#E6E6E6">
                            <Box width="50%" height="full" bg="rgba(237, 130, 69, 0.37)" borderRightRadius="200px">
                                <AppNameLogo fontSize="5rem" width="100%" height="100%" fontWeight={600} />

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
                    <Route path="/remindpassword" element={<RemindPassword />} />
                    <Route path="/settings" element={<EmployeeSettings />} />
                    <Route path="/loginemployee" element={<LoginEmployee />} />
                </Routes>
            </>
        </Router>
    );
};

export default App;
