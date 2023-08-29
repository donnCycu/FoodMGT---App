import React, {useState} from 'react';
import { Box, Heading, WrapItem, Avatar, Text, Input,Flex } from "@chakra-ui/react";
const WorkTime = () => {
    const employee = [
        {
            id:1,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-12'
        },
        {
            id:2,
            fullName:'Adam Małysz',
            workTime:'12:11',
            workDate: '2023-08-12'
        },
        {
            id:3,
            fullName:'Christofer Williams',
            workTime:'12:11',
            workDate: '2023-08-06'
        },
        {
            id:4,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-01'
        },
        {
            id:5,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-03'
        },
        {
            id:6,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-21'
        },
        {
            id:7,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-15'
        },
        {
            id:8,
            fullName:'Adam Walker',
            workTime:'12:11',
            workDate: '2023-08-11'
        },
    ];
    const [searchName, setSearchName] = useState('');
    const [searchDate, setSearchDate] = useState('');

    const handleSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleDateChange = (event) => {
        setSearchDate(event.target.value);
    };

    const formatDateToDots = (date) => {
        if (!date) return null;
        const [year, month, day] = date.split('-');
        return `${day}.${month}.${year}`;
    };

    const filteredEmployees = employee.filter(item => {
        const isNameMatching = item.fullName.toLowerCase().includes(searchName.toLowerCase());
        const isDateMatching = searchDate === '' || formatDateToDots(item.workDate) === searchDate;
        return isNameMatching && isDateMatching;
    });

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
                    <Flex>
                        <Input
                            variant='flushed'
                            placeholder='Wyszukaj pracownika'
                            value={searchName}
                            onChange={handleSearchChange}
                            mr={4}
                        />
                        <Input
                            type="date"
                            variant='flushed'
                            placeholder='Wyszukaj datę'
                            value={searchDate}
                            onChange={handleDateChange}
                        />
                    </Flex>
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
                            <Text fontSize={16} color="brand.300">{item.workDate}</Text>
                        </Box>
                    ))}

                </Box>
            </Box>
    </Box>
    );
};


export default WorkTime;