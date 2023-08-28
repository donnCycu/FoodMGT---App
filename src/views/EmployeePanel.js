import React from 'react'
import {Avatar, Box, WrapItem, Button, Flex, Text, IconButton,useBreakpointValue } from "@chakra-ui/react";
import {MdOutlineHistoryEdu,} from 'react-icons/md'
import {RiLogoutCircleLine} from 'react-icons/ri'
import {CiSettings} from 'react-icons/ci'
import { MdHistory } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';
import { RiOrderPlayFill, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react";
import SupportModal from '../components/popups/SupportModal'
import RevenueModal from "../components/popups/RevenueModal";

const EmployeePanel = () => {
    const { isOpen: isUtargOpen, onOpen: onUtargOpen, onClose: onUtargClose } = useDisclosure();
    const { isOpen: isSupportOpen, onOpen: onSupportOpen, onClose: onSupportClose } = useDisclosure();

    const menuItems = [
        { id: 'history', label: 'Historia zamówień', icon: <MdHistory size={25} />, route: '/history', onClick: null },
        { id: 'revenue', label: 'Utarg', icon: <RiMoneyDollarCircleLine size={25} />, route: null, onClick: onUtargOpen },
        { id: 'settings', label: 'Ustawienia', icon: <AiFillSetting size={25} />, route: '/settings', onClick: null },
        { id: 'support', label: 'Support', icon: <BiSupport size={25} />, route: null, onClick: onSupportOpen },
        { id: 'order-list', label: 'Obecne zamówienia', icon: <BiSupport size={25} />, route: '/order-list', onClick: null },
        { id: 'order', label: 'Złóż zamówienie', icon: <RiOrderPlayFill size={25} />, route: '/order', onClick: null },
    ];
    const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const boxWidth = useBreakpointValue({ base: '100%', sm: '60%', md: '40%', lg: '30%' });
    const buttonWidth = useBreakpointValue({ base: '100px', md: '150px' });
    const buttonHeight = useBreakpointValue({ base: '100px', md: '150px' });
    const buttonMarginBottom = useBreakpointValue({ base: '4', sm: '6', md: '8', lg: '10' });

    return(
        <Box display="flex" alignItems="center" justifyContent="center" w="100vw" h="100vh" bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)">
            <Box display="flex" alignItems="start" flexDirection="column" px={4} py={6} w="30%" h="80%">
                <Box display="flex" alignItems="center" flexDirection="column" justifyContent="center" w="100%">
                    <Box  display="flex" alignItems="center" justifyContent="center">
                        <Button mt={6} px={4} py={6} size='sm' borderRadius="100%" backgroundColor="brand.100" color="white" _hover={{transform:' scale(1.2)'}}>
                            <CiSettings fontSize="20px"/>
                        </Button>
                        <WrapItem mx={4}>
                            <Avatar size="xl" src='https://bit.ly/dan-abramov' />
                        </WrapItem>
                        <Link to="/login">
                            <Button as="a" mt={6} px={4} py={6} size='sm' borderRadius="100%" backgroundColor="brand.100" color="white" _hover={{ transform: 'scale(1.2)' }}>
                                <RiLogoutCircleLine fontSize="20px" />
                            </Button>
                        </Link>
                    </Box>
                    <Text mt={4} fontWeight={500}>Witaj, John Deep</Text>
                    <Text fontSize="sm" color="brand.200">Kelner</Text>
                </Box>
                <Flex flexDirection={flexDirection} alignItems="start" justifyContent="space-between" flexWrap="wrap" mt={20} w="100%">
                    {menuItems.map((item) => {
                        if (item.onClick) {
                            return (
                                <Button
                                    key={item.id}
                                    onClick={item.onClick}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    mb={buttonMarginBottom}
                                    w={buttonWidth}
                                    h={buttonHeight}
                                    color="brand.300"
                                    backgroundColor="transparent"
                                    border="1px"
                                    borderColor="brand.100"
                                    borderRadius={100}
                                    boxShadow="xl"
                                    _hover={{ backgroundColor: "#ED8245", color: 'white' }}
                                >
                                    {item.icon}
                                    <Text mt={2} fontWeight={item.id === 'order' ? 'bold' : '400'} fontSize="14px">
                                        {item.label}
                                    </Text>
                                </Button>
                            );
                        } else {
                            return (
                                <Link to={item.route} key={item.id}>
                                    <Button
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        flexDirection="column"
                                        mb={buttonMarginBottom}
                                        w={buttonWidth}
                                        h={buttonHeight}
                                        color="brand.300"
                                        backgroundColor="transparent"
                                        border="1px"
                                        borderColor="brand.100"
                                        borderRadius={100}
                                        boxShadow="xl"
                                        _hover={{ backgroundColor: "#ED8245", color: 'white' }}
                                    >
                                        {item.icon}
                                        <Text mt={2} fontWeight={item.id === 'order' ? 'bold' : '400'} fontSize="14px">
                                            {item.label}
                                        </Text>
                                    </Button>
                                </Link>
                            );
                        }
                    })}
                </Flex>
            </Box>
            <RevenueModal isOpen={isUtargOpen} onClose={onUtargClose} />
            <SupportModal isOpen={isSupportOpen} onClose={onSupportClose} />
        </Box>
    )
}
export default EmployeePanel