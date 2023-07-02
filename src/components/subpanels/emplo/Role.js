import React, { useState } from 'react';
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

    const handleEditClick = (role) => {
        setSelectedRole(role);
        setIsEditing(true);
        setNewRoleName(role.name);
        setNewPermissions(role.permissions);
    };

    const handleDeleteClick = (id) => {
        const updatedRoles = roles.filter((role) => role.id !== id);
        setRoles(updatedRoles);
    };

    const handleSaveEdit = () => {
        const updatedRoles = roles.map((role) => {
            if (role.id === selectedRole.id) {
                return { ...role, name: newRoleName, permissions: newPermissions };
            }
            return role;
        });
        setRoles(updatedRoles);
        cancelEdit();
    };

    const handleAddRole = () => {
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
                            color="brand.300"
                            fontWeight={400}
                            backgroundColor="transparent"
                            _hover={{
                                color: "#ED8245",
                                backgroundColor: "transparent",
                                borderBottom: '2px',
                                borderColor: '#ED8245',
                                borderRadius: 'none'
                            }}
                            _focus={{
                                color: "#ED8245",
                                backgroundColor: "transparent",
                                borderBottom: '2px',
                                borderColor: '#ED8245',
                                borderRadius: 'none'
                            }}  onClick={() => setShowAddRoleModal(true)}>Dodaj rolę</Button>
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
            <Modal isOpen={isEditing || showAddRoleModal} onClose={() => setShowAddRoleModal(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{selectedRole ? 'Edytuj rolę' : 'Dodaj nową rolę'}</ModalHeader>
                    <ModalCloseButton />
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
                            {/* Add more checkboxes for other permissions */}
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
