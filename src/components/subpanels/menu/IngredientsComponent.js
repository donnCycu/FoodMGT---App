import React from 'react';
import {Box, Heading,} from '@chakra-ui/react';

const IngredientsComponent = ({ activeSubMenu }) => {
    return (
        <Box px={16} py={8} >
            <Heading fontSize={32} color="brand.300" letterSpacing={2.3}>Składniki</Heading>
        </Box>
    );
};

export default IngredientsComponent;
