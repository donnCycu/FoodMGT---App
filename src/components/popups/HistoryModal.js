import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Table, Thead, Tbody, Tr, Th, Td, ModalBody, Input, Box } from "@chakra-ui/react";

const HistoryModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const orders = [
        { id: 1, waiter: 'John', tableNumber: 5, paymentType: 'Gotówka', price: '50 zł' },
        { id: 2, waiter: 'John', tableNumber: 3, paymentType: 'Karta', price: '70 zł' },
        { id: 3, waiter: 'John', tableNumber: 8, paymentType: 'Bon', price: '40 zł' },
        { id: 4, waiter: 'John', tableNumber: 2, paymentType: 'Bon', price: '49 zł' },
        { id: 5, waiter: 'John', tableNumber: 1, paymentType: 'Bon', price: '30 zł' },
        { id: 6, waiter: 'John', tableNumber: 7, paymentType: 'Bon', price: '20 zł' },
        { id: 7, waiter: 'John', tableNumber: 6, paymentType: 'Bon', price: '10 zł' },
        { id: 8, waiter: 'John', tableNumber: 9, paymentType: 'Bon', price: '411 zł' },
        { id: 9, waiter: 'John', tableNumber: 15, paymentType: 'Bon', price: '65 zł' },
        { id: 10, waiter: 'John', tableNumber: 11, paymentType: 'Bon', price: '47 zł' },
        { id: 11, waiter: 'John', tableNumber: 12, paymentType: 'Bon', price: '97 zł' },
        { id: 12, waiter: 'John', tableNumber: 19, paymentType: 'Bon', price: '320 zł' },
        { id: 13, waiter: 'John', tableNumber: 22, paymentType: 'Bon', price: '111 zł' },
        { id: 14, waiter: 'John', tableNumber: 31, paymentType: 'Bon', price: '150 zł' },
        { id: 15, waiter: 'John', tableNumber: 16, paymentType: 'Bon', price: '140 zł' },
    ];

    const filteredOrders = orders.filter(order => {
        return (
            order.id.toString().includes(searchTerm) ||
            order.waiter.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.tableNumber.toString().includes(searchTerm) ||
            order.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.price.includes(searchTerm)
        );
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="3xl" maxHeight="600px">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Historia zamówień</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box mb={4}>
                        <Input
                            placeholder="Wyszukaj zamówienia..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Box>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID Zamówienia</Th>
                                <Th>Kelner</Th>
                                <Th>Numer stolika</Th>
                                <Th>Typ płatności</Th>
                                <Th>Cena</Th>
                            </Tr>
                        </Thead>
                        <Tbody style={{ maxHeight: '600px', overflowY: 'auto' }}>
                            {filteredOrders.map((order) => (
                                <Tr key={order.id}>
                                    <Td>{order.id}</Td>
                                    <Td>{order.waiter}</Td>
                                    <Td>{order.tableNumber}</Td>
                                    <Td>{order.paymentType}</Td>
                                    <Td>{order.price}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default HistoryModal;
