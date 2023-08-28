import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@chakra-ui/react';
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

const ActiveOrders = ({ tableStatus, onSelectTable }) => {
    return (
        <Flex direction="column" mt={4} ml={3}>
            <Text fontSize="2xl" mb={4}>Aktywne zamówienia:</Text>
            {Object.entries(tableStatus).map(([table, details]) => (
                <Box key={table} mb={4} pb={4} borderBottom="1px solid black">
                    <Text fontSize="xl">{`Stolik ${table}`} - {`Cena: ${details.price} zł`}</Text>
                    <Flex direction="column" ml={3} my={2}>
                        {details.items.map((item, index) => (
                            <Text key={index}>{`${item} x1 - 6,99 zł`}</Text>
                        ))}
                    </Flex>
                    <Button mt={2} size="sm" className="accept-button" onClick={() => onSelectTable(table)}>
                        Zapłać
                    </Button>
                </Box>
            ))}
        </Flex>
    );
};




const OrderList = () => {
    const [selectedTable, setSelectedTable] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    const [tableStatus] = useState({
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

    const navigate = useNavigate();

    const handlePayment = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            closeModal();
        }, 2000);

    };


    return (
        <Box px={4} py={6} h="100vh" bgGradient="linear(to-br, #ED8245 -190%, #ffffff 100%)">
            <Button
                w={44}
                variant="ghost"
                onClick={() => navigate("/employeepanel")}
            >
                Wróć do dashboardu
            </Button>
            <Flex flexDirection={['column', 'row']} h="100%">
                <Box flex="1">
                    <ActiveOrders tableStatus={tableStatus} onSelectTable={onSelectTable} />
                </Box>
                <Box flex="1">
                    <TableLayout onSelectTable={onSelectTable} selectedTable={selectedTable} tableStatus={tableStatus} />
                </Box>
            </Flex>
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
                        <Flex mt={4} fontSize="sm">
                            <Text mr={2} fontWeight={500}>Cena: </Text>
                            <Text >{tableStatus[selectedTable]?.price} zł</Text>
                        </Flex>
                        <Flex fontSize="sm">
                            <Text mr={2} fontWeight={500}>Rabat: </Text>
                            <Text >{tableStatus[selectedTable]?.discount} zł</Text>
                        </Flex>
                        <Flex >
                            <Text mr={2} fontWeight={500}>Razem: </Text>
                            <Text > {finalPrice} zł</Text>
                        </Flex>
                        <Flex justifyContent="space-between" mt={4}>
                            {['Karta', 'Gotówka', 'Faktura', 'Bon'].map((method) => (
                                <Button
                                    key={method}
                                    onClick={() => setSelectedPaymentMethod(method)}
                                    bg={selectedPaymentMethod === method ? "#ED8245" : "initial"}
                                >
                                    {method}
                                </Button>
                            ))}
                        </Flex>
                        <Flex alignItems="end" justifyContent="end">
                            <Button className="accept-button" mt={5} onClick={handlePayment} isDisabled={!selectedPaymentMethod}>
                                Zapłać
                            </Button>
                        </Flex>

                        <Flex flexDirection="column" justifyContent="center" alignItems="center">
                            {isLoading && (
                                <>
                                    <Text>Trwa drukowanie paragonu</Text>
                                    <CircularProgress isIndeterminate color="brand.100" />
                                </>
                            )}
                        </Flex>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default OrderList;
