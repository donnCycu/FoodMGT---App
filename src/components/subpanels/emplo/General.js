import React, { useState } from 'react';
import {
    Heading,
    Text,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
} from "@chakra-ui/react";
import { ImBin2 } from 'react-icons/im';
import { IconButton } from "@chakra-ui/react";

const General = () => {
    const [positions, setPositions] = useState([
        'Wszystkie',
        'Kelner',
        'Kucharz',
        'Dostawca',
        'Manager',
        'Sprzątaczka',
    ]);

    const initialData = [
        {
            id: 1,
            firstName: "Jan",
            lastName: "Kowalski",
            position: "Kelner",
            salary: 2500,
            orders: 10,
        },
        {
            id: 2,
            firstName: "Anna",
            lastName: "Nowak",
            position: "Kucharz",
            salary: 3000,
            orders: 15,
        },
        // ...
    ];

    const [data, setData] = useState(initialData);
    const [selectedPosition, setSelectedPosition] = useState('Wszystkie');

    const handlePositionSelect = (position) => {
        setSelectedPosition(position);
        if (position === 'Wszystkie') {
            setData(initialData);
        } else {
            const filteredData = initialData.filter((item) => item.position === position);
            setData(filteredData);
        }
    };

    const handleDeleteClick = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

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
                    Pracownicy
                </Heading>
                <Box display="flex" alignItems="start" justifyContent="center" ml={9}>
                    {positions.map((position, index) => (
                        <Button
                            key={index}
                            mr={4}
                            px={8}
                            fontWeight={400}
                            backgroundColor="transparent"
                            _hover={{
                                color: "#ED8245",
                                backgroundColor: "transparent",
                                borderBottom: '2px',
                                borderColor: '#ED8245',
                                borderRadius: 'none'
                            }}
                            _focus={{
                                color: "#ED8245",
                                backgroundColor: "transparent",
                                borderBottom: '2px',
                                borderColor: '#ED8245',
                                borderRadius: 'none'
                            }}
                            onClick={() => handlePositionSelect(position)}
                        >
                            <Text>{position}</Text>
                        </Button>
                    ))}
                </Box>
            </Box>
            <Box display="flex" mt={10} mx={10} key={selectedPosition}>
                <Table variant="simple">
                    <Thead>
                        <Tr fontSize={12}>
                            <Th>Imię i nazwisko</Th>
                            <Th>Pozycja</Th>
                            <Th>Wynagrodzenie</Th>
                            <Th>Ilość zamówień</Th>
                            <Th>Akcje</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>{`${item.firstName} ${item.lastName}`}</Td>
                                <Td>
                                    <Editable defaultValue={item.position}>
                                        <EditablePreview />
                                        <EditableInput w={40} px={2} />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable defaultValue={item.salary}>
                                        <EditablePreview />
                                        <EditableInput w={40} px={2} borderColor="brand.200" />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable defaultValue={item.orders}>
                                        <EditablePreview />
                                        <EditableInput w={40} px={2} borderColor="brand.200" />
                                    </Editable>
                                </Td>
                                <Td>
                                    <IconButton
                                        aria-label="Usuń"
                                        icon={<ImBin2 />}
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => handleDeleteClick(item.id)}
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

export default General;
