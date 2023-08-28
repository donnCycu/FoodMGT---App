import React from 'react';
import {  Box, } from '@chakra-ui/react';

const MenuSubpanel = ({ activeSubMenu }) => {
    return (
        <Box px={14} py={8} >
            {activeSubMenu === 'Menu' && <h1>Menu Subpanel</h1>}
            {activeSubMenu === 'Produkty' && <h1>Produkty Subpanel</h1>}
            {activeSubMenu === 'Składniki' && <h1>Składniki Subpanel</h1>}
        </Box>

    );
};

export default MenuSubpanel;
