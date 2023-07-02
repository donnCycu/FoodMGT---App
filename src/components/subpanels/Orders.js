import React, { useState } from 'react';
import { parse, isWithinInterval } from 'date-fns';
import {
    Box,
    Text,
    Heading,
    Input,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
   IconButton
} from "@chakra-ui/react";
import {BsReceiptCutoff} from "react-icons/bs";

const Orders = () => {

    const tableData = [
        {
            id:1,
            uuid:'123123',
            date:'29.06.2023',
            waiter:'Krystian Głogowski',
            price:"23,99",
            products: [
                {
                    id:1,
                    name:'Naleśniki z twarogiem',
                },
                {
                    id:2,
                    name:'Placki ziemniaczane'
                }
            ],
        },
        {
            id:2,
            uuid:'43321',
            date:'26.06.2023',
            waiter:'Krystian Głogowski',
            price:"21,99",
            products: [
                {
                    id:1,
                    name:'Naleśniki z twarogiem',
                },
            ],
        },
        {
            id:3,
            uuid:'12312',
            date:'16.06.2023',
            waiter:'Adam Głogowski',
            price:"21,99",
            products: [
                {
                    id:1,
                    name:'Naleśniki z twarogiem',
                },
            ],
        }
    ]
    const handlePrintReceipt = (uuid) => {
        const confirmation = window.confirm(
            "Czy na pewno chcesz ponownie wydrukować paragon?"
        );
        if (confirmation) {
            console.log("Wydrukowano paragon dla ID:", uuid);
        }
    };
    // Stan reprezentujący datę początkową i końcową
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // Filtorwanie imie nazwisko
    const [searchName, setSearchName] = useState('');

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };
    // Funkcja do obsługi zmiany daty początkowej
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // Funkcja do obsługi zmiany daty końcowej
    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    // Funkcja do filtrowania danych
    const filteredData = tableData.filter((item) => {
        const itemDate = parse(item.date, 'dd.MM.yyyy', new Date());
        const start = parse(startDate, 'yyyy-MM-dd\'T\'HH:mm', new Date());
        const end = parse(endDate, 'yyyy-MM-dd\'T\'HH:mm', new Date());

        const nameMatched = item.waiter.toLowerCase().includes(searchName.toLowerCase());
        const dateMatched = (!startDate || !endDate || isWithinInterval(itemDate, { start, end }));

        return nameMatched && dateMatched;
    });
    return (
        <Box py={8} w="full">
            <Box
                display="flex"
                alignItems="start"
                flexDirection="column"
                w="full"
                borderBottom="1px"
                borderColor="white"
            >
                <Heading mb={20} px={16} fontSize={32} color="brand.300" letterSpacing={2.3}>
                    Zamówienia
                </Heading>
                <Box display="flex" alignItems="start" justifyContent="space-between" w="90%" mx={16}>
                    <Box display="flex">
                        <Input variant='flushed' placeholder='Flushed' type="datetime-local"    value={startDate} onChange={handleStartDateChange}/>
                        <Text mx={8}>-</Text>
                        <Input variant='flushed' placeholder='Flushed' type="datetime-local"        value={endDate} onChange={handleEndDateChange}/>
                        <Button ml={4} px={8}
                                fontWeight={400}
                                backgroundColor="transparent"
                                _hover={{ color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }}
                                _focus={{color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }} onClick={() => console.log("Filtrowanie:", startDate, endDate)}>
                            Filtruj
                        </Button>
                    </Box>
                    <Box>
                        <Input
                            variant='flushed'
                            placeholder='Wyszukaj kelnera'
                            value={searchName}
                            onChange={handleSearchChange}
                        />
                    </Box>
                </Box>
            </Box>
            <Box mt={10} ml={10} >
                <Table variant="simple">
                    <Thead>
                        <Tr fontSize={12}>
                            <Th>ID</Th>
                            <Th>Data wystawienia</Th>
                            <Th>Kelner</Th>
                            <Th>Cena</Th>
                            <Th>Pozycje</Th>
                            <Th>Akcje</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>{item.uuid}</Td>
                                <Td>{item.date}</Td>
                                <Td>{item.waiter}</Td>
                                <Td>{item.price} zł</Td>
                                <Td>
                                    {item.products.map((product) => (
                                        <p key={product.id}>{product.name}</p>
                                    ))}
                                </Td>
                                <Td>
                                    <IconButton
                                        icon={<BsReceiptCutoff />}
                                        onClick={() => handlePrintReceipt(item.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default Orders;
