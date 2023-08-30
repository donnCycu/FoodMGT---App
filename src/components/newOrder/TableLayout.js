import React, { useState } from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';

const TableLayout = ({ onSelectTable, selectedTable }) => {
    const [currentFloor, setCurrentFloor] = useState('Parter');
    const floors = ['Parter', 'Patio', 'Piętro I', 'Piętro II'];

    const floorTables = {
        'Parter': [1, 2, 3, 4, 5],
        'Patio': [6, 7, 8],
        'Piętro I': [9, 10, 11, 12],
        'Piętro II': [13, 14, 15]
    };

    const tables = floorTables[currentFloor] || [];

    return (
        <Flex direction="column" alignItems="start" justifyContent="start">
            <Flex mb={4}>
                {floors.map((floor) => (
                    <Button
                        ml={2}
                        onClick={() => setCurrentFloor(floor)}
                        isActive={currentFloor === floor}
                    >
                        {floor}
                    </Button>
                ))}
            </Flex>

            <Flex alignItems="start" justifyContent="start" flexWrap="wrap">
                {tables.map((table) => (
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        bg={selectedTable === table ? "#ED8245" : "#D9D9D9"}
                        borderRadius="lg"
                        mb={4}
                        mr={4}
                        w="9rem"
                        h={20}
                        p={4}
                        key={table}
                        color={selectedTable === table ? "white" : "black"}
                        onClick={() => onSelectTable(table)}
                        cursor="pointer"
                    >
                        <Text fontSize="xl">{table}</Text>
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

export default TableLayout;
