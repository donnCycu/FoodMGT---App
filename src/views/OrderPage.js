import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/newOrder/TopBar';
import MealCategory from '../components/newOrder/MealCategory';
import MealList from '../components/newOrder/MealList';
import ActionBar from '../components/newOrder/ActionBar';
import TableLayout from '../components/newOrder/TableLayout';
import { Box, Flex, Button, Text,Table,Th,Tr,Td,Thead,Tbody } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, useDisclosure } from "@chakra-ui/react";

const OrderPage = () => {
    const navigate = useNavigate();
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showTables, setShowTables] = useState(true);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [discountCode, setDiscountCode] = useState("");
    const [orderDiscountCode, setOrderDiscountCode] = useState(null);

    const { isOpen: isSubmitOpen, onClose: onSubmitClose } = useDisclosure();
    const [setOrderSubmitted] = useState(false);

    const handleMealClick = (meal) => {
        const existingMealIndex = selectedItems.findIndex(item => item.name === meal.name);
        if (existingMealIndex > -1) {
            const newSelectedItems = [...selectedItems];
            newSelectedItems[existingMealIndex].quantity += 1;
            newSelectedItems[existingMealIndex].price = (
                parseFloat(meal.price.split(' ')[0]) * newSelectedItems[existingMealIndex].quantity
            ).toFixed(2) + ' zł';
            setSelectedItems(newSelectedItems);
        } else {
            setSelectedItems([...selectedItems, { ...meal, quantity: 1, originalPrice: parseFloat(meal.price.split(' ')[0]) }]);
        }
        setShowTables(false);
    };


    const handleTableChange = () => {
        setShowTables(true);
    };

    const totalPrice = selectedItems.reduce((total, item) => {
        return total + parseFloat(item.price.split(' ')[0]);
    }, 0) * (orderDiscountCode ? 0.9 : 1);
    const handleRowClick = (index) => {
        setSelectedItemIndex(index === selectedItemIndex ? null : index);
    };

    const handleAddClick = () => {
        if (selectedItemIndex !== null) {
            const newItems = [...selectedItems];
            newItems[selectedItemIndex].quantity += 1;
            newItems[selectedItemIndex].price = (
                parseFloat(newItems[selectedItemIndex].originalPrice) * newItems[selectedItemIndex].quantity
            ).toFixed(2) + ' zł';
            setSelectedItems(newItems);
        }
    };

    const handleSubtractClick = () => {
        if (selectedItemIndex !== null) {
            const newItems = [...selectedItems];
            newItems[selectedItemIndex].quantity = Math.max(1, newItems[selectedItemIndex].quantity - 1);
            newItems[selectedItemIndex].price = (
                parseFloat(newItems[selectedItemIndex].originalPrice) * newItems[selectedItemIndex].quantity
            ).toFixed(2) + ' zł';
            setSelectedItems(newItems);
        }
    };
    const handleNoteClick = () => {
        if (selectedItemIndex !== null) {
            const note = prompt("Dodaj notatkę dla tego dania (maksymalnie 30 znaków):");
            if (note && note.length <= 30) {
                const newItems = [...selectedItems];
                newItems[selectedItemIndex].note = note;
                setSelectedItems(newItems);
            } else if (note && note.length > 30) {
                alert("Notatka nie może mieć więcej niż 30 znaków.");
            }
        }
    };
    const handleDiscountClick = () => {
        if (selectedItemIndex !== null) {
            onOpen();
        } else {
            const globalDiscountCode = prompt("Wprowadź kod rabatowy dla całego zamówienia:");
            if (globalDiscountCode) {
                setOrderDiscountCode(globalDiscountCode);
            }
        }
    };


    const applyDiscount = () => {
        // tutaj można dodać logikę weryfikacji kodu
        if (discountCode === "PRAWIDLOWY_KOD") {
            setOrderDiscountCode(discountCode);
        } else {
            alert("Nieprawidłowy kod rabatowy.");
        }
        onClose();
    };

    const handleSubmitOrder = () => {
        if (selectedItems.length === 0) {
            alert("Wybierz dania aby złożyć zamówienie!");
            return;
        }
        const isConfirmed = window.confirm("Czy na pewno chcesz złożyć zamówienie?");
        if (isConfirmed) {
            setOrderDiscountCode(null);
            navigate("/order-list");
        }
    };
    const confirmOrder = () => {
        setOrderSubmitted(true);
        onSubmitClose();
        navigate("/order-list");
    };
    const handleBackToCategories = () => {
        setSelectedMeal(null);
    };
    return (
        <Box bg="#E6E6E6">
            <Flex flexDirection="column" alignItems="center" justifyContent="center" w="100%" h="100vh" py={4}>
                <TopBar waiterName="Jan Kowalski" waiterId="123" orderId="456" />
                <Flex p={6} w="90%" h="100%" bg="white" borderRadius={10}>
                    <Box w="50%" mr={2}>
                        {selectedTable ? (
                            <>
                                {selectedMeal &&
                                    <Button
                                    variant="ghost"
                                    size="xs" onClick={handleBackToCategories}>
                                    Wróć do kategorii
                                </Button>}
                                <div style={{ height: '70%', overflow: 'auto' }}>
                                    {selectedMeal ? <MealList selectedCategory={selectedMeal} onMealClick={handleMealClick} /> : <MealCategory onSelectCategory={setSelectedMeal} />}
                                </div>


                                <div style={{ height: '30%' }}>
                                    <ActionBar
                                        onAdd={handleAddClick}
                                        onSubtract={handleSubtractClick}
                                        onNote={handleNoteClick}
                                        onDiscount={handleDiscountClick}
                                        onSubmit={handleSubmitOrder}
                                    />
                                </div>
                            </>
                        ) : (
                            <p>Wybierz stolik</p>
                        )}
                    </Box>
                    <Box w="50%" ml={2}>
                        {showTables ? (
                            <TableLayout onSelectTable={setSelectedTable} selectedTable={selectedTable} />
                        ) : (
                            <>
                                <Flex alignItems="center">
                                    <Text>Wybrano stolik numer: {selectedTable}</Text>
                                    <Button variant="ghost" onClick={handleTableChange}>Zmień stolik</Button>

                                </Flex>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th>Danie</Th>
                                            <Th>Cena</Th>
                                            <Th>Ilość</Th>
                                            <Th>Notatka</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {selectedItems.map((item, index) => (
                                            <Tr
                                                key={index}
                                                onClick={() => handleRowClick(index)}
                                                bgColor={selectedItemIndex === index ? "gray.200" : "white"}
                                            >
                                                <Td>{item.name}</Td>
                                                <Td>{item.price}</Td>
                                                <Td>{item.quantity}</Td>
                                                <Td>{item.note || '—'}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                                <Text>Total: {totalPrice.toFixed(2)} zł</Text>
                                <Text>Aktywny kod rabatowy: {orderDiscountCode || 'Brak'}</Text>

                            </>
                        )}
                    </Box>
                </Flex>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Dodaj kod rabatowy</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder="Wpisz kod rabatowy" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
                    </ModalBody>

                    <ModalFooter>
                        <Button className="close-button" variant="ghost" onClick={onClose}>Anuluj</Button>
                        <Button className="accept-button"  mr={3} onClick={applyDiscount}>
                            Zastosuj
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isSubmitOpen} onClose={onSubmitClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Czy na pewno chcesz złożyć zamówienie?</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter>
                        <Button className="accept-button" mr={3} onClick={confirmOrder}>
                            Tak
                        </Button>
                        <Button className="cancel-button" onClick={onSubmitClose}>Nie</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    );
};

export default OrderPage;

