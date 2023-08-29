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
    Button,
    Flex,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast
} from "@chakra-ui/react";

const Warehouse = () => {
    const toast = useToast();

    const [addProductPopupOpen, setAddProductPopupOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({ ...prevState, [name]: value }));
    };
    const [exampleProducts, setExampleProducts] = useState([
        { symbol: 'P001', name: 'Produkt 1', category: 'Kategoria 1', unit: 'szt', price: 100, quantity: 10 },
        { symbol: 'P002', name: 'Produkt 2', category: 'Kategoria 1', unit: 'kg', price: 200, quantity: 5 },
        { symbol: 'P003', name: 'Produkt 3', category: 'Kategoria 2', unit: 'l', price: 50, quantity: 20 },
    ]);
    const [newProduct, setNewProduct] = useState({
        symbol: '',
        name: '',
        category: '',
        unit: '',
        price: null,
        quantity: null
    });
    const handleProductPopup = () => {
        setAddProductPopupOpen(true);
    };

    const handleClosePopup = () => {
        setAddProductPopupOpen(false);
    };
    const handleAddProduct = () => {
        if (
            !newProduct.symbol ||
            !newProduct.name ||
            !newProduct.category ||
            !newProduct.unit ||
            newProduct.price === null ||
            newProduct.quantity === null
        ) {
            toast({
                title: "Błąd.",
                description: "Uzupełnij pola, aby dodać produkt!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        setExampleProducts([...exampleProducts, newProduct]);

        setNewProduct({
            symbol: '',
            name: '',
            category: '',
            unit: '',
            price: null,
            quantity: null
        });

        handleClosePopup();

        toast({
            title: "Operacja udana.",
            description: "Pomyślnie dodano produkt!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box py={8} w="full">
            <Box display="flex" alignItems="start" flexDirection="column" w="full" borderBottom="1px" borderColor="white">
                <Heading mb={20} px={16} fontSize={32} color="brand.300" letterSpacing={2.3}>Stan magazynowy</Heading>
                <Flex alignItems="start" justifyContent="center" ml={9}>
                    <Button
                        px={8}
                        fontWeight={500}
                        color="brand.300"
                        background="transparent"
                        fontSize="0.8rem"
                        _hover={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                        _focus={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                        onClick={handleProductPopup}>
                        <Text>
                            Dodaj produkt
                        </Text>
                    </Button>
                </Flex>
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
                        {exampleProducts.map((product) => (
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

                <Modal isOpen={addProductPopupOpen} onClose={handleClosePopup}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Dodaj nowy produkt</ModalHeader>
                        <ModalCloseButton />
                        <Box p={4}>
                            <FormControl>
                                <FormLabel>ID Produktu</FormLabel>
                                <Input name="symbol" value={newProduct.symbol} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Nazwa produktu</FormLabel>
                                <Input name="name" value={newProduct.name} onChange={handleInputChange} />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Kategoria</FormLabel>
                                <Select name="category" value={newProduct.category} onChange={handleInputChange}>
                                    <option value="Kategoria 1">Kategoria 1</option>
                                    <option value="Kategoria 2">Kategoria 2</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Jednostka</FormLabel>
                                <Select name="unit" value={newProduct.unit} onChange={handleInputChange}>
                                    <option value="szt">Sztuki</option>
                                    <option value="kg">KG</option>
                                    <option value="litry">Litry</option>
                                    <option value="gramy">Gramy</option>
                                </Select>
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Cena</FormLabel>
                                <Input name="price" value={newProduct.price} onChange={handleInputChange}/>

                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel>Cena</FormLabel>
                                <Input name="quantity" value={newProduct.quantity} onChange={handleInputChange}/>

                            </FormControl>
                        </Box>
                        <ModalFooter>
                            <Button variant="ghost" onClick={handleClosePopup}>Anuluj</Button>
                            <Button variant="ghost" onClick={handleAddProduct}>Dodaj</Button>
                        </ModalFooter>

                    </ModalContent>
                </Modal>
            </Box>
        </Box>
    );
};

export default Warehouse;
