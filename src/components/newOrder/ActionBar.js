import React from 'react';
import { Flex,Button } from '@chakra-ui/react';
const ActionsBar = ({ onAdd, onSubtract, onNote, onDiscount, onSubmit }) => {

    return (
        <Flex w="100%" justifyContent="space-between">
            <Button className="accept-button" onClick={onAdd}>Dodaj +1</Button>
            <Button className="accept-button" onClick={onSubtract}>Odejmij -1</Button>
            <Button className="accept-button" onClick={onNote}>Notatka</Button>
            <Button className="accept-button" >Podziel</Button>
            <Button className="accept-button" onClick={onDiscount}>Dodaj rabat</Button>
            <Button className="accept-button" onClick={onSubmit}>Złóż zamówienie</Button>
        </Flex>
    );
};

export default ActionsBar;
