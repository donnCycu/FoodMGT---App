import React, { useState } from 'react';
import {
    Heading,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
} from "@chakra-ui/react";

const Warehouse = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const filteredProducts = products.filter((product) => {
        const categoryMatch = selectedCategory === 'Wszystkie' || product.category === selectedCategory;
        const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    return (
        <Box py={8} w="full">
            <Box display="flex" alignItems="start" flexDirection="column" w="full" borderBottom="1px" borderColor="white">
                <Heading mb={4} fontSize={32} color="brand.300" letterSpacing={2.3}>Stan magazynowy</Heading>
                <Box display="flex" alignItems="center" justifyContent="space-between" ml={4} my={4}>
                    <Box>
                        <button onClick={() => handleCategoryClick('Wszystkie')}>Wszystkie produkty</button>
                        <button onClick={() => handleCategoryClick('Niski stan')}>Niski stan</button>
                    </Box>
                    <Input
                        type="text"
                        placeholder="Szukaj produktu"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </Box>
            </Box>
            <Box mt={10} ml={10}>
                <Table variant="simple">
                    <Thead>
                        <Tr fontSize={12}>
                            <Th>Symbol</Th>
                            <Th>Nazwa</Th>
                            <Th>Kategoria</Th>
                            <Th>Jednostka</Th>
                            <Th>Cena</Th>
                            <Th>Ilość</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredProducts.map((product) => (
                            <Tr key={product.symbol}>
                                <Td>{product.symbol}</Td>
                                <Td>{product.name}</Td>
                                <Td>{product.category}</Td>
                                <Td>{product.unit}</Td>
                                <Td>{product.price}</Td>
                                <Td>{product.quantity}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default Warehouse;
