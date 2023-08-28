import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Box, Flex, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const TableLayout = ({ onSelectTable, selectedTable, tableStatus }) => {
    const floors = ['Parter', 'Patio', 'Piętro I', 'Piętro II'];
    const [currentFloor, setCurrentFloor] = useState('Parter');
    const floorTables = {
        'Parter': [1, 2, 3, 4, 5],
        'Patio': [6, 7, 8],
        'Piętro I': [9, 10, 11, 12],
        'Piętro II': [13, 14, 15]
    };

    const tables = floorTables[currentFloor] || [];
    const navigate = useNavigate();

    return (
        <Flex direction="column" alignItems="start" justifyContent="start">
            <Button
                w={44}
                variant="ghost"
                onClick={() => navigate("/employeepanel")}
            >
                Wróć do dashboardu
            </Button>

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
                        flexDirection="column"
                        bg={tableStatus[table] ? "#ED8245" : selectedTable === table ? "#ED8245" : "#D9D9D9"}
                        borderRadius="lg"
                        mb={4}
                        mr={4}
                        w="9rem"
                        h={20}
                        p={4}
                        key={table}
                        color="white"
                        onClick={() => onSelectTable(table)}
                        cursor="pointer"
                    >
                        <Text fontSize="xl">{table}</Text>
                        {tableStatus[table] && <Text fontSize="sm">{`$${tableStatus[table].price}`}</Text>}
                    </Flex>
                ))}
            </Flex>
        </Flex>
    );
};

const OrderList = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [tableStatus, ] = useState({
        1: { price: 20, items: ['Pizza', 'Coke'], discount: 5 },
        3: { price: 50, items: ['Pasta', 'Wine'], discount: 0 }
    });

    const onSelectTable = (table) => {
        setSelectedTable(table);
        if (tableStatus[table]) {
            setIsOpen(true);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const finalPrice = tableStatus[selectedTable]?.price - tableStatus[selectedTable]?.discount;

    return (
        <Box px={4} py={6} h="100vh" bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)">

            <TableLayout onSelectTable={onSelectTable} selectedTable={selectedTable} tableStatus={tableStatus} />
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Szczegóły zamówienia stolika numer {selectedTable}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Nazwa potrawy</Th>
                                    <Th>Ilość</Th>
                                    <Th>Cena</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tableStatus[selectedTable]?.items.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{item}</Td>
                                        <Td>1</Td>
                                        <Td>10 zł</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        <Text mt={4}>Cena: {tableStatus[selectedTable]?.price} zł</Text>
                        <Text>Rabat: {tableStatus[selectedTable]?.discount} zł</Text>
                        <Text>Razem: {finalPrice} zł</Text>
                        <Flex alignItems="end" justifyContent="end">
                            <Button className="accept-button" mt={5}>
                                Zapłać
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OrderList;
