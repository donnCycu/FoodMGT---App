import React , { useState } from 'react';
import { Heading, Text, Box, Table,IconButton, Thead, Tbody, Tr, Th, Td, Button, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import {ImBin2} from 'react-icons/im'

const MenuComponent = ({ activeSubMenu }) => {
    const menuOptions = [
        {name:'Wszystkie'},
        {name:'Przystawki'},
        {name:'Dania główne'},
        {name:'Zupy'},
        {name:'Desery'},
        {name:'Napoje'},
        ]
    const initialData  = [
        {
            id:1,
            name: "Potrawa 1",
            description: "Opis 1",
            category: "Dania główne",
            price: "Cena 1",
        },
        {
            id:2,
            name: "Potrawa 2",
            description: "Opis 2",
            category: "Zupy",
            price: "Cena 2",
        },
        {
            id:3,
            name: "Potrawa 3",
            description: "Opis 3",
            category: "Desery",
            price: "Cena 3",
        },
        {
            id:4,
            name: "Potrawa 4",
            description: "Opis 4",
            category: "Napoje",
            price: "Cena 4",
        },

    ];
    const [data, setData] = useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');

    const handleCategoryClick = (category) => {
        console.log("Setting category to:", category);
        setSelectedCategory(category);
    }

    const handleDeleteClick = (id) => {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
    }
    const filteredData = selectedCategory === 'Wszystkie' ? data : data.filter(item => item.category === selectedCategory);
    return (
        <Box py={8} w="full">
            <Box display="flex" alignItems="start" flexDirection="column" w="full" borderBottom="1px" borderColor="white" >
                <Heading mb={20} px={16} fontSize={32} color="brand.300" letterSpacing={2.3}>Menu</Heading>
                <Box display="flex" alignItems="start" justifyContent="center" ml={9}>
                    {menuOptions.map((item, index) => (
                        <Button
                            key={index}
                            mr={4}
                            px={8}
                            fontWeight={400}
                            backgroundColor="transparent"
                            _hover={{ color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }}
                            _focus={{color:"#ED8245", backgroundColor: "transparent", borderBottom:'2px', borderColor:'#ED8245', borderRadius:'none' }}
                            onClick={() => handleCategoryClick(item.name)}>
                            <Text>{item.name}</Text>
                        </Button>
                    ))}
                </Box>

            </Box>
            <Box mt={10} ml={10} key={selectedCategory}>
            <Table variant="simple">
                    <Thead>
                        <Tr fontSize={12}>
                            <Th>Nazwa potrawy</Th>
                            <Th>Opis</Th>
                            <Th>Kategoria</Th>
                            <Th>Cena</Th>
                            <Th>Akcje</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Editable defaultValue={item.name} >
                                        <EditablePreview />
                                        <EditableInput  w={40} px={2}/>
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable defaultValue={item.description}>
                                        <EditablePreview />
                                        <EditableInput  w={40} px={2}/>
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable  defaultValue={item.category}>
                                        <EditablePreview />
                                        <EditableInput w={40} px={2} borderColor="brand.200" />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable  defaultValue={item.price}>
                                        <EditablePreview />
                                        <EditableInput  w={40} px={2}/>
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

export default MenuComponent;
