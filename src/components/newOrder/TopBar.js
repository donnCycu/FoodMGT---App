import React from 'react';
import { Flex } from '@chakra-ui/react';

const TopBar = ({ waiterName, waiterId, orderId }) => {
    return (
        <Flex justifyContent="space-between" w="90%" style={{ padding: '1em'}}>
            <div>{`Kelner: ${waiterName} (ID: ${waiterId})`}</div>
            <div>{`ID Zamówienia: ${orderId}`}</div>
        </Flex>
    );
};

export default TopBar;
