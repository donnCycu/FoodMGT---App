import React, { useState } from 'react';
import {
    Heading,
    Text,
    Box,
    Table,
    IconButton,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
    Input,
    FormControl,
    Select,
} from "@chakra-ui/react";
import { ImBin2 } from 'react-icons/im';

const ProductComponent = () => {
    const [categories, setCategories] = useState([
        'Wszystkie',
        'Nabiał',
        'Owoce',
        'Warzywa',
        'Przyprawy',
        'Mięso',
    ]);

    const initialData = [
        {
            id: 1,
            name: "Produkt 1",
            category: "Warzywa",
        },
        {
            id: 2,
            name: "Produkt 2",
            category: "Owoce",
        },
        {
            id: 3,
            name: "Produkt 3",
            category: "Nabiał",
        },
        {
            id: 4,
            name: "Produkt 4",
            category: "Mięso",
        },
    ];

    const [data, setData] = useState(initialData);
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
    const [addCategoryPopupOpen, setAddCategoryPopupOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleDeleteClick = (id) => {
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
    };

    const handleAddCategoryClick = () => {
        setAddCategoryPopupOpen(true);
    };

    const handleAddCategoryPopupClose = () => {
        setAddCategoryPopupOpen(false);
        setNewCategoryName('');
    };

    const handleAddCategorySubmit = () => {
        const newCategory = newCategoryName.trim();
        if (newCategory) {
            setCategories([...categories, newCategory]);
            handleAddCategoryPopupClose();
        }
    };

    const handleAddProductClick = () => {
        const newProduct = {
            id: data.length + 1,
            name: productName.trim(),
            category: productCategory,
        };
        if (newProduct.name && newProduct.category) {
            setData([...data, newProduct]);
            setProductName('');
            setProductCategory('');
        }
    };

    const filteredData =
        selectedCategory === 'Wszystkie'
            ? data
            : data.filter((item) => item.category === selectedCategory);

    return (
        <Box py={8} w="full">
            <Box display="flex" alignItems="start" flexDirection="column" w="full" borderBottom="1px" borderColor="white">
                <Heading mb={20} px={16} fontSize={32} color="brand.300" letterSpacing={2.3}>
                    Produkty
                </Heading>
                <Box display="flex" alignItems="start" justifyContent="center" ml={9} >
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            mr={4}
                            px={8}
                            fontWeight={400}
                            color="brand.300"
                            backgroundColor="transparent"
                            _hover={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                            _focus={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                            onClick={() => handleCategoryClick(category)}
                        >
                            <Text>{category}</Text>
                        </Button>
                    ))}
                    <Button
                        ml={4}
                        px={8}
                        fontWeight={500}
                        color="brand.300"
                        background="transparent"
                        fontSize="0.8rem"
                        _hover={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                        _focus={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                        onClick={handleAddCategoryClick}
                    >
                        <Text>Dodaj kategorię</Text>
                    </Button>
                </Box>
            </Box>
            <Box display="flex" mt={10} mx={10} key={selectedCategory}>
                <Table variant="simple">
                    <Thead>
                        <Tr fontSize={12}>
                            <Th>Nazwa produktu</Th>
                            <Th>Kategoria</Th>
                            <Th>Akcje</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((item, index) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Editable defaultValue={item.name}>
                                        <EditablePreview />
                                        <EditableInput w={40} px={2} />
                                    </Editable>
                                </Td>
                                <Td>
                                    <Editable defaultValue={item.category}>
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
                    <FormControl display="flex" alignItems="start" justifyContent="space-between" flexDirection="column" py={4} px={2} w="40%" h={200} border="1px" borderRadius="5px" borderColor="brand.100">
                        <Box w="full">
                            <Input
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Nazwa produktu"
                                mb={4}
                                color="brand.300"
                                borderColor='#ED8245'
                                _hover={{ borderColor: '#ED8245', }}
                                _focus={{ borderColor: '#ED8245', }}
                            />
                            <Select
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                                placeholder="Kategoria"
                                mb={4}
                                color="brand.300"
                                borderColor='#ED8245'
                                _hover={{ borderColor: '#ED8245', }}
                                _focus={{ borderColor: '#ED8245', }}
                            >
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Select>
                        </Box>
                        <Box display="flex" alignItems="end" justifyContent="end" w="full">
                            <Button className="accept-button" onClick={handleAddProductClick}>
                                Dodaj produkt
                            </Button>
                        </Box>
                    </FormControl>

                {addCategoryPopupOpen && (
                    <FormControl
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        position="absolute"
                        top="0"
                        bottom="0"
                        left="0"
                        right="0"
                        zIndex="999"
                        bg="rgba(0, 0, 0, 0.6)"
                    >
                        <Box
                            display="flex"
                            alignItems="start"
                            justifyContent="start"
                            py={4}
                            px={4}
                            bg="white"
                            borderRadius="md"
                            boxShadow="lg"
                        >
                            <Box>
                                <Text mb={4} color="brand.300" textAlign="start">Dodaj nową kategorię:</Text>
                                <Input
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="Nazwa kategorii"
                                    mb={4}
                                    color="brand.300"
                                    borderColor='#ED8245'
                                    _hover={{ borderColor: '#ED8245', }}
                                    _focus={{ borderColor: '#ED8245', }}
                                />
                                <Box display="flex" alignItems="end" justifyContent="end">
                                    <Button color="brand.300" background="transparent" fontSize=".8rem"
                                            _hover={{fontSize:'bold', color:'red', backgroundColor:'transparent', }}
                                            onClick={handleAddCategoryPopupClose}>
                                        Anuluj
                                    </Button>
                                    <Button color="brand.300" background="transparent" fontSize=".8rem"
                                            _hover={{fontSize:'bold', color:'#ED8245', backgroundColor:'transparent', }}
                                            onClick={handleAddCategorySubmit}>
                                        Dodaj
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </FormControl>
                )}
            </Box>
        </Box>
    );
};

export default ProductComponent;
