import React, {useState} from 'react';
import {Box, Heading, WrapItem, Avatar, Text, Input, Button,} from "@chakra-ui/react";
const WorkTime = () => {
    const employee = [
        {
            id:1,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
        {
            id:2,
            fullName:'Adam Małysz',
            workTime:'12:11'
        },
        {
            id:3,
            fullName:'Christofer Williams',
            workTime:'12:11'
        },
        {
            id:4,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
        {
            id:5,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
        {
            id:6,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
        {
            id:7,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
        {
            id:8,
            fullName:'Adam Walker',
            workTime:'12:11'
        },
    ];
    const [searchName, setSearchName] = useState('');
    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };
    const filteredEmployees = employee.filter(item =>
        item.fullName.toLowerCase().includes(searchName.toLowerCase())
    );
    return (
        <Box py={8} w="full" color="brand.300">
            <Box
                display="flex"
                alignItems="start"
                flexDirection="column"
                w="full"
                borderBottom="1px"
                borderColor="white"
            >
                <Heading mb={20} px={16} fontSize={32} color="brand.300" letterSpacing={2.3}>
                    Czas pracy
                </Heading>
                <Box display="flex" alignItems="end" justifyContent="end" w="90%" mx={16}>
                    <Box>
                        <Input
                            variant='flushed'
                            placeholder='Wyszukaj pracownika'
                            value={searchName}
                            onChange={handleSearchChange}
                        />
                    </Box>
                </Box>
            </Box>
            <Box  mt={10} px={16}>
                <Box display="flex" alignItems="center"  flexWrap="wrap" maxHeight="600px" overflowY="auto">
                    {filteredEmployees.map((item, index) => (
                        <Box key={item.id} display="flex" alignItems="center" flexDirection="column" mr={6} mb={6} w="220px" h="150px" px={10} py={4} border="1px" borderColor="brand.100" borderRadius={8} boxShadow="xl">
                            <WrapItem>
                                <Avatar name={item.fullName} src='https://bit.ly/dan-abramov' />
                            </WrapItem>
                            <Text>{item.fullName}</Text>
                            <Text fontSize={22} color="brand.300" letterSpacing={2.3} fontWeight="500">{item.workTime}</Text>
                        </Box>
                    ))}

                </Box>
            </Box>
    </Box>
    );
};


export default WorkTime;