import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const CustomFlexText = ({ fontSize = '5rem', width = 'auto', height = 'auto', fontWeight = 600 }) => {
    return (
        <Flex alignItems="center" justifyContent="center" h={height} w={width} fontWeight={fontWeight} fontSize={fontSize} className="redhat">
            <Text textColor="#ED8245">Food</Text>
            <Text textColor="#8A8A8A">MGT.</Text>
        </Flex>
    );
};

export default CustomFlexText;
