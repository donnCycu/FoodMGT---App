import { RiMoneyDollarCircleLine, RiBankCardLine, RiMoneyDollarBoxLine, RiShoppingCartLine } from 'react-icons/ri';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Flex, Text, Box } from "@chakra-ui/react";

const RevenueModal = ({ isOpen, onClose }) => {
    const totalRevenue = 1000;
    const cardPayments = 600;
    const cashPayments = 400;
    const orderCount = 50;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Utarg</ModalHeader>
                <ModalCloseButton />
                <ModalBody color="brand.300">
                    <Flex flexDirection="column" alignItems="center">
                        <Box mb={10}>
                            <RiMoneyDollarCircleLine size={48} color="#ED8245"/>
                            <Text fontSize="2xl" fontWeight="bold">Utarg ogólny: ${totalRevenue}</Text>
                        </Box>
                        <Flex flexDirection="row" justifyContent="space-between" width="100%">
                            <Box textAlign="center">
                                <RiBankCardLine size={24} color="#ED8245"/>
                                <Text mt={2}>Płatności kartą: ${cardPayments}</Text>
                            </Box>
                            <Box textAlign="center">
                                <RiMoneyDollarBoxLine size={24} color="#ED8245"/>
                                <Text mt={2}>Płatności gotówką: ${cashPayments}</Text>
                            </Box>
                            <Box textAlign="center">
                                <RiShoppingCartLine size={24} color="#ED8245"/>
                                <Text mt={2}>Liczba zamówień: {orderCount}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button className="close-button" onClick={onClose}>Zamknij</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RevenueModal;
