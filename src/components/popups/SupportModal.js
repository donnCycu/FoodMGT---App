import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, Link, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

const SupportModal = ({ isOpen, onClose }) => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Temat:', subject);
        console.log('Opis:', description);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
            <ModalOverlay />
            <ModalContent ml="auto" h="80%">
                <ModalHeader>Support</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text mb={4}>
                        Cześć! Jeżeli masz jakieś pytania lub problemy, jesteśmy tu, żeby pomóc.
                    </Text>
                    <Text mb={4}>
                        Warto również sprawdzić naszą sekcję <Link href="/faq" color="blue.500">FAQ</Link>, gdzie znajdziesz odpowiedzi na najczęściej zadawane pytania.
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb={4}>
                            <FormLabel>Temat</FormLabel>
                            <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Opis problemu</FormLabel>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </FormControl>
                        <Button className="accept-button" type="submit">Wyślij</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button className="close-button" onClick={onClose}>Zamknij</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SupportModal;
