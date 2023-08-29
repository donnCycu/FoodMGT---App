import React, { useState } from 'react';
import { Box, Text, Button, Flex, } from '@chakra-ui/react';
import { MdEditCalendar, MdRestaurantMenu, MdPeople, MdStore, MdReport, MdShoppingCart } from 'react-icons/md';
import { FaUserClock } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import { TbReportMoney } from 'react-icons/tb';

import MenuSubpanel from '../components/subpanels/menu/MenuSubpanel'
import IngredientsComponent from '../components/subpanels/menu/IngredientsComponent'
import ProductsComponent from '../components/subpanels/menu/ProductsComponent'
import MenuComponent from '../components/subpanels/menu/MenuComponent'
import Role from '../components/subpanels/emplo/Role'
import General from '../components/subpanels/emplo/General'
import Warehouse from '../components/subpanels/warehouse/Warehouse';
import Orders from '../components/subpanels/Orders';
import WorkTime from '../components/subpanels/WorkTime';

const TopBar = ({ menu, subMenu, handleSubMenuClick }) => {
    return (
        <Flex justify="space-between" align="center" w="full" color="brand.300" borderBottom="1px" borderColor="white" px={8} >
            <Box>
                {subMenu && Object.keys(subMenu).map((item, index) => (
                    <Button mr={4}
                            px={8}
                            fontWeight={400}
                            bg="transparent"
                            _hover={{ color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }}
                            _focus={{color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }}
                            key={index}
                            onClick={() => handleSubMenuClick(item)}>{item} </Button>
                ))}
            </Box>
            <Flex align="center">
                <Text mr={2}>Dzień dobry,</Text>
                <Text fontWeight={500}>John Deep</Text>
            </Flex>
        </Flex>
    );
};

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState('Menu');
    const menuItems = [
        {name: 'Menu', icon: MdRestaurantMenu,component: MenuSubpanel ,
            subMenu: {
                'Menu': MenuComponent,
                'Produkty': ProductsComponent,
                'Składniki': IngredientsComponent
            }},
        {name: 'Pracownicy', icon: MdPeople,
            subMenu: {
                'Ogólne': General,
                'Role': Role
            }},
        {name: 'Stan magazynu', icon: MdStore, subMenu: {
                'Stan magazynowy': Warehouse,
            }},
        {name: 'Raporty', icon: MdReport,  },
        {name: 'Zamówienia', icon: MdShoppingCart,
            subMenu: {
                'Zamówienia': Orders,

            }},
        {name: 'Czas pracy', icon: FaUserClock,
            subMenu: {
                'Czas pracy': WorkTime,

            }},


    ];

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        setActiveSubMenu(null);
    }

    const handleSubMenuClick = (subMenu) => {
        setActiveSubMenu(subMenu);
    }

    return (
        <Box display="flex"
             bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)"
        >
            <Box as="nav"
                 display="flex"
                 alignItems="center"
                 flexDirection="column"
                 py={10}
                 px={4}
                 h="100vh"
                 w="250px"
                 borderRight="1px"
                 borderColor="white"
            >
                <Box display="flex">
                    <Text color="brand.100" fontSize="25px" fontWeight="bold" textTransform="uppercase">Food</Text>
                    <Text color="brand.200" fontSize="25px" fontWeight="bold" textTransform="uppercase">Mgt</Text>
                </Box>
                <Box mt={10} w="100%">
                    {menuItems.map((item, index) => (
                        <Button key={index}
                                display="flex" mb={2}
                                color="brand.300"
                                bg="transparent"
                                _hover={{ color:"#ED8245", backgroundColor: "transparent" }}
                                onClick={() => handleMenuClick(item)}>
                            <item.icon size={20}/>
                            <Text ml={3}>{item.name}</Text>
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box py={10} w="100%" >
                <TopBar menu={activeMenu ? activeMenu.name : null} subMenu={activeMenu ? activeMenu.subMenu : null} handleSubMenuClick={handleSubMenuClick} />
                {activeMenu && activeSubMenu && activeMenu.subMenu[activeSubMenu] && React.createElement(activeMenu.subMenu[activeSubMenu])}
            </Box>

        </Box>

    );
};

export default Dashboard;
