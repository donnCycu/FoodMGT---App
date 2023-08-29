import React, { useState } from 'react';
import { useToast } from "@chakra-ui/react";

import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { ImBin2, ImPencil } from 'react-icons/im';

const Role = () => {
    const [roles, setRoles] = useState([
        { id: 1, name: 'Admin', permissions: ['create', 'read', 'update', 'delete'] },
        { id: 2, name: 'User', permissions: ['read'] },
    ]);

    const [selectedRole, setSelectedRole] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newRoleName, setNewRoleName] = useState('');
    const [newPermissions, setNewPermissions] = useState([]);
    const [showAddRoleModal, setShowAddRoleModal] = useState(false);
    const toast = useToast();

    const checkForChanges = (oldRole, newRole) => {
        return oldRole.name !== newRole.name || oldRole.permissions !== newRole.permissions;
    };

    const handleEditClick = (role) => {
        setSelectedRole(role);
        setIsEditing(true);
        setNewRoleName(role.name);
        setNewPermissions(role.permissions);
    };

    const handleDeleteClick = (id) => {
        const roleExists = roles.some((role) => role.id === id);
        if (roleExists) {
            const updatedRoles = roles.filter((role) => role.id !== id);
            setRoles(updatedRoles);
            toast({
                title: 'Operacja udana.',
                description: 'Rola została usunięta',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error.',
                description: 'Nie udało się usunąć roli.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleSaveEdit = () => {
        if (newRoleName === "") {
            toast({
                title: "Error.",
                description: "Pola nie mogą byc puste!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const isChanged = checkForChanges(selectedRole, { name: newRoleName, permissions: newPermissions });

        if (isChanged) {
            const updatedRoles = roles.map((role) => {
                if (role.id === selectedRole.id) {
                    return { ...role, name: newRoleName, permissions: newPermissions };
                }
                return role;
            });
            setRoles(updatedRoles);
            toast({
                title: 'Operacja udana.',
                description: 'Zaktualizowano rolę',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Brak zmian',
                description: 'Nie wprowadzono żadnych zmian w roli',
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
        }
        cancelEdit();
    };

    const handleAddRole = () => {
        if (newRoleName === "" || newPermissions.length === 0) {
            toast({
                title: "Error.",
                description: "Uzupełnij pola aby dodać nową rolę!",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }else{
            toast({
                title: 'Operacja udana.',
                description: 'Utworzono nową rolę',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
        const newRole = {
            id: roles.length + 1,
            name: newRoleName,
            permissions: newPermissions,
        };
        setRoles([...roles, newRole]);
        setShowAddRoleModal(false);
        cancelEdit();
    };

    const cancelEdit = () => {
        setSelectedRole(null);
        setIsEditing(false);
        setNewRoleName('');
        setNewPermissions([]);
    };

    const togglePermission = (permission) => {
        if (newPermissions.includes(permission)) {
            setNewPermissions(newPermissions.filter((p) => p !== permission));
        } else {
            setNewPermissions([...newPermissions, permission]);
        }
    };
    const closeModal = () => {
        setIsEditing(false);
        setShowAddRoleModal(false);
        cancelEdit();
    };

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
                    Role
                </Heading>
                <Box display="flex" flexDirection="column" w="full" mx={10}>
                    <Button w="8%"
                           mb={4}
                            px={8}
                            fontWeight={500}
                            color="brand.300"
                            background="transparent"
                            fontSize="0.8rem"
                            _hover={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                            _focus={{ color: "#ED8245", backgroundColor: "transparent", borderBottom: '2px', borderColor: '#ED8245', borderRadius: 'none' }}
                            onClick={() => setShowAddRoleModal(true)}>Dodaj rolę</Button>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Nazwa roli</Th>
                                <Th>Akcje</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {roles.map((role) => (
                                <Tr key={role.id}>
                                    <Td>{role.name}</Td>
                                    <Td>
                                        <IconButton
                                            aria-label="Edytuj"
                                            icon={<ImPencil />}
                                            colorScheme="blue"
                                            variant="ghost"
                                            onClick={() => handleEditClick(role)}
                                        />
                                        <IconButton
                                            aria-label="Usuń"
                                            icon={<ImBin2 />}
                                            colorScheme="red"
                                            variant="ghost"
                                            onClick={() => handleDeleteClick(role.id)}
                                        />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
            <Modal isOpen={isEditing || showAddRoleModal} onClose={closeModal}>
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedRole ? 'Edytuj rolę' : 'Dodaj nową rolę'}</ModalHeader>
                    <ModalCloseButton onClick={closeModal}/>
                    <ModalBody>
                        <FormControl mb={4}>
                            <FormLabel>Nazwa roli</FormLabel>
                            <Input
                                borderColor="brand.100"
                                type="text"
                                value={newRoleName}
                                onChange={(e) => setNewRoleName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Uprawnienia</FormLabel>
                            <Checkbox
                                borderColor="brand.100" mr={4} size="sm"
                                isChecked={newPermissions.includes('create')}
                                onChange={() => togglePermission('create')}
                            >
                                Tworzenie
                            </Checkbox>
                            <Checkbox
                                borderColor="brand.100" mr={4} size="sm"
                                isChecked={newPermissions.includes('read')}
                                onChange={() => togglePermission('read')}
                            >
                                Odczyt
                            </Checkbox>

                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="brand.300"
                            background="transparent"
                            fontSize=".8rem"
                            _hover={{fontSize:'bold', color:'red', backgroundColor:'transparent', }}
                            onClick={() => setShowAddRoleModal(false)}>Anuluj</Button>
                        <Button
                            color="brand.300"
                            background="transparent"
                            fontSize=".8rem"
                            _hover={{fontSize:'bold', color:'#ED8245', backgroundColor:'transparent', }}
                            onClick={selectedRole ? handleSaveEdit : handleAddRole}>
                            Zapisz
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Role;
